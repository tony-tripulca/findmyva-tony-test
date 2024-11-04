import axios from "axios";
import * as cheerio from 'cheerio';

const getSportsbet = () => {
  return axios({
    method: "GET",
    baseURL: "https://www.sportsbet.com.au",
    url: `/racing-schedule`,
  });
}

const loadHtml = () => {
  let sportsbet = "";
  
  getSportsbet().then((response) => {
    const $ = cheerio.load(response.data, null, false);
    const $table = $("table");
    console.log($table.html());
  }).catch((error) => {
    console.log(error);
  })

  
}

loadHtml();