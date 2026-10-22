var DateTime = luxon.DateTime;

// Initialize Supabase client
var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Convert DB row to app format (release_time string → Luxon DateTime)
function transformRow(row) {
  return {
    ...row,
    time: DateTime.fromISO("1970-01-01T" + row.release_time, { zone: "America/New_York" })
  };
}

var customMutator = function(value, data, type, params, component){
    const nowET = DateTime.now().setZone('America/New_York')
    const cutoffHour = data.time.hour
    const cutoffMinute = data.time.minute

    var cutoff;

    if (data.advance_type === 'first_of_month') {
      // For first-of-month restaurants, show the furthest date available for booking
      // Logic: find today's month, add 2 months, then subtract 1 day
      var currentMonthFirst = nowET.startOf('month')
      cutoff = currentMonthFirst.plus({ months: 2 }).minus({ days: 1 })
    } else if (data.advance_type === 'twice_monthly') {
      // Two drops per month: 1st at release_time opens 16th–end of month,
      // 15th at release_time opens 1st–15th of next month
      var day = nowET.day
      var dropOnFirst = nowET.set({ day: 1, hour: cutoffHour, minute: cutoffMinute })
      var dropOnFifteenth = nowET.set({ day: 15, hour: cutoffHour, minute: cutoffMinute })

      if (day >= 15 && nowET >= dropOnFifteenth) {
        cutoff = nowET.plus({ months: 1 }).set({ day: 15 })
      } else if (nowET >= dropOnFirst) {
        cutoff = nowET.endOf('month').startOf('day')
      } else {
        cutoff = nowET.set({ day: 15 })
      }
    } else if (data.advance_type === 'months_advance') {
      // Books a fixed number of calendar months ahead by the same date
      // (e.g. want Sept 12 → opens Aug 12), not a rolling day count.
      var sameDayCutoffMonths = nowET.set({ hour: cutoffHour, minute: cutoffMinute })
      cutoff = nowET.plus({ months: (data.advance_period || 0) }).minus({ days: 1 }).set({ hour: cutoffHour, minute: cutoffMinute })
      if (sameDayCutoffMonths < nowET) {
        cutoff = cutoff.plus({ days: 1 })
      }
    } else {
      var sameDayCutoff = nowET.set({ hour: cutoffHour, minute: cutoffMinute })
      cutoff = nowET.plus({ days: (data.advance_period || 0) - 1 }).set({ hour: cutoffHour, minute: cutoffMinute })
      if (sameDayCutoff < nowET) {
      cutoff = cutoff.plus({ days: 1 })
      }
    }

    return cutoff
  };

