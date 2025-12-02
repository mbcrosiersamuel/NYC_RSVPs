var DateTime = luxon.DateTime;

    var tabledata = [
  {id:1, name:"Via Carota", restaurant_url:"https://viacarota.com", area:"West Village", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/via-carota", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:2, name:"The Four Horsemen", restaurant_url:"https://fourhorsemenbk.com", area:"Williamsburg", cuisine:"Wine Bar", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/the-four-horsemen", available_at:"29 days in advance at 7 AM", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T07:00:00", { zone: "America/New_York" })},
  {id:3, name:"Carbone", restaurant_url:"https://carbonenewyork.com", area:"Greenwich Village", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/carbone", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:4, name:"Lilia", restaurant_url:"https://www.lilianewyork.com", area:"Williamsburg", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/lilia", available_at:"28 days in advance at 10 AM", advance_period:28, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:5, name:"L'Artusi", restaurant_url:"https://www.lartusi.com", area:"West Village", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/lartusi-ny", available_at:"14 days in advance at 9 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:6, name:"Zou Zou's", restaurant_url:"https://www.zouzousnyc.com", area:"Hudson Yards", cuisine:"Mediterranean", reservation_method:"Open Table", reservation_link:"https://opentable.com/restaurant/profile/1197907", available_at:"21 days in advance at 9 AM", advance_period:21, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:7, name:"Laser Wolf", restaurant_url:"https://www.laserwolfbrooklyn.com/", area:"Williamsburg", cuisine:"Israeli", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/laser-wolf-brooklyn", available_at:"21 days in advance at 10 AM", advance_period:21, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:8, name:"Semma", restaurant_url:"https://www.semma.nyc", area:"Greenwich Village", cuisine:"South Indian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/semma", available_at:"14 days in advance at 9 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:9, name:"Au Cheval", restaurant_url:"https://auchevalnyc.com/", area:"Tribeca", cuisine:"American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/au-cheval-nyc", available_at:"20 days in advance at 9 AM", advance_period:20, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:10, name:"4 Charles Prime Rib", restaurant_url:"https://nycprimerib.com/", area:"West Village", cuisine:"Steakhouse", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/4-charles-prime-rib", available_at:"20 days in advance at 9 AM", advance_period:20, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:11, name:"Buvette", restaurant_url:"https://ilovebuvette.com/", area:"West Village", cuisine:"French", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/buvette-nyc", available_at:"13 days in advance at 10 AM", advance_period:13, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:12, name:"Sadelle's", restaurant_url:"https://www.sadelles.com/", area:"Soho", cuisine:"Brunch", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/sadelles", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance",  time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:14, name:"i Sodi", restaurant_url:"https://www.isodinyc.com/", area:"West Village", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/i-sodi", available_at:"13 days in advance at 12 AM", advance_period:13, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:15, name:"Shuka", restaurant_url:"https://www.shukanewyork.com/", area:"Soho", cuisine:"Mediterranean", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/shuka", available_at:"29 days in advance at 12 AM", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:17, name:"Dhamaka", restaurant_url:"https://www.dhamaka.nyc/", area:"Lower East Side", cuisine:"Indian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/dhamaka", available_at:"14 days in advance at 9 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:18, name:"Rubirosa", restaurant_url:"http://www.rubirosanyc.com/", area:"Nolita", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/rubirosa", available_at:"7 days in advance at 12 AM", advance_period:7, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:20, name:"Balthazar", restaurant_url:"https://balthazarny.com/", area:"Soho", cuisine:"French", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/balthazar-nyc", available_at:"30 days in advance at 12 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:21, name:"Adda", restaurant_url:"https://www.addanyc.com/", area:"East Village", cuisine:"Indian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/ADDA", available_at:"6 days in advance at 12 AM", advance_period:6, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:22, name:"Masalawala & Sons", restaurant_url:"http://www.masalawala.com/", area:"Park Slope", cuisine:"Indian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/masalawala", available_at:"14 days in advance at 12 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:23, name:"Tatiana", restaurant_url:"https://www.tatiananyc.com/", area:"Upper West Side", cuisine:"Afro-Caribbean", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/tatiana", available_at:"27 days in advance at 12 PM", advance_period:27, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T12:00:00", { zone: "America/New_York" })},
  {id:24, name:"Torrisi Bar & Restaurant", restaurant_url:"https://www.torrisinyc.com/", area:"Nolita", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/torrisi", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:25, name:"Claud", restaurant_url:"https://www.claudnyc.com/", area:"East Village", cuisine:"European", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/claud", available_at:"15 days in advance at 9 AM", advance_period:15, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:26, name:"Thai Diner", restaurant_url:"https://www.thaidiner.com/", area:"Nolita", cuisine:"Thai", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/thai-diner", available_at:"29 days in advance at 12 AM", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:27, name:"Rezdôra", restaurant_url:"https://rezdora.nyc/", area:"Flatiron", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/rezdora", available_at:"29 days in advance at 12 AM", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:28, name:"Don Angie", restaurant_url:"https://www.donangie.com/", area:"West Village", cuisine:"Italian", reservation_method:"OpenTable", reservation_link:"https://www.opentable.com/r/don-angie-new-york", available_at:"7 days in advance at 9 AM", advance_period:7, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:29, name:"Gage & Tollner", restaurant_url:"https://www.gageandtollner.com/", area:"Brooklyn", cuisine:"American", reservation_method:"Open Table", reservation_link:"https://www.opentable.com/r/gage-and-tollner-brooklyn", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance",  time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:31, name:"Cote", restaurant_url:"http://cotenyc.com/", area:"Chelsea", cuisine:"Korean", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/cote-nyc", available_at:"29 days in advance at 10 AM", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:32, name:"Bonnie's", restaurant_url:"https://www.bonniesbrooklyn.com/", area:"Williamsburg", cuisine:"Cantonese", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/bonnies", available_at:"13 days in advance at 10 AM", advance_period:13, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })}, 
  {id:33, name:"Raoul's", restaurant_url:"http://www.raouls.com/", area:"Greenwich Village", cuisine:"French", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/raoulsrestaurant", available_at:"30 days in advance at 8 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T08:00:00", { zone: "America/New_York" })},
  {id:35, name:"Misi", restaurant_url:"http://www.misinewyork.com", area:"Williamsburg", cuisine:"Italian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/misi", available_at:"27 days in advance at 10 AM", advance_period:27, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:36, name:"Double Chicken Please", restaurant_url:"http://www.doublechickenplease.com", area:"Lower East Side", cuisine:"Cocktails / New American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/double-chicken-please", available_at:"6 days in advance at 12 AM", advance_period:6, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:37, name:"Sushi Nakazawa", restaurant_url:"https://www.sushinakazawa.com/", area:"West Village", cuisine:"Sushi", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/sushi-nakazawa", available_at:"14 days in advance at 12 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:38, name:"Peter Luger", restaurant_url:"https://peterluger.com/", area:"Williamsburg", cuisine:"Steakhouse", reservation_method:"Resy", reservation_link:"https://resy.com/cities/ny/peter-luger-steak-house", available_at:"30 days in advance at midnight", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:40, name:"Fish Cheeks", restaurant_url:"http://fishcheeksnyc.com/", area:"Nolita", cuisine:"Thai", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/fish-cheeks", available_at:"29 days in advance at midnight", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:41, name:"Chinese Tuxedo", restaurant_url:"https://chinesetuxedo.com/", area:"Chinatown", cuisine:"Chinese", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/chinese-tuxedo", available_at:"14 days in advance at midnight", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:42, name:"Atoboy", restaurant_url:"http://www.atoboynyc.com/", area:"NoMad", cuisine:"Korean", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/atoboy", available_at:"29 days in advance at midnight", advance_period:29, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:43, name:"Monkey Bar", restaurant_url:"https://nycmonkeybar.com/", area:"Midtown East", cuisine:"American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/monkey-bar-nyc", available_at:"20 days in advance at 9 AM", advance_period:20, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:44, name:"Roscioli (Tasting Menu)", restaurant_url:"https://rosciolinyc.com/", area:"Soho", cuisine:"Italian", reservation_method:"OpenTable", reservation_link:"https://www.opentable.com/r/roscioli-tasting-menu-new-york", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:45, name:"Bungalow", restaurant_url:"https://www.bungalowny.com/", area:"East Village", cuisine:"Indian", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/bungalow-ny", available_at:"20 days in advance at 11 AM", advance_period:20, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T11:00:00", { zone: "America/New_York" })},
  {id:46, name:"Una Pizza Napoletana", restaurant_url:"https://www.unapizza.com/", area:"Lower East Side", cuisine:"Pizza", reservation_method:"OpenTable", reservation_link:"https://www.opentable.com/r/una-pizza-napoletana-new-york", available_at:"14 days in advance at 9 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:47, name:"Din Tai Fung", restaurant_url:"https://www.dintaifungusa.com/", area:"Midtown West", cuisine:"Chinese", reservation_method:"Yelp", reservation_link:"https://www.yelp.com/reservations/din-tai-fung-new-york-3", available_at:"30 days in advance at midnight", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:48, name:"Le Café Louis Vuitton", restaurant_url:"https://lecafelvnyc.com/", area:"Midtown East", cuisine:"French", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/le-cafe-louis-vuitton", available_at:"27 days in advance at midnight", advance_period:27, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:49, name:"Theodora", restaurant_url:"https://www.theodoranyc.com/", area:"Fort Greene", cuisine:"Mediterranean", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/theodora", available_at:"30 days in advance at 9 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:50, name:"Ha's Snack Bar", restaurant_url:"https://www.instagram.com/has_dac_biet/", area:"Lower East Side", cuisine:"Vietnamese", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/has-snack-bar", available_at:"20 days in advance at 12 PM", advance_period:20, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T12:00:00", { zone: "America/New_York" })},
  {id:51, name:"Red Hook Tavern", restaurant_url:"https://www.redhooktavern.com/", area:"Red Hook", cuisine:"American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/red-hook-tavern", available_at:"14 days in advance at 12 AM", advance_period:13, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:52, name:"Corner Bar", restaurant_url:"https://cornerbarnyc.com/", area:"Lower East Side", cuisine:"American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/corner-bar", available_at:"14 days in advance at 9 AM", advance_period:27, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T09:00:00", { zone: "America/New_York" })},
  {id:53, name:"Hillstone", restaurant_url:"https://hillstonerestaurant.com/locations/nyc-parkavenuesouth/", area:"Rose Hill", cuisine:"American", reservation_method:"Own Site", reservation_link:"https://hillstonerestaurant.com/locations/nyc-parkavenuesouth/", available_at:"30 days in advance at 12 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T00:00:00", { zone: "America/New_York" })},
  {id:54, name:"Eleven Madison Park", restaurant_url:"https://www.elevenmadisonpark.com/", area:"Flatiron", cuisine:"New American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/eleven-madison-park", available_at:"First of previous month at 10 AM (through end of next month)", advance_period:1, advance_unit: "months", advance_type: "first_of_month", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:55, name:"Per Se", restaurant_url:"https://thomaskeller.com/perseny/", area:"Columbus Circle", cuisine:"French", reservation_method:"Tock", reservation_link:"https://www.exploretock.com/perse", available_at:"First of previous month at 10 AM (through end of next month)", advance_period:1, advance_unit: "months", advance_type: "first_of_month", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:56, name:"Polo Bar", restaurant_url:"https://www.ralphlauren.com/global-polo-bar", area:"Midtown East", cuisine:"American", reservation_method:"Phone", reservation_link:"tel:+1-212-207-8562", available_at:"30 days in advance at 10 AM", advance_period:30, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:57, name:"The Corner Store", restaurant_url:"https://www.thecornerstoresoho.com/", area:"Soho", cuisine:"American", reservation_method:"Own Site / DoorDash", reservation_link:"https://www.thecornerstoresoho.com/#/form-reservations", available_at:"13 days in advance at 10 AM", advance_period:13, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T10:00:00", { zone: "America/New_York" })},
  {id:57, name:"Waverly Inn", restaurant_url:"https://www.waverlynyc.com/", area:"West Village", cuisine:"American", reservation_method:"Resy", reservation_link:"https://resy.com/cities/new-york-ny/venues/the-waverly-inn", available_at:"14 days in advance at 8 AM", advance_period:14, advance_unit: "days", advance_type: "days_advance", time: DateTime.fromISO("1970-01-01T08:00:00", { zone: "America/New_York" })},
]; 

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


    var tableContainer = document.querySelector("#restaurant-data");
    if (tableContainer) {
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
        {title:"Reservation Method", field:"reservation_method", formatter:"link", sorter:"string",  minWidth:150,responsive:4, hozAlign:"center", formatterParams:{
                labelField:"reservation_method",
                urlField:"reservation_link",
                target:"_blank",
            }, headerFilter:"input", headerFilterPlaceholder:"e.g. Resy, Phone"},
        {title:"Days in Advance", field:"advance_period", sorter:"number", hozAlign:"center", minWidth:150, responsive:2, formatter:function(cell, formatterParams, onRendered){
          var data = cell.getData();
          if (data.advance_type === 'first_of_month') {
            return "1st of Prev. Month";
          }
          return data.advance_period + " " + data.advance_unit;
        }},
        {title:"Time (EST)", field:"time", hozAlign:"center", sorter:"datetime", minWidth:150, responsive:2, formatter:"datetime", formatterParams:{
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
    }

    if (tableContainer) {
    tabledata.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
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

// Append 
  document.body.appendChild(button);



}

});
}
