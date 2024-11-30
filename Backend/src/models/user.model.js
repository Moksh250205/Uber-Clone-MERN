const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    full_name: {
        first_name: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        last_name: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        default: null,
    },
});

userSchema.methods.generateAuthToken = function() {
    try {
        const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {expiresIn: '24h'});
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Could not generate token");
    }
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;