import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddWorkoutPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [durationWeeks, setDurationWeeks] = useState("");

  const addWorkout = async (newWorkout) => {
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });
      if (!res.ok) {
        throw new Error("Failed to add workout");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newWorkout = {
      title,
      description,
      videoUrl,
      instructor,
      durationWeeks

    };
    addWorkout(newWorkout);
    console.log(newWorkout);

    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Video URL:</label>
        <input
          type="url"
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <label>Instructor:</label>
        <input
          type="text"
          required
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        
        <label>Duration:</label>
        <input
          type="text"
          required
          value={durationWeeks}
          onChange={(e) => setDurationWeeks(e.target.value)}
        />
        <button>Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
