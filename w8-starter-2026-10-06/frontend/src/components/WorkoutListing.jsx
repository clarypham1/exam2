import { Link } from "react-router-dom";

const WorkoutListing = (workout) => {
  return (
    <div className="workout-preview">
      <h2><Link to={`/workouts/${workout._id}`}>{workout.title}</Link></h2>
      <p>Description: {workout.description}</p>
      <p>Video URL: {workout.videoUrl}</p>
      <p>Instructor: {workout.instructor}</p>
      <p>Duration: {workout.durationWeeks}</p>
    </div>
  );
};


export default WorkoutListing;
