const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const captainSchema = new mongoose.Schema({
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
    contact_number: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    socketId: {
        type: String,
        default: null,
    },
    status:{
        type: String,
        enum:['active', 'inactive'],  
        default: 'active' 
    }, 
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'SUV', 'Sedan', 'Hatchback', 'motorcycle', 'auto' ],
        }, 
        model:{
            type: String, 
            required: true
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


captainSchema.methods.generateAuthToken = function() {
    try {
        const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {expiresIn: '24h'});
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Could not generate token");
    }
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const captainModel = mongoose.model('captain', captainSchema); 

module.exports = captainModel; 
