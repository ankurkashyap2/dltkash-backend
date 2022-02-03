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

                for (i = 0; i < 500000; i++) {
                    obj.table.push({
                        id: i,
                        square: i * i
                    });
                }

                let json = JSON.stringify(obj);
                fs.writeFile('testJson.json', data = json, () => { });
            }
        });
    } else {

        console.log("file not exists");

        for (i = 0; i < 5; i++) {
            obj.table.push({
                id: i,
                square: i * i
            });
        }

        let json = JSON.stringify(obj);
        fs.writeFile('testJson.json', json);
    }
});