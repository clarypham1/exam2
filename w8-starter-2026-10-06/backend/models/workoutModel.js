const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the workout
  description: { type: String, required: true }, // Details about the workout
  videoUrl: { type: String, required: true }, // Link to the workout video
  instructor: { type: String, required: true }, // Name of the trainer
  durationWeeks: { type: Number, required: true }, // How many weeks the program lasts
});

// add virtual field id
workoutSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = mongoose.model("Workout", workoutSchema);
