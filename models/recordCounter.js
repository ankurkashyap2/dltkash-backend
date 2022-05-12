const mongoose = require("mongoose");

const recordCounter = new mongoose.Schema({
   
    date : {type: String},
    perHourCounterArr:{type:Array ,default:[]}

});
mongoose.model("recordCounter", recordCounter);
module.exports = mongoose.model("recordCounter");
