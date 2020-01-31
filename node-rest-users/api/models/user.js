const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {type : String,required: true},
    email: {type : String,required: true},
    first_name: {type: String, required:true},
    last_name: {type: String, required:false},
    password: {type: String, required:false},
    phoneNumber: {type: String, required:false},
    address: {type: String, required:false},
    is_admin: {type: Boolean, required:true}
});

module.exports = mongoose.model('User',userSchema);