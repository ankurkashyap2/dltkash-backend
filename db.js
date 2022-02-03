const mongoose = require("mongoose");
mongoose
    .connect(process.env.DBURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
    })
    .then(() => console.log("Connection successful!"))
    .catch((e) => {
        console.log(process.env.DBURI)
        throw new Error("Error Occurred!");
    });

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

mongoose.Promise = require("bluebird");
//sudo ssh -i DLTKASH.pem ubuntu@54.162.130.169
//sudo ssh -i insurewill.pem root@insurewill.com
