require("dotenv").config();
const mongoose = require("mongoose");

const ProfileModel = require("./db/profile.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
};

const generateProfile = async() => {
    await ProfileModel.deleteMany({});

    await ProfileModel.create({
        level: "Dirt",
        image: "https://images2.imgbox.com/a8/c5/HKbYaDUB_o.jpg",
        projects: []
    });
    console.log("Profile created");
};

const main = async() => {
    await mongoose.connect(mongoUrl);

    await generateProfile();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.log(error);
    process.exit(1);
});