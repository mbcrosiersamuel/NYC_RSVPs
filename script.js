var DateTime = luxon.DateTime;

    var tabledata = [
  {id:1, name:"Via Carota", restaurant_url:"https://viacarota.com", area:"West Village", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/via-carota", available_at:"30 days in advance at 10 AM", days:30, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:2, name:"The Four Horsemen", restaurant_url:"https://fourhorsemenbk.com", area:"Williamsburg", cuisine:"Wine Bar", platform:"Resy", platform_url:"https://resy.com/cities/ny/the-four-horsemen", available_at:"29 days in advance at 7 AM", days:29, time_3: DateTime.fromISO("1970-01-01T07:00:00", { zone: "America/New_York" })},
  {id:3, name:"Carbone", restaurant_url:"https://carbonenewyork.com", area:"Greenwich Village", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/carbone", available_at:"30 days in advance at 10 AM", days:30, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:4, name:"Lilia", restaurant_url:"https://www.lilianewyork.com", area:"Williamsburg", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/lilia", available_at:"28 days in advance at 10 AM", days:28, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:5, name:"L'Artusi", restaurant_url:"https://www.lartusi.com", area:"West Village", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/lartusi-ny", available_at:"14 days in advance at 9 AM", days:14, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:6, name:"Zou Zou's", restaurant_url:"https://www.zouzousnyc.com", area:"Hudson Yards", cuisine:"Mediterranean", platform:"Open Table", platform_url:"https://opentable.com/restaurant/profile/1197907", available_at:"21 days in advance at 9 AM", days:21, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:7, name:"Laser Wolf", restaurant_url:"https://www.laserwolfbrooklyn.com/", area:"Williamsburg", cuisine:"Israeli", platform:"Resy", platform_url:"https://resy.com/cities/ny/laser-wolf-brooklyn", available_at:"21 days in advance at 10 AM", days:21, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:8, name:"Semma", restaurant_url:"https://www.semma.nyc", area:"Greenwich Village", cuisine:"South Indian", platform:"Resy", platform_url:"https://resy.com/cities/ny/semma", available_at:"14 days in advance at 9 AM", days:14, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:9, name:"Au Cheval", restaurant_url:"https://auchevalnyc.com/", area:"Tribeca", cuisine:"American", platform:"Resy", platform_url:"https://resy.com/cities/ny/au-cheval-nyc", available_at:"13 days in advance at 9 AM", days:13, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:10, name:"4 Charles Prime Rib", restaurant_url:"https://nycprimerib.com/", area:"West Village", cuisine:"Steakhouse", platform:"Resy", platform_url:"https://resy.com/cities/ny/4-charles-prime-rib", available_at:"20 days in advance at 9 AM", days:20, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:11, name:"Buvette", restaurant_url:"https://ilovebuvette.com/", area:"West Village", cuisine:"French", platform:"Resy", platform_url:"https://resy.com/cities/ny/buvette-nyc", available_at:"13 days in advance at 10 AM", days:13, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:12, name:"Sadelle's", restaurant_url:"https://www.sadelles.com/", area:"Soho", cuisine:"Brunch", platform:"Resy", platform_url:"https://resy.com/cities/ny/sadelles", available_at:"30 days in advance at 10 AM", days:30,  time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  //{id:13, name:"Gramercy Tavern", restaurant_url:"https://www.gramercytavern.com/", area:"Gramercy Park", cuisine:"American", platform:"Resy", platform_url:"https://resy.com/cities/ny/gramercy-tavern", available_at:"28 days in advance at 12 PM", days:28, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:14, name:"i Sodi", restaurant_url:"https://www.isodinyc.com/", area:"West Village", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/i-sodi", available_at:"13 days in advance at 12 AM", days:13, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:15, name:"Shuka", restaurant_url:"https://www.shukanewyork.com/", area:"Soho", cuisine:"Mediterranean", platform:"Resy", platform_url:"https://resy.com/cities/ny/shuka", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  //{id:16, name:"Shukette", restaurant_url:"https://www.shukettenyc.com/", area:"Chelsea", cuisine:"Middle Eastern", platform:"Resy", platform_url:"https://resy.com/cities/ny/shukette", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:17, name:"Dhamaka", restaurant_url:"https://www.dhamaka.nyc/", area:"Lower East Side", cuisine:"Indian", platform:"Resy", platform_url:"https://resy.com/cities/ny/dhamaka", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:18, name:"Rubirosa", restaurant_url:"http://www.rubirosanyc.com/", area:"Nolita", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/rubirosa", available_at:"7 days in advance at 12 AM", days:7, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  //{id:19, name:"Llama San", restaurant_url:"https://www.llamasannyc.com/", area:"West Village", cuisine:"Peruvian", platform:"Resy", platform_url:"https://resy.com/cities/ny/llama-san", available_at:"30 days in advance at 9 AM", days:30, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:20, name:"Balthazar", restaurant_url:"https://balthazarny.com/", area:"Soho", cuisine:"French", platform:"Resy", platform_url:"https://resy.com/cities/ny/balthazar-nyc", available_at:"30 days in advance at 12 AM", days:30, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:21, name:"Adda", restaurant_url:"https://www.addanyc.com/", area:"Long Island City", cuisine:"Indian", platform:"Resy", platform_url:"https://resy.com/cities/ny/adda", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:22, name:"Masalawala & Sons", restaurant_url:"http://www.masalawala.com/", area:"Park Slope", cuisine:"Indian", platform:"Resy", platform_url:"https://resy.com/cities/ny/masalawala", available_at:"14 days in advance at 12 AM", days:14, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:23, name:"Tatiana", restaurant_url:"https://www.tatiananyc.com/", area:"Upper West Side", cuisine:"Afro-Caribbean", platform:"Resy", platform_url:"https://resy.com/cities/ny/tatiana", available_at:"27 days in advance at 12 PM", days:27, time_3: DateTime.fromISO("1970-01-01T12:00:00", { zone: "America/New_York" })},
  {id:24, name:"Torrisi Bar & Restaurant", restaurant_url:"https://www.torrisinyc.com/", area:"Nolita", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/torrisi", available_at:"30 days in advance at 10 AM", days:30, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:25, name:"Claud", restaurant_url:"https://www.claudnyc.com/", area:"East Village", cuisine:"European", platform:"Resy", platform_url:"https://resy.com/cities/ny/claud", available_at:"15 days in advance at 9 AM", days:15, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:26, name:"Thai Diner", restaurant_url:"https://www.thaidiner.com/", area:"Nolita", cuisine:"Thai", platform:"Resy", platform_url:"https://resy.com/cities/ny/thai-diner", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:27, name:"Rezdôra", restaurant_url:"https://rezdora.nyc/", area:"Flatiron", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/rezdora", available_at:"29 days in advance at 12 AM", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:28, name:"Don Angie", restaurant_url:"https://www.donangie.com/", area:"West Village", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/don-angie", available_at:"6 days in advance at 9 AM", days:6, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:29, name:"Gage & Tollner", restaurant_url:"https://www.gageandtollner.com/", area:"Brooklyn", cuisine:"American", platform:"Resy", platform_url:"https://resy.com/cities/ny/gage-and-tollner", available_at:"28 days in advance at 10 AM", days:28, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  //{id:30, name:"Ci Siamo", restaurant_url:"https://www.cisiamonyc.com/", area:"Hudson Yards", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/ci-siamo", available_at:"28 days in advance at 12 PM", days:28, time_3: DateTime.fromISO("1970-01-01T12:00:00", { zone: "America/New_York" })},
  {id:31, name:"Cote", restaurant_url:"http://cotenyc.com/", area:"Chelsea", cuisine:"Korean", platform:"Resy", platform_url:"https://resy.com/cities/ny/cote-nyc", available_at:"29 days in advance at 10 AM", days:29, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:32, name:"Bonnie's", restaurant_url:"https://www.bonniesbrooklyn.com/", area:"Williamsburg", cuisine:"Cantonese", platform:"Resy", platform_url:"https://resy.com/cities/ny/bonnies", available_at:"13 days in advance at 10 AM", days:13, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })}, 
  {id:33, name:"Raoul's", restaurant_url:"http://www.raouls.com/", area:"Greenwich Village", cuisine:"French", platform:"Resy", platform_url:"https://resy.com/cities/ny/raoulsrestaurant", available_at:"30 days in advance at 8 AM", days:30, time_3: DateTime.fromISO("1970-01-01T08:00:00", { zone: "America/New_York" })},
  //{id:34, name:"Minetta Tavern", restaurant_url:"http://www.minettatavernny.com/", area:"Soho", cuisine:"French", platform:"Resy", platform_url:"https://resy.com/cities/ny/minetta-tavern", available_at:"30 days in advance at 12 AM", days:30, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:35, name:"Misi", restaurant_url:"http://www.misinewyork.com", area:"Williamsburg", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/ny/misi", available_at:"27 days in advance at 10 AM", days:27, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:36, name:"Double Chicken Please", restaurant_url:"http://www.doublechickenplease.com", area:"Lower East Side", cuisine:"Cocktails / New American", platform:"Resy", platform_url:"https://resy.com/cities/ny/double-chicken-please", available_at:"6 days in advance at 12 AM", days:6, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:37, name:"Sushi Nakazawa", restaurant_url:"https://www.sushinakazawa.com/", area:"West Village", cuisine:"Sushi", platform:"Resy", platform_url:"https://resy.com/cities/ny/sushi-nakazawa", available_at:"14 days in advance at 12 AM", days:14, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:38, name:"Peter Luger", restaurant_url:"https://peterluger.com/", area:"Williamsburg", cuisine:"Steakhouse", platform:"Resy", platform_url:"https://resy.com/cities/ny/peter-luger-steak-house", available_at:"30 days in advance at midnight", days:30, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  //{id:39, name:"Jeju Noodle Bar", restaurant_url:"https://www.jejunoodlebar.com/", area:"West Village", cuisine:"Korean", platform:"Resy", platform_url:"https://resy.com/cities/ny/jeju-noodle-bar", available_at:"29 days in advance at midnight", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:40, name:"Fish Cheeks", restaurant_url:"http://fishcheeksnyc.com/", area:"Nolita", cuisine:"Thai", platform:"Resy", platform_url:"https://resy.com/cities/ny/fish-cheeks", available_at:"29 days in advance at midnight", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:41, name:"Chinese Tuxedo", restaurant_url:"https://chinesetuxedo.com/", area:"Chinatown", cuisine:"Chinese", platform:"Resy", platform_url:"https://resy.com/cities/ny/chinese-tuxedo", available_at:"14 days in advance at midnight", days:14, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:42, name:"Atoboy", restaurant_url:"http://www.atoboynyc.com/", area:"NoMad", cuisine:"Korean", platform:"Resy", platform_url:"https://resy.com/cities/ny/atoboy", available_at:"29 days in advance at midnight", days:29, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:43, name:"Monkey Bar", restaurant_url:"https://nycmonkeybar.com/", area:"Midtown East", cuisine:"American", platform:"Resy", platform_url:"https://resy.com/cities/new-york-ny/venues/monkey-bar-nyc", available_at:"20 days in advance at 9 AM", days:20, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:44, name:"Roscioli (Tasting Menu)", restaurant_url:"https://rosciolinyc.com/", area:"Soho", cuisine:"Italian", platform:"Resy", platform_url:"https://resy.com/cities/new-york-ny/venues/roscioli-tasting-menu", available_at:"30 days in advance at 10 AM", days:30, time_3: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:45, name:"Bungalow", restaurant_url:"https://www.bungalowny.com/", area:"East Village", cuisine:"Indian", platform:"Resy", platform_url:"https://resy.com/cities/new-york-ny/venues/bungalow-ny", available_at:"20 days in advance at 11 AM", days:20, time_3: DateTime.fromISO("1970-01-01T11:00:00", { zone: "America/New_York" })},
  {id:46, name:"Una Pizza Napoletana", restaurant_url:"https://www.unapizza.com/", area:"Lower East Side", cuisine:"Pizza", platform:"Resy", platform_url:"https://resy.com/cities/new-york-ny/venues/una-pizza-napoletana", available_at:"14 days in advance at 9 AM", days:14, time_3: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:47, name:"Din Tai Fung", restaurant_url:"https://www.dintaifungusa.com/", area:"Midtown West", cuisine:"Chinese", platform:"Yelp", platform_url:"https://www.yelp.com/reservations/din-tai-fung-new-york-3", available_at:"30 days in advance at midnight", days:30, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:48, name:"Le Café Louis Vuitton", restaurant_url:"https://lecafelvnyc.com/", area:"Midtown East", cuisine:"French", platform:"Resy", platform_url:"https://resy.com/cities/new-york-ny/venues/le-cafe-louis-vuitton", available_at:"27 days in advance at midnight", days:27, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:49, name:"Theodora", restaurant_url:"https://www.theodoranyc.com/", area:"Fort Greene", cuisine:"Mediterranean", platform:"Resy", platform_url:"https://resy.com/cities/ny/theodora", available_at:"30 days in advance at midnight", days:30, time_3: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
]; 

    var customMutator = function(value, data, type, params, component){
        const now = DateTime.now().setZone('America/New_York')
        const cutoffHour = data.time_3.hour
        const cutoffMinute = data.time_3.minute
      
        var cutoff = now.plus({ days: data.days - 1 })
          .set({ hour: cutoffHour, minute: cutoffMinute })

        const new_day = now.set({hour: cutoffHour, minute: cutoffMinute })

        if (new_day < now) {
          cutoff = cutoff.plus({ days: 1 }) 
        }

        
        return cutoff
      };


    var table = new Tabulator("#restaurant-data", {
      data:tabledata, //load initial data into table
      layout:"fitColumns",
      responsiveLayout:"collapse",
      columns:[ //Define Table Columns
        {title:"Restaurant", field:"name", formatter:"link", sorter:"string", minWidth:200, responsive:0, formatterParams:{
                labelField:"name",
                urlField:"restaurant_url",
                target:"_blank",
            }, headerFilter:"input", headerFilterPlaceholder:"Search for a Restaurant"},
        {title:"Neighborhood", field:"area", sorter:"string", hozAlign:"center",  minWidth:150, responsive:5, headerFilter:"input", headerFilterPlaceholder:"e.g. Soho"},
        {title:"Cuisine", field:"cuisine", sorter:"string", hozAlign:"center", minWidth:150, responsive:5, headerFilter:"input", headerFilterPlaceholder:"e.g. Italian"},
        {title:"Platform", field:"platform", formatter:"link", sorter:"string",  minWidth:150,responsive:4, hozAlign:"center", formatterParams:{
                labelField:"platform",
                urlField:"platform_url",
                target:"_blank",
            }, headerFilter:"input", headerFilterPlaceholder:"e.g. Resy"},
        {title:"Days in Advance", field:"days", sorter:"number", hozAlign:"center", minWidth:150, responsive:2, headerFilter:"input", headerFilterPlaceholder:"Min Days", headerFilterFunc:">="},
        {title:"Time (EST)", field:"time_3", hozAlign:"center", sorter:"datetime", minWidth:150, responsive:2, headerFilter:"input", headerFilterPlaceholder:"e.g. 9:00 AM", formatter:"datetime", formatterParams:{
          outputFormat:"h:mm a",
          invalidPlaceholder:"(invalid date)",
        }},
        {title:"Latest Open RSVP", field:"openres", sorter:"datetime", hozAlign:"center", minWidth:250, responsive:1, mutator:customMutator, formatter:"datetime", formatterParams:{
          outputFormat:"DDDD",
          invalidPlaceholder:"Invalid date",
}},
      ],
            initialSort:[
        {column:"name", dir:"asc"}, //sort by this first
      ],
    });

    tabledata.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

// Populate restaurant select options
const select = document.getElementById("restaurantSelect");



tabledata.forEach(r => {
  const option = document.createElement("option");
  option.value = r.name;
  option.text = r.name;
  select.appendChild(option);
});


// Handle form submit
const form = document.querySelector("form");
const result = document.getElementById("calculator-result");


document.getElementById("submit").addEventListener("click", () => {

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

  var bookingDate = desiredReservationDate.minus({days: restaurantData.days}).set({hour: restaurantData.time_3.hour, minute: restaurantData.time_3.minute });

  const now = DateTime.now().setZone('America/New_York');

  if (now > bookingDate) {
    result.innerText = `>> Reservations at ${restaurantData.name} are already open for your desired date!`;
  } else {
    result.innerText = `>> Reservations for ${restaurantData.name} will open on ${bookingDate.toFormat('MMMM dd, yyyy')} at ${restaurantData.time_3.toFormat('h:mm a ZZZZ')}`; 

       // Add button
  const button = document.createElement("add-to-calendar-button");
  button.setAttribute('name', `Make ${restaurantData.name} Reservation`);  
  button.setAttribute('label', `Add a Calendar Reminder`);  
  button.setAttribute('startDate', `${bookingDate.toISODate()}`);
  button.setAttribute('endDate', `${bookingDate.toISODate()}`);
  button.setAttribute('startTime', `${restaurantData.time_3.toFormat('HH:mm')}`);
  button.setAttribute('endTime', `${restaurantData.time_3.plus({ minutes: 5 }).toFormat('HH:mm')}`);
  button.setAttribute('timeZone', "America/New_York");
  button.setAttribute('options', "'Google','iCal', 'Apple', 'Outlook.com'");
  button.setAttribute('description', `[url] ${restaurantData.platform_url}?date=${desiredReservationDate.toISODate()}|Booking Link[/url]`);

// Append 
  document.body.appendChild(button);



}

});
