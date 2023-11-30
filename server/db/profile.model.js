const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfileSchema = new Schema({
    level: {
        type: String,
        default: "Dirt"
    },
    image: {
        type: String,
        default: "../assets/images/growth_0.jpg"
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
});

module.exports = mongoose.model("Profile", ProfileSchema);