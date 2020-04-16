const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        minlength:3
    },
    password: {
        type:String,
        required:true,
        minlength:3
    }
},{
    timestamps:true,
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;