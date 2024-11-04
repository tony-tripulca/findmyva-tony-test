import axios from "axios";
import * as cheerio from 'cheerio';

let data = [];

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

    $("tr td").each((i, element) => {   
      let href = $(element).find("a").attr("href");
      let name =  $(element).find($("span[data-automation-id$='meeting-name']")).text();

      if(name) {
        data.push({
          href: href,
          name: name
        }) 
      }      
    });

    console.log(data);
  }).catch((error) => {
    console.log(error);
  })

  
}

loadHtml();