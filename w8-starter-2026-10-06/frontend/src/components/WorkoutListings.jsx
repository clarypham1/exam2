import WorkoutListing from "./WorkoutListing";

const WorkoutListings = ({ workouts }) => {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutListing key={workout.id} wokrout={workout} />
      ))}
    </div>
  );
};

export default WorkoutListings;