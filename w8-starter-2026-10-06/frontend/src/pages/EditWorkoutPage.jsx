import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [durationWeeks, setDurationWeeks] = useState("");


  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setVideoUrl(data.videoUrl);
        setInstructor(data.instructor);
        setDurationWeeks(data.durationWeeks);
      
      } catch (error) {
        console.error("Error fetching workout:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id]);

   const updateWorkout = async (workout) => {
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });
      if (!res.ok) {
        throw new Error("Failed to update workout");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

const submitForm = (e) => {
    e.preventDefault();

    const updatedWorkout = {
      title,
      description,
      videoUrl,
      instructor,
      durationWeeks
    };

    updateWorkout(updatedWorkout);
    return navigate(`/workouts/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
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

export default EditWorkoutPage;