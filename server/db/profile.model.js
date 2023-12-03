const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfileSchema = new Schema({
    level: {
        type: String,
        default: "Dirt"
    },
    image: {
        type: String,
        default: "https://images2.imgbox.com/a8/c5/HKbYaDUB_o.jpg"
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
});

module.exports = mongoose.model("Profile", ProfileSchema);