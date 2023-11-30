const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: String,
    tasks: [
        {
            taskName: String,
            taskStatus: {
                type: Boolean,
                default: false
            }
        }
    ],
    status: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Project", ProjectSchema);