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

	let response = {
        "blocks": [
            {
                "type": "image",
                "image_url": "https://i.pinimg.com/originals/50/4f/0d/504f0d014726ffeab3ef79fc50dd6bea.jpg",
                "alt_text": "disco jesus"              
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


