import axios from "axios";
import moment from "moment";
import fs from "fs";

/**
 * Axios to fetch today schedule
 * @param {*} today 
 * @returns 
 */
const fetchSchedules = (today) => {
  return axios({
    method: "GET",
    baseURL: "https://www.sportsbet.com.au/apigw",
    url: `/sportsbook-racing/Sportsbook/Racing/AllRacing/${today}`,
  });
}

/**
 * Convert json to csv
 * @param {*} arr 
 * @returns 
 */
const convertToCsv = (arr) => {
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n');
}

/**
 * Write the converted json to csv in the current dir
 * @param {*} csv 
 */
const writeToCsvFile = (csv) => {
  fs.writeFile("races.csv", csv, (err) => {
    if (err) console.error(err);
    else {
        console.log("File written successfully\n");
    }
  });
}

/**
 * Execute the program
 */
const main = () => {
  let date = moment();
  
  // Get schedules for today
  fetchSchedules(date.format("YYYY-MM-DD")).then((response) => {
    let sections = response.data.dates[0].sections
    let races = [];

    // Disect sections
    sections.forEach((section) => {
      // Disect meetings
      section.meetings.forEach((meeting) => {
        // Disect events, this is the actual race data
        if(meeting.regionName === "Australia") {
          meeting.events.forEach((event) => {
            races.push({
              date: moment.unix(event.startTime).format("YYYY-MM-DD"),
              name: `"${event.name}"`, // escape other commas on the name
              race_number: event.raceNumber,
              start_time: moment.unix(event.startTime).format("HH:mm A"),
            });
          })
        }
      });
    });

    // Console as table
    console.table(races);

    // Execute conversion and file write
    writeToCsvFile(convertToCsv(races));
  }).catch((error) => {
    console.error(error);
  })
}

// Call the program
main();