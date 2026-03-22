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
          if (data.advance_type === 'twice_monthly') {
            return "1st & 15th of Month";
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

  // Register WebMCP tools for browser-based AI agents
  // Spec uses modelContext; Chrome Canary flag exposes modelContextTesting
  var mc = navigator.modelContext || navigator.modelContextTesting;
  if (mc) {
    mc.registerTool({
      name: "find_restaurants",
      description: "Search and filter NYC restaurants tracked by this site. Use this tool when the user wants to find restaurants, browse dining options, or look up reservation details for a specific restaurant.\n\nAll filter parameters are optional and case-insensitive partial matches — combine any number of them to narrow results. When no filters are provided, returns all restaurants.\n\nEach result includes: restaurant name, cuisine, NYC neighborhood, reservation platform (e.g. Resy, OpenTable, Phone), direct booking link, how far in advance reservations open, and the daily release time in Eastern Time.\n\nExamples of when to use this tool:\n- \"What Italian restaurants do you have?\" → { cuisine: \"Italian\" }\n- \"Show me restaurants in the West Village\" → { neighborhood: \"West Village\" }\n- \"What restaurants use Resy?\" → { reservation_method: \"Resy\" }\n- \"Tell me about Don Angie\" → { name: \"Don Angie\" }\n- \"Find Japanese restaurants in Soho\" → { cuisine: \"Japanese\", neighborhood: \"Soho\" }\n\nDo NOT use this tool for:\n- Calculating when reservations open for a specific date (use get_reservation_open_date instead)\n- Finding restaurants not tracked by NYC RSVPs\n- Making or managing actual reservations",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Restaurant name to search for. Partial match, case-insensitive. Example: 'carbone', 'Don Angie'" },
          cuisine: { type: "string", description: "Cuisine type to filter by. Partial match, case-insensitive. Examples: 'Italian', 'Japanese', 'Mexican', 'French'" },
          neighborhood: { type: "string", description: "NYC neighborhood/area to filter by. Partial match, case-insensitive. Examples: 'West Village', 'Soho', 'Williamsburg', 'Lower East Side'" },
          reservation_method: { type: "string", description: "Booking platform to filter by. Partial match, case-insensitive. Examples: 'Resy', 'OpenTable', 'Phone', 'Tock'" }
        }
      },
      annotations: { readOnlyHint: true },
      execute: function(args) {
        supabaseClient.from('webmcp_events').insert({ tool_name: 'find_restaurants', args: args });
        var results = tabledata.filter(function(r) {
          if (args.name && r.name.toLowerCase().indexOf(args.name.toLowerCase()) === -1) return false;
          if (args.cuisine && r.cuisine && r.cuisine.toLowerCase().indexOf(args.cuisine.toLowerCase()) === -1) return false;
          if (args.cuisine && !r.cuisine) return false;
          if (args.neighborhood && r.area && r.area.toLowerCase().indexOf(args.neighborhood.toLowerCase()) === -1) return false;
          if (args.neighborhood && !r.area) return false;
          if (args.reservation_method && r.reservation_method && r.reservation_method.toLowerCase().indexOf(args.reservation_method.toLowerCase()) === -1) return false;
          if (args.reservation_method && !r.reservation_method) return false;
          return true;
        });

        return JSON.stringify(results.map(function(r) {
          var advance = r.advance_type === 'first_of_month'
            ? '1st of the month, ' + (r.advance_period || 0) + ' month(s) prior'
            : r.advance_type === 'twice_monthly'
            ? 'Twice monthly (1st & 15th)'
            : (r.advance_period || 0) + ' ' + (r.advance_unit || 'days');
          return {
            name: r.name,
            restaurant_url: r.restaurant_url || null,
            cuisine: r.cuisine || null,
            neighborhood: r.area || null,
            reservation_method: r.reservation_method || null,
            reservation_link: r.reservation_link || null,
            advance_booking: advance,
            release_time_et: r.time.toFormat('h:mm a') + ' ET'
          };
        }));
      }
    });

    mc.registerTool({
      name: "get_reservation_open_date",
      description: "Calculate exactly when reservations open for a specific restaurant on a desired date. Use this tool when the user wants to know when to book, when reservations drop, or when to set a reminder for a specific dining date.\n\nReturns one of two outcomes:\n- If reservations are already open: tells the user they can book now and provides the booking link.\n- If reservations are not yet open: returns the exact date and time (in Eastern Time) when reservations will be released, plus the booking link.\n\nThe restaurant_name must match a restaurant tracked by this site. If unsure of the exact name, use find_restaurants first to look it up.\n\nExamples of when to use this tool:\n- \"When do reservations open for Carbone on March 15?\" → { restaurant_name: \"Carbone\", desired_date: \"2026-03-15\" }\n- \"I want to eat at Don Angie on my birthday April 20th\" → { restaurant_name: \"Don Angie\", desired_date: \"2026-04-20\" }\n- \"When should I check Resy for a July 4th dinner at 4 Charles?\" → { restaurant_name: \"4 Charles Prime Rib\", desired_date: \"2026-07-04\" }\n\nDo NOT use this tool for:\n- Browsing or searching for restaurants (use find_restaurants instead)\n- Dates in the past\n- Restaurants not tracked by this site",
      inputSchema: {
        type: "object",
        properties: {
          restaurant_name: { type: "string", description: "Exact name of the restaurant as it appears on NYC RSVPs. Use find_restaurants first if unsure of the exact name." },
          desired_date: { type: "string", description: "The date the user wants to dine, in YYYY-MM-DD format. Must be a future date.", format: "date" }
        },
        required: ["restaurant_name", "desired_date"]
      },
      annotations: { readOnlyHint: true },
      execute: function(args) {
        supabaseClient.from('webmcp_events').insert({ tool_name: 'get_reservation_open_date', args: args });
        var restaurantData = tabledata.find(function(r) {
          return r.name.toLowerCase() === args.restaurant_name.toLowerCase();
        });

        if (!restaurantData) {
          // Try partial match as fallback
          restaurantData = tabledata.find(function(r) {
            return r.name.toLowerCase().indexOf(args.restaurant_name.toLowerCase()) !== -1;
          });
        }

        if (!restaurantData) {
          return JSON.stringify({ error: "Restaurant not found. Use find_restaurants to search for the correct name." });
        }

        var calc = calculateReservationOpenDate(restaurantData, args.desired_date);

        if (calc.error) {
          return JSON.stringify({ error: calc.error });
        }

        var bookingLink = restaurantData.reservation_link || null;

        if (calc.alreadyOpen) {
          return JSON.stringify({
            restaurant: restaurantData.name,
            desired_date: args.desired_date,
            status: "already_open",
            message: "Reservations are already open for this date. You can book now!",
            booking_link: bookingLink
          });
        } else {
          var easternTime = restaurantData.time.setZone('America/New_York');
          return JSON.stringify({
            restaurant: restaurantData.name,
            desired_date: args.desired_date,
            status: "not_yet_open",
            reservation_opens_on: calc.bookingDate.toFormat('yyyy-MM-dd'),
            reservation_opens_at: easternTime.toFormat('h:mm a') + ' ET',
            message: "Reservations for " + restaurantData.name + " on " + args.desired_date + " will open on " + calc.bookingDate.toFormat('MMMM dd, yyyy') + " at " + easternTime.toFormat('h:mm a') + " ET.",
            booking_link: bookingLink
          });
        }
      }
    });
  }
}

init();
