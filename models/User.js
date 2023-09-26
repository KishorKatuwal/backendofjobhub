const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        default: '1234567890',
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isAgent:{
        type: Boolean,
        default: false,
    },
    skills:{
        type: Array,
        default:false,
    },
    profile: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
    }

},
{
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);
