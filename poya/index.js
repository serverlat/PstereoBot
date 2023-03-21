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

    const poyas =   {
        0: {
            name: "Duruthu",
            dateString: "6th",
            date: new Date(2023,0,6),
            description: "Duruthu Poya is celebrated to commemorate the Buddha's first visit to Sri Lanka, which is believed to have taken place on a Duruthu Full Moon Poya Day over 2,500 years ago. It marks the beginning of Buddhism in Sri Lanka and the arrival of the Buddha's teachings to the island. It is an important holiday for Sri Lankan Buddhists and is celebrated with various religious activities and ceremonies at Buddhist temples across the country."
        },
        1: {
            name: "Navam",
            dateString: "5th",
            date: new Date(2023,1,5),
            description: "Navam Poya is celebrated in honor of the appointment of the first Buddhist nuns by the Buddha himself. The event took place on the full moon day of Navam in the fifth year of the Buddha's enlightenment. The Buddha's stepmother, Mahapajapati Gotami, and 500 other women were ordained as nuns by the Buddha, making it the first ordination of Buddhist nuns in history. This event marked a significant step towards gender equality in Buddhism, and Navam Poya is celebrated as a day of remembrance and gratitude for the role of women in Buddhism."
        },
        2: {
            name: "Medin",
            dateString: "6th",
            date: new Date(2023,2,6),
            description: "Medin Poya is celebrated to commemorate several events in the life of the Buddha, including his second visit to Sri Lanka, where he performed many miracles, and the conversion of the wealthy merchant, Anathapindika, to Buddhism. It is also believed to be the day on which the Buddha announced his impending death to his disciples."
        },
        3: {
            name: "Bak",
            dateString: "6th",
            date: new Date(2023,3,6),
            description: "Bak Poya is celebrated to commemorate the third visit of Buddha to Sri Lanka. According to Buddhist tradition, Buddha visited the island thrice, and the third visit was to settle a dispute between two Naga kings over a gem-studded throne. Buddha preached to the kings and their followers about the importance of non-violence and harmony, which resulted in the dispute being resolved peacefully. Bak Poya is also known as Sangamitta Day, as it is believed that Sangamitta, the daughter of King Ashoka, brought the sacred Bodhi tree sapling to Sri Lanka on this day."
        },
        4: {
            name: "Vesak",
            dateString: "5th",
            date: new Date(2023,4,5),
            description: "Vesak Poya is celebrated to commemorate the birth, enlightenment, and passing away (Parinibbana) of Gautama Buddha, the founder of Buddhism. It is considered the most important Buddhist festival, and is celebrated on the full moon day of the month of Vesak (usually in May) in many countries, including Sri Lanka. The day is marked by various religious activities such as visiting temples, lighting lamps, giving alms to the poor, and observing the Eight Precepts."

        },
        5: {
            name: "Poson",
            dateString: "3rd",
            date: new Date(2023,5,3),
            description: "Poson Poya is celebrated to commemorate the introduction of Buddhism to Sri Lanka by the Buddhist missionary monk Mahinda in the 3rd century B.C. Mahinda met King Devanampiyatissa at Mihintale, a mountain peak near Anuradhapura in Sri Lanka, and preached the first sermon. This is why Mihintale is often called 'the cradle of Buddhism' in Sri Lanka."
        },
        6: {
            name: "Esala",
            dateString: "3rd",
            date: new Date(2023,6,3),
            description: "Esala Poya is celebrated in commemoration of several important events in Buddhism, including the Buddha's first sermon, the arrival of the Tooth Relic in Sri Lanka, and the start of the annual monsoon season, which is significant for the agricultural society of Sri Lanka. It is also believed to be a time when the gods visit the earth, and so many devotees engage in acts of devotion and make offerings to ensure their blessings. Additionally, the Esala Perahera, which is held during this time, is a spectacular display of Sri Lankan culture and religion, featuring colorful processions, traditional music, and dances."
        },
        7: {
            name: "Adhi-Nikini",
            dateString: "1st",
            date: new Date(2023,7,1),
            description: "Nikini Full Moon Poya Day celebrates the Dhamma Sangayana - the First Buddhist Council. According to Buddhist tradition, the council was held shortly after the death of the Buddha, and is dated to have taken place around 400 BCE. At the council, what the Buddha had said, was agreed upon and recited. It was held at Sattapanni caves, Rajgriha (Bihar, India) under the patronage of the king Ajatashatru with the monk Mahakasyapa presiding and established the Tipitaka, the Buddhist scriptures. Nikini Poya is also the start of the rainy retreat for the Bhikkhu ordained monks."
        },
        8: {
            name: "Nikini",
            dateString: "30th",
            date: new Date(2023,8,30),
            description: "Nikini Full Moon Poya Day celebrates the Dhamma Sangayana - the First Buddhist Council. According to Buddhist tradition, the council was held shortly after the death of the Buddha, and is dated to have taken place around 400 BCE. At the council, what the Buddha had said, was agreed upon and recited. It was held at Sattapanni caves, Rajgriha (Bihar, India) under the patronage of the king Ajatashatru with the monk Mahakasyapa presiding and established the Tipitaka, the Buddhist scriptures. Nikini Poya is also the start of the rainy retreat for the Bhikkhu ordained monks."
        },
        9: {
            name: "Binara",
            dateString: "29th",
            date: new Date(2023,9,29),
            description: "Binara Poya is celebrated to commemorate two important events in the life of the Buddha. The first event was when the Buddha, still a prince named Siddhartha, left his palace in search of enlightenment. The second event was when the Buddha visited his hometown of Kapilavastu, where he converted his father, King Suddhodana, and many others to Buddhism. On Binara Poya, Buddhists engage in activities such as meditation, offering alms to monks, and listening to sermons about the life and teachings of the Buddha."
        },
        10: {
            name: "Vap",
            dateString: "28th",
            date: new Date(2023,10,28),
            description: "Vap Poya is celebrated to mark several important events in the life of Buddha. These events include the Buddha's first sermon at the Deer Park in Isipatana, where he laid out the Four Noble Truths and the Eightfold Path; the ordination of his son, Rahula, and the first 60 disciples; and the Buddha's journey to Tavatimsa heaven to preach to his mother, who had been reborn there. Additionally, Vap Poya marks the start of the Buddhist Lent, a three-month period of more intensive meditation and study for monks and nuns."
        },
        11: {
            name: "Il",
            dateString: "26th",
            date: new Date(2023,11,26),
            description: "Il Poya is celebrated in Sri Lanka to commemorate the establishment of the Buddhist order of nuns (Bhikkhuni Sasana) by the Buddha. According to Buddhist tradition, the Buddha's stepmother, Mahaprajapati Gautami, asked the Buddha to allow women to become ordained as nuns, but he initially refused. However, after she and other women followers cut off their hair and donned robes, the Buddha relented and established the order of nuns. Il Poya is therefore a celebration of the courage and determination of Mahaprajapati Gautami and the early female disciples who paved the way for the Bhikkhuni Sasana."
        },
        12: {
            name: "Unduvap",
            dateString: "26th",
            date: new Date(2023,12,26),
            description: "Unduvap Poya is a significant full moon day celebrated in Sri Lanka to commemorate the arrival of Sangamitta Theri, the daughter of King Ashoka, who brought a sapling of the sacred Bodhi tree to Sri Lanka in the 3rd century BC. The Bodhi tree is believed to be the tree under which the Buddha attained enlightenment. The sapling was brought to Anuradhapura, the ancient capital of Sri Lanka, and was planted at the Mahavihara monastery. Unduvap Poya is celebrated in honor of this historic event, and the day is observed with religious activities, pilgrimages, and acts of charity."
        }
    }

    const today = new Date();
    let nextPoya = poyas[today.getMonth()];
    if (today > nextPoya.date)
        nextPoya = poyas[today.getMonth() + 1]

	let response = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `The next Poya is ${nextPoya.name} Poya on the ${nextPoya.dateString} of ${nextPoya.date.toLocaleString('default', { month: 'long' })} :full_moon: \n\nHere is some info about it: \n\n${nextPoya.description}`
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


