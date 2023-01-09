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

    axios.post(
        parameters["response_url"],
        blockify(parameters),
        {headers: {'content-type': 'application/json'}}
    ).then(() => {
        console.log("Request sent");
      })
      .catch(error => {
        console.log(error);
      });
}

function blockify (parameters) {
    return (JSON.stringify({       
        "blocks":  [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hello <@${parameters["user_id"]}>! Nice to meet you :meow_wow:`
                }                       
            }
        ]
    }))
}

