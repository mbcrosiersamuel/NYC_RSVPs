Hi 👋

This is a small, single page website to aggregate when 
reservations open at popular New York City restaurants. In 
addition to the searchable/sortable raw data by restaurant, 
there's a calculator that lets you pick a restaurant and desired 
reservation date, then calculate when reservations open.

## Features

- **Restaurant Database**: Searchable and sortable data for popular NYC restaurants
- **Reservation Calculator**: Calculate when reservations open for your desired restaurant and date
- **Timing Analysis**: Detailed explanation of why reservation timing is so complex

## Project Structure

```
NYC_RSVPs/
├── index.html                                   # Main page
├── reservation-open-date-calculator.html        # Calculator page  
├── why-timing-reservations-is-so-hard.html      # Blog post page
├── assets/
│   ├── icons/                                   # Favicons & app icons
│   └── images/                                  # Content images
├── css/
│   └── style.css                                # Stylesheets
├── js/
│   ├── script.js                                # Main JavaScript
│   └── luxon.js                                 # Luxon library
├── config/
│   ├── site.webmanifest                         # Web app manifest
│   ├── browserconfig.xml                        # Microsoft browser config
├── vercel.json                                  # Vercel deployment config
└── README.md
```

The restaurant data is not actually a database, but is stored in the script.js file.

## Contributing

Changes or corrections are welcome if something looks out of place! Please reach out if you notice any inaccuracies in the reservation timing data.

## Contact

Changes or corrections are welcome if something looks out of place! Please feel free to make a PR or to email hi@nycrsvps.com.
