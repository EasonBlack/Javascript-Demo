var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    Type: String,    //['place','character','start','plot','end']
    SourceType: String,    //['history','inspire','book','film','tv']
    SourceFrom : String,   //['history-country','book/film name']
    Time: String,    //'history time'
    LeadTo:[String],   //card id
    RelateTo: [String],  //card id
    Content: String,
    key: [String],
    Used: String,    //yes no thinking
    Copy: Boolean
});

var Cards = mongoose.model('Card', CardSchema);


module.exports = Cards;