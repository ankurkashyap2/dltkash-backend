const mongoose = require("mongoose");

const recordCounter = new mongoose.Schema({
   
    date : {type: String},
    perHourCounterArr:{type:Array ,default:[]}

});
mongoose.model("recordCounter", recordCounter);
module.exports = mongoose.model("recordCounter");


// blk_data: [{
//     tx_addr: {type: String, max: 100}, // to do: change to a list
//     block_number: {type: String, max: 100}, // to do: change to a list
// }]