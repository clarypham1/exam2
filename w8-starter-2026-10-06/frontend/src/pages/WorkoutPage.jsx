import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


   const deleteWorkout = async () => {
    try {
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

 const onDeleteClick = (workoutId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirm) return;

    deleteWorkout(workoutId);
    navigate("/");
  };


   return (
    <div className="product-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{workout.title}</h2>
          <p>Description: {workout.description}</p>
          <p>Video URL: {workout.videoUrl}</p>
          <p>Instructor: {workout.instructor}</p>
          <p>Duration: {workout.durationWeeks}</p>

          <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
          <button onClick={() => onDeleteClick(product._id)}>Delete</button>
        </>
      )}
    </div>
  );
};
export default WorkoutPage;