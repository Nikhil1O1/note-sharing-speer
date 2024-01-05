const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Let me know your name'],
        minlength: [10, 'A name must have at least 10 char'],
        validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validator: [validator.isEmail],
        required: [true, 'Your Email Id is required']
      },
      password: {
        type: String,
        required: [true, 'Password is requried'],
        timestamps: true,
        minlength: 8,
        select: false
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Password is requried'],
        validate: {
            //this works only on save & create, [save/create is called in controller]
            validator: function(el) {
                return el === this.password;
            },
            message: 'password should be same!'
        }
    },
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
const User = mongoose.model('User', userSchema);

module.exports = User;