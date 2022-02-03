// var SendClean= require('./SendClean.js');
// var SendClean_client = new SendClean.SendClean('80940214', '2bZ1zHM3tNHK43DotA9DfAdF', 'us1-mta1.sendclean.net');
// var param = {
//     "smtp_user_name": "smtp34269159",
//     "message": {
//         "html": "Example HTML content",
//         "text": "Example text content",
//         "subject": "example subject",
//         "from_email": "message.from_email@example.com",
//         "from_name": "Example Name",
//         "to": [{
//                 "email": "ankitdogra1996@gmail.com",
//                 "name": "Recipient Name",
//                 "type": "to"
//             }],
//         "headers": {
//             "Reply-To": "message.reply@example.com",
//             "X-Unique-Id": "id "
//         },

//     }
// };
// SendClean_client.messages.sendMail(param, function(result) {
//     console.log({result});
//     /*
//     {
//         "status" : "success",
//         "message" : "message have been Queued ... ";
//     }
//      */

// }, function(e) {
//     // SendCleanreturns the error as an object with name and message keys
//     console.log('A SendCleanerror occurred: ' + e.name + ' - ' + e.message);
// }); ]




const request = require('request');

const options = {
    url: 'https://api.us1-mta1.sendclean.net/v1.0/messages/sendMail',
    json: true,
    body: {
        "message": {
            "to": [{
                "email": "chahat@webmobinfo.ch",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            }, {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ant@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            }, {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "ankur.kashyap290@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            }, {
                "email": "ankitdogra1996@gmail.com",
                // "name": "Ankit Dogra",
                // "type": "to"
            },
            {
                "email": "ankit@webmobsoft.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "flutterdev4u@gmail.com",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            {
                "email": "parul@webmobinfo.ch",
                // "name": "Ankit webmob",
                // "type": "to"
            },
            ],
            "html": "ukhkjlklk",
            "subject": "test EMIAL 1231234234324",
            "from_email": "admin@webmobsoft.com",
            "from_name": "no-reply"
        },
        "owner_id": "80940214",
        "token": "2bZ1zHM3tNHK43DotA9DfAdF",
        "smtp_user_name": "smtp34269159"
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});



