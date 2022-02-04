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

                for (i = 0; i < 300; i++) {
                    obj.table.push({
                        uccRequestId: 'U20220124999999991',
                        uccTmId: 'INZ000010231',
                        uccTmName: '5PAISA CAPITAL LIMITED',
                        uccPanExempt: true,
                        uccPanNo: 'AWEPK6818L',
                        uccCountry: 'India',
                        uccMobileNo: '919619993808',
                        uccEmailId: 'kkatak@gmail.com',
                        uccMobileNoModified: true,
                        uccEmailIdModified: false,
                        uccDpId: 'IN300214',
                        uccClientId: '18181165',
                        uccInvestorCode: '12345678',
                        uccRequestType: 'NEW',
                        uccNodeStatus: 1,
                        uccEmailStatus: 'VERIFIED',
                        uccMobileStatus: 'NOT VERIFIED',
                        uccPanStatus: 'VERIFIED'
                    });
                }

                let json = JSON.stringify(obj);
                fs.writeFile('testJson.json', data = json, () => { });
            }
        });
    } else {

        console.log("file not exists");

        for (i = 0; i < 1000; i++) {
            obj.table.push({
                uccRequestId: 'U20220124999999991',
                uccTmId: 'INZ000010231',
                uccTmName: '5PAISA CAPITAL LIMITED',
                uccPanExempt: true,
                uccPanNo: 'AWEPK6818L',
                uccCountry: 'India',
                uccMobileNo: '919619993808',
                uccEmailId: 'kkatak@gmail.com',
                uccMobileNoModified: true,
                uccEmailIdModified: false,
                uccDpId: 'IN300214',
                uccClientId: '18181165',
                uccInvestorCode: '12345678',
                uccRequestType: 'NEW',
                uccNodeStatus: 1,
                uccEmailStatus: 'VERIFIED',
                uccMobileStatus: 'NOT VERIFIED',
                uccPanStatus: 'VERIFIED'
            });
        }

        let json = JSON.stringify(obj);
        fs.writeFile('testJson.json', json);
    }
});