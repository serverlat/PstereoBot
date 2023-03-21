module.exports = async function (context, req) {
    const axios = require("axios")

    const pairs = req.body.split('&')
    let parameters = []
    pairs.forEach( pair => {
        pair = pair.split('=');
        parameters[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    function blockify(lyrics) {
        return (JSON.stringify({       
            "blocks":  [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Here is a popular song I know! :notes: \n\n${lyrics} `
                    }                       
                }
            ]
        }))
    }

    axios.get(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=5&country=us&f_has_lyrics=1&apikey=de604103db29b6acb8d67a86e9074674`)
    .then(response => {
        const songNum = randomInteger(0, 4)
        const topSong = response.data.message.body.track_list[songNum].track.track_id
        axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${topSong}&apikey=${process.env.MUSICX_API_KEY}`)
        .then(r => {
            lyrics = r.data.message.body.lyrics.lyrics_body
            lyrics = lyrics.slice(0, lyrics.indexOf("*"))
            axios.post(
                parameters["response_url"],
                blockify(lyrics),
                {headers: {'content-type': 'application/json'}}
            ).then(() => {
                console.log("Request sent");
                })
              .catch(error => {
                console.log(error);
                });
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    });

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
}


