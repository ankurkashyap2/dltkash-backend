const fs = require('fs');

let obj = {
    table: []
};

fs.exists('testJson.json', function (exists) {

    if (exists) {

        console.log("yes file exists");

        fs.readFile('testJson.json', function readFileCallback(err, data) {

            if (err) {
                console.log(err);
            } else {
                // obj = JSON.parse(data);

                for (i = 0; i < 100000; i++) {
                    obj.table.push({
                        "uccRequestId": "234718212902",
                        "uccTmId": "98234921",
                        "uccTmName": "Zerodha",
                        "uccPanExempt": "false",
                        "uccPanNo": "COMPA44565A",
                        "uccCountry": "India",
                        "uccMobileNo": "9877114806",
                        "uccEmailId": "ankit@getnada.com",
                        "uccMobileNoModified": "false",
                        "uccEmailIdModified": "false",
                        "uccDpId": "2384092431",
                        "uccClientId": "82340918043",
                        "uccInvestorCode": "18293",
                        "uccRequestType": "NEW",
                        "uccNodeStatus": "01",
                        "uccEmailStatus": "VERIFIED",
                        "uccMobileStatus": "VERIFIED",
                        "uccPanStatus": "VERIFIED",
                        "emailAttempts": "1",
                        "mobileAttempts": "3",
                        "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
                        "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
                        "isEmailEncrypted": "false",
                        "isPhoneEncrypted": "false",
                        "UTCNotification": "15:00"

                    });
                }

                let json = JSON.stringify(obj);
                fs.writeFile('testJson.json', data = json, () => { });
            }
        });
    } else {

        console.log("file not exists");

        for (i = 0; i < 100000; i++) {
            obj.table.push({"uccRequestId": "234718212902",
                "uccTmId": "98234921",
                "uccTmName": "Zerodha",
                "uccPanExempt": "false",
                "uccPanNo": "COMPA44565A",
                "uccCountry": "India",
                "uccMobileNo": "9877114806",
                "uccEmailId": "ankit@getnada.com",
                "uccMobileNoModified": "false",
                "uccEmailIdModified": "false",
                "uccDpId": "2384092431",
                "uccClientId": "82340918043",
                "uccInvestorCode": "18293",
                "uccRequestType": "NEW",
                "uccNodeStatus": "01",
                "uccEmailStatus": "VERIFIED",
                "uccMobileStatus": "VERIFIED",
                "uccPanStatus": "VERIFIED",
                "emailAttempts": "1",
                "mobileAttempts": "3",
                "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
                "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
                "isEmailEncrypted": "false",
                "isPhoneEncrypted": "false",
                "UTCNotification" : "15:00"
        });
        }

        let json = JSON.stringify(obj);
        fs.writeFile('testJson.json', json);
    }
});