const fs = require('fs');

let obj = [];

fs.exists('500Record.json', function (exists) {

    if (exists) {
        console.log("yes file exists");

        fs.readFile('500Record.json', function readFileCallback(err, data) {

            if (err) {
                console.log(err);
            } else {
                // obj = JSON.parse(data);

                for (i = 0; i < 500; i++) {
                    obj.push({
                        "uccRequestId": `${i}234718212952123`,
                        "uccTmId": `${i}98234921123`,
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
                        "uccPanStatus": "VERIFIED"

                    });
                }

                let json = JSON.stringify(obj);
                fs.writeFile('500Record.json', data = json, () => { });
            }
        });
    } else {

        console.log("file not exists");

        for (i = 0; i < 500; i++) {
            obj.push({
                "uccRequestId": `${i}234718212952123`,
                "uccTmId": `${i}98234921123`,
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
        fs.writeFile('500Record.json', json);
    }
});