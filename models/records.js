const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    farm:{
        type:String,
    },
    plant:{
        type:String,
    },
    activity:{
        type:String,
    },
    date:{
        type:String,
    }
});


//exporting the schema to the database
module.exports =mongoose.model('recordModel', recordSchema);