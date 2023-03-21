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
	
    const sriLankaTime = new Date().toLocaleString('nb-NO', { timeZone: 'Asia/Colombo'});
    const noTime = new Date().toLocaleString('nb-NO', { timeZone: 'Europe/Oslo'});

	let response = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:flag-lk: : ${sriLankaTime} \n :flag-no: : ${noTime} \n Sri Lanka is in the future by 4.5 hours :crystal_ball:`
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


