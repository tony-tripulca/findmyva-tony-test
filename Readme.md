# Findmyva Test for Tony Tripulca

Create a simple script that will scrape of fetch race details from [sportsbet.com.au](https://sportsbet.com.au)

## Development strategy

sportsbet.com.au is using Python to push data on the frontend on X intervals which makes it more like a webhook/websocket updates. Getting the data from API endpoints seems to be unreachable using axios' javascript.

Hence, we are now scraping the endpoint `/racing-schedule` and using cheerio to format it to DOM. We can then filter the race on DOM manipulation.

## Setup involved in the VM

1. Installed nodejs
2. Installed git
3. Installed vs code

## Run locally

### Dependency

1. Install nodejs 22.11.0
2. Install axios `npm install axios`
3. Install cheerio `npm install cheerio`

### Execute

1. Run `npm start`
