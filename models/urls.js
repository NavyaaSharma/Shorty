const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urlCode:{type:String},
    oldUrl:{type:String},
    newUrl:{type:String}
});

module.exports = mongoose.model("Url", urlSchema);
