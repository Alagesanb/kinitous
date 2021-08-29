const mongoose = require("mongoose")

var schema = mongoose.Schema;

var Userschema = new schema({

    username:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
     dob:
    {
        type:Date,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },country:
    {
        type:String,
        required:true
    },


        
});
const model=mongoose.model('Tb_User', Userschema);
 module.exports = model;
