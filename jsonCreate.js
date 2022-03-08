const fs = require('fs');

let obj = [];

fs.exists('small.json', function (exists) {

    if (exists) {

        console.log("yes file exists");

        fs.readFile('small.json', function readFileCallback(err, data) {

            if (err) {
                console.log(err);
            } else {
                // obj = JSON.parse(data);

                for (i = 0; i < 50; i++) {
                    obj.push({
                        "uccRequestId": `${i}234718212902`,
                        "uccTmId": `${i}98234921`,
                        "uccTmName": "Zerodha",
                        "uccPanExempt": "false",
                        "uccPanNo": "COMPA44565A",
                        "uccCountry": "India",
                        "uccMobileNo": "9877114806",
                        "uccEmailId": `ankit${i}@getnada.com`,
                        "uccMobileNoModified": "false",
                        "uccEmailIdModified": "false",
                        "uccDpId": "2384092431",
                        "uccClientId": "82340918043",
                        "uccInvestorCode": "18293",
                        "uccRequestType": "NEW",
                        "uccNodeStatus": "01",
                        "uccEmailStatus": "NOT VERIFIED",
                        "uccMobileStatus": "VERIFIED",
                        "uccPanStatus": "VERIFIED",
                        "UTCNotification": "11"

                    });
                }

                let json = JSON.stringify(obj);
                fs.writeFile('small.json', data = json, () => { });
            }
        });
    } else {

        console.log("file not exists");

        for (i = 0; i < 50; i++) {
            obj.table.push({
                "uccRequestId": `${i}234718212902`,
                "uccTmId": `${i}98234921`,
                "uccTmName": "Zerodha",
                "uccPanExempt": "false",
                "uccPanNo": "COMPA44565A",
                "uccCountry": "India",
                "uccMobileNo": "9877114806",
                "uccEmailId": `ankit${i}@getnada.com`,
                "uccMobileNoModified": "false",
                "uccEmailIdModified": "false",
                "uccDpId": "2384092431",
                "uccClientId": "82340918043",
                "uccInvestorCode": "18293",
                "uccRequestType": "NEW",
                "uccNodeStatus": "01",
                "uccEmailStatus": "NOT VERIFIED",
                "uccMobileStatus": "VERIFIED",
                "uccPanStatus": "VERIFIED",
                "UTCNotification" : "11"
        });
        }

        let json = JSON.stringify(obj);
        fs.writeFile('small.json', json);
    }
});