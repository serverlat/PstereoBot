module.exports = async function (context, req) {
    const axios = require("axios")

    const pairs = req.body.split('&')
    let parameters = []
    pairs.forEach( pair => {
        pair = pair.split('=');
        parameters[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    context.res = {
            status: 200
    };
    context.done()
	let url_no = "https://api.openweathermap.org/data/2.5/weather?lat=63.4305&lon=10.3951&units=metric&appid=24cba2b2c83c464cc46ba4e3a0a2bc5b"
	let url_sl = "https://api.openweathermap.org/data/2.5/weather?lat=6.9271&lon=79.8612&units=metric&appid=24cba2b2c83c464cc46ba4e3a0a2bc5b"

	let weather_no_req = axios.get(url_no)
	let weather_sl_req = axios.get(url_sl)
    let weather_no = await weather_no_req
    let weather_sl = await weather_sl_req
	let state_no = weather_no.data.weather[0].main
	let state_sl = weather_sl.data.weather[0].main
	let temp_no = weather_no.data.main.temp
	let temp_sl = weather_sl.data.main.temp

	let response = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:flag-lk: : ${state_sl}, with a temperature of precisely ${temp_sl} degrees. \n :flag-no: : ${state_no}, with a temperature of precisely ${temp_no} degrees. \n Sri Lanka leads by ${Math.round(temp_sl - temp_no)} degrees :thermometer:`
                }                       
            }
        ]
    }

    axios.post(
        parameters["response_url"],
        JSON.stringify(response),
        {headers: {'content-type': 'application/json'}}
    ).then(() => {
        console.log("Request sent");
        })
      .catch(error => {
        console.log(error);
        });
}