// Calculate when reservations open for a given restaurant + desired date
// Returns { alreadyOpen, bookingDate, restaurant } or { error }
function calculateReservationOpenDate(restaurantData, desiredDateStr) {
  var desiredReservationDate = DateTime.fromISO(desiredDateStr).setZone('America/New_York');

  if (!desiredReservationDate.isValid) {
    return { error: "Invalid date format. Use YYYY-MM-DD." };
  }

  var bookingDate;
  if (restaurantData.advance_type === 'first_of_month') {
    var targetMonthFirst = desiredReservationDate.startOf('month');
    var releaseMonthFirst = targetMonthFirst.minus({ months: restaurantData.advance_period || 0 });
    bookingDate = releaseMonthFirst.set({ hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
  } else if (restaurantData.advance_type === 'twice_monthly') {
    // Desired 16th–end of month → opens on 1st of same month
    // Desired 1st–15th → opens on 15th of previous month
    if (desiredReservationDate.day >= 16) {
      bookingDate = desiredReservationDate.set({ day: 1, hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
    } else {
      bookingDate = desiredReservationDate.minus({ months: 1 }).set({ day: 15, hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
    }
  } else if (restaurantData.advance_type === 'months_advance') {
    bookingDate = desiredReservationDate.minus({ months: restaurantData.advance_period || 0 }).set({ hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
  } else {
    bookingDate = desiredReservationDate.minus({ days: restaurantData.advance_period || 0 }).set({ hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
  }

  var now = DateTime.now().setZone('America/New_York');

  if (now > bookingDate) {
    return { alreadyOpen: true, bookingDate: bookingDate, restaurant: restaurantData };
  } else {
    return { alreadyOpen: false, bookingDate: bookingDate, restaurant: restaurantData };
  }
}

async function fetchRestaurants() {
  var CACHE_KEY = 'restaurants_cache';
  var CACHE_TTL = 1000 * 60 * 60; // 1 hour

  try {
    var cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      var parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) return parsed.data;
    }
  } catch (e) { /* localStorage unavailable or corrupt — fall through to fetch */ }

  var { data, error } = await supabaseClient
    .from('restaurants')
    .select('name,restaurant_url,area,cuisine,reservation_method,reservation_link,advance_period,advance_unit,advance_type,release_time')
    .order('name');

  if (error) return null;

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data, timestamp: Date.now() }));
  } catch (e) { /* quota exceeded or unavailable — not critical */ }

  return data;
}

// Kick off the fetch immediately so WebMCP tool executions can await it
// without waiting on init() / DOM work.
var restaurantsPromise = fetchRestaurants().then(function(rows) {
  return rows ? rows.map(transformRow) : null;
});

async function init() {
  var tabledata = await restaurantsPromise;

  if (!tabledata) {
    console.error('Error fetching restaurants');
    return;
  }

  var tableContainer = document.querySelector("#restaurant-data");
  if (tableContainer) {
    var table = new Tabulator("#restaurant-data", {
      data:tabledata,
      layout:"fitColumns",
      responsiveLayout:"collapse",
      // Default collapse output is a <table> inside role="row", which is invalid ARIA.
      // Render the hidden columns as a role="cell" list of divs instead.
      responsiveLayoutCollapseFormatter:function(data){
        if (!data.length) return "";
        var list = document.createElement("div");
        list.setAttribute("role", "cell");
        list.className = "collapse-list";
        data.forEach(function(col){
          var item = document.createElement("div");
          item.className = "collapse-item";
          var label = document.createElement("span");
          label.className = "collapse-label";
          label.textContent = col.title;
          var value = document.createElement("span");
          value.className = "collapse-value";
          if (col.value instanceof Node) {
            value.appendChild(col.value);
          } else {
            value.innerHTML = col.value;
          }
          item.appendChild(label);
          item.appendChild(value);
          list.appendChild(item);
        });
        return list;
      },
      columns:[
        {title:"Restaurant", field:"name", formatter:"link", sorter:"string", minWidth:200, responsive:0, formatterParams:{
                labelField:"name",
                urlField:"restaurant_url",
                target:"_blank",
            }, headerFilter:"input", headerFilterPlaceholder:"Search for a Restaurant"},
        {title:"Neighborhood", field:"area", sorter:"string", hozAlign:"center",  minWidth:120, responsive:5, headerFilter:"input", headerFilterPlaceholder:"e.g. Soho"},
        {title:"Cuisine", field:"cuisine", sorter:"string", hozAlign:"center", minWidth:110, responsive:5, headerFilter:"input", headerFilterPlaceholder:"e.g. Italian"},
        {title:"Reservation Method", field:"reservation_method", formatter:"link", sorter:"string",  minWidth:120,responsive:4, hozAlign:"center", formatterParams:{
                labelField:"reservation_method",
                urlField:"reservation_link",
                target:"_blank",
            }, headerFilter:"input", headerFilterPlaceholder:"e.g. Resy, Phone"},
        {title:"Days in Advance", field:"advance_period", sorter:"number", hozAlign:"center", minWidth:130, responsive:2, formatter:function(cell, formatterParams, onRendered){
          var data = cell.getData();
          if (data.advance_type === 'first_of_month') {
            return "1st of Prev. Month";
          }
          if (data.advance_type === 'twice_monthly') {
            return "1st & 15th of Month";
          }
          if (data.advance_type === 'months_advance') {
            return data.advance_period + " " + (data.advance_period === 1 ? "month" : "months");
          }
          return data.advance_period + " " + data.advance_unit;
        }},
        {title:"Time (EST)", field:"time", hozAlign:"center", sorter:"datetime", minWidth:110, responsive:2, formatter:"datetime", formatterParams:{
          outputFormat:"h:mm a",
          invalidPlaceholder:"(invalid date)",
        }},
        {title:"Latest Open RSVP", field:"openres", sorter:"datetime", hozAlign:"center", minWidth:200, responsive:1, mutator:customMutator, formatter:"datetime", formatterParams:{
          outputFormat:"DDDD",
          invalidPlaceholder:"Invalid date",
}},
      ],
            initialSort:[
        {column:"name", dir:"asc"},
      ],
    });

    // Tabulator makes its scroll holder focusable, which is not allowed inside role="grid".
    // The table has no fixed height, so the holder never scrolls and does not need focus.
    table.on("renderComplete", function(){
      var holder = tableContainer.querySelector(".tabulator-tableholder");
      if (holder) holder.removeAttribute("tabindex");
    });
  }

  // Populate restaurant select options
  const select = document.getElementById("restaurantSelect");

  if (select) {
    tabledata.forEach(r => {
      const option = document.createElement("option");
      option.value = r.name;
      option.text = r.name;
      select.appendChild(option);
    });
  }

  // Handle form submit
  const form = document.querySelector("form");
  const result = document.getElementById("calculator-result");

  const submitBtn = document.getElementById("submit");
  if (submitBtn && select && result) {
    if (form) {
      form.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); submitBtn.click(); }
      });
    }
    submitBtn.addEventListener("click", () => {

      const existingButtons = document.querySelectorAll('add-to-calendar-button');
      Array.from(existingButtons).forEach(button => {
        button.parentElement.removeChild(button);
      });

      const restaurant = form.restaurantSelect.value;
      var desiredReservationDate = DateTime.fromISO(form.dateInput.value).setZone('America/New_York');

      const restaurantData = tabledata.find(r => r.name === restaurant);

      if (!restaurantData) {
        result.textContent = "Restaurant not found.";
        return;
      }

      if (!desiredReservationDate.isValid){
        result.textContent = "Please enter a valid date.";
        return;
      }

      var calc = calculateReservationOpenDate(restaurantData, form.dateInput.value);

      if (calc.error) {
        result.textContent = calc.error;
        return;
      }

      var bookingDate = calc.bookingDate;

      if (calc.alreadyOpen) {
        result.innerText = `>> Reservations at ${restaurantData.name} are already open for your desired date!`;
      } else {
        var userZone = DateTime.local().zoneName;
        var localTime = bookingDate.setZone(userZone);
        var easternTime = restaurantData.time.setZone('America/New_York');
        var resultText = `>> Reservations for ${restaurantData.name} will open on ${bookingDate.toFormat('MMMM dd, yyyy')} at ${easternTime.toFormat('h:mm a ZZZZ')}`;

        result.innerText = resultText;

        // Add button
        const button = document.createElement("add-to-calendar-button");
        button.setAttribute('name', `Make ${restaurantData.name} Reservation`);
        button.setAttribute('label', `Add a Calendar Reminder`);
        button.setAttribute('startDate', `${bookingDate.toISODate()}`);
        button.setAttribute('endDate', `${bookingDate.toISODate()}`);
        button.setAttribute('startTime', `${restaurantData.time.toFormat('HH:mm')}`);
        button.setAttribute('endTime', `${restaurantData.time.plus({ minutes: 5 }).toFormat('HH:mm')}`);
        button.setAttribute('timeZone', "America/New_York");
        button.setAttribute('options', "'Google','iCal', 'Apple', 'Outlook.com'");
        var isPhone = restaurantData.reservation_method === 'Phone';
        var linkForDesc = isPhone ? restaurantData.reservation_link : `${restaurantData.reservation_link}${restaurantData.reservation_link && (restaurantData.reservation_link.indexOf('?') !== -1) ? '&' : '?'}date=${desiredReservationDate.toISODate()}`;
        var descText = isPhone ? `Call to reserve: ${restaurantData.reservation_link}` : `[url] ${linkForDesc}|Booking Link[/url]`;
        button.setAttribute('description', descText);

        // Append inside result area
        result.parentNode.insertBefore(button, result.nextSibling);
      }
    });
  }

}

init();
