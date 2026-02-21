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
    } else {
      var sameDayCutoff = nowET.set({ hour: cutoffHour, minute: cutoffMinute })
      cutoff = nowET.plus({ days: (data.advance_period || 0) - 1 }).set({ hour: cutoffHour, minute: cutoffMinute })
      if (sameDayCutoff < nowET) {
      cutoff = cutoff.plus({ days: 1 })
      }
    }

    return cutoff
  };

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

async function init() {
  var rows = await fetchRestaurants();

  if (!rows) {
    console.error('Error fetching restaurants');
    return;
  }

  var tabledata = rows.map(transformRow);

  var tableContainer = document.querySelector("#restaurant-data");
  if (tableContainer) {
    var table = new Tabulator("#restaurant-data", {
      data:tabledata,
      layout:"fitColumns",
      responsiveLayout:"collapse",
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

      var bookingDate;
      if (restaurantData.advance_type === 'first_of_month') {
        var targetMonthFirst = desiredReservationDate.startOf('month');
        var releaseMonthFirst = targetMonthFirst.minus({ months: restaurantData.advance_period || 0 });
        bookingDate = releaseMonthFirst.set({ hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
      } else {
        bookingDate = desiredReservationDate.minus({ days: restaurantData.advance_period || 0 }).set({ hour: restaurantData.time.hour, minute: restaurantData.time.minute }).setZone('America/New_York', { keepLocalTime: true });
      }

      const now = DateTime.now().setZone('America/New_York');

      if (now > bookingDate) {
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
