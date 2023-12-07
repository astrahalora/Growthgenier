require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
// const profileModel = require("./db/profile.model");
const Project = require("./db/project.model");

const { MONGO_URL, PORT = 5000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.route("/api/growth/")
  .get(async (req, res) => {
    try {
      const projects = await Project.find();
      return res.json(projects);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    const project = new Project({
      name: req.body.name,
      tasks: req.body.tasks
    });

    try {
      const newProject = await project.save();
      return res.status(201).json(newProject);
    } catch(err) {
      return res.status(400).json({ message: err.message });
    }
  })

  app.route("/api/growth/last-incomplete")
  .get(async (req, res) => {
    try {
      const lastProject = await Project.findOne({ status: false }).sort({ _id: -1 });
      return res.json(lastProject);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  app.route("/api/growth/last-complete/:id")
  .get(async (req, res) => {
    const projectId = req.params.id;
    try {
      const lastProject = await Project.findOne({ _id: projectId });
      return res.json(lastProject);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  app.route("/api/growth/:id")
  .patch(async (req, res) => {
    const projectId = req.params.id;
    
    try {
      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: { ...req.body } },
        { new: true }
      );

      const updatedProject = await project.save();
      return res.json(updatedProject);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    const projectId = req.params.id;
    try {
      const existingProject = await Project.findById(projectId);

      if (existingProject) {
        existingProject.tasks = req.body;
        const updatedProject = await existingProject.save();
        return res.json(updatedProject);
      } else {
        return res.status(404).json({ message: "Project not found" });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}/api/growth`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});