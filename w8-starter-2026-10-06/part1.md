# Exam: Part 1 (Without Authentication)

## Deliverables

- Working API and frontend without authentication.
- Passing workout CRUD API tests.
- A commit for each iteration, for example `[iter3] feat(workouts): implement workout editing`.

## Setup

Clone the starter code from [here](https://github.com/tx00-resources-en/w8-starter-2026-10-06). Use the cloned `w8-fullstack-starter` in your own working folder. 

In `backend`:

```bash
npm install
```

Copy `.env.example` to `.env`, set `MONGO_URI`, and ensure MongoDB is running. The default backend port is `4000`.

In a second terminal, from `frontend`:

```bash
npm install
```

Start both applications from their respective folders:

```bash
npm run dev
```

Keep nodemon for the backend. The Vite proxy forwards `/api` to `http://localhost:4000`. Do not install Vitest or Supertest until Iteration 4.

## Workout Model

```js
const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Name of the workout
  description: { type: String, required: true },   // Details about the workout
  videoUrl: { type: String, required: true },      // Link to the workout video
  instructor: { type: String, required: true },    // Name of the trainer
  durationWeeks: { type: Number, required: true }, // How many weeks the program lasts
});
```

## Iteration 1: Add and Fetch Workouts

Implement:

- `POST /api/workouts`: save a workout and return JSON with status `201`.
- `GET /api/workouts`: return all workouts as JSON with status `200`.

Complete the frontend add form and listings. Submit all **five** schema fields to the backend and navigate home after success. Show loading, empty, and error states.

Verify by adding a workout in the browser, checking the list, and refreshing to confirm MongoDB persistence. A missing required field must return `400`.


## Iteration 2: Read and Delete One Workout

Implement:

- `GET /api/workouts/:workoutId`: return one workout with status `200`.
- `DELETE /api/workouts/:workoutId`: remove the workout and return status `204` with no response body.

Link each listing to its details page. Show title, description, videoUrl, instructor, and durationWeeks. Add a Delete button and navigate home after successful deletion.

Use actual database IDs. Return `400` for a malformed ID and `404` for a valid ID that does not exist.

Verify details in the browser and confirm deletion.

## Iteration 3: Update One Workout

Implement `PUT /api/workouts/:workoutId`. Use the modern update option:

```js
const workout = await Workout.findOneAndUpdate(
  { _id: req.params.workoutId },
  { ...req.body },
  { returnDocument: "after", runValidators: true }
);
```

Return the updated workout with status `200`. Return `400` for a malformed ID or invalid updated field, and `404` for a missing workout. Do not use `new: true`.

Add an Edit button on the details page. Load the current values into the edit form, submit the changes, and navigate back to the details page.

Verify title and durationWeeks edits, then refresh to confirm persistence. 

## Iteration 4: Add API Tests

Install testing packages now, from `backend`:

```bash
npm install --save-dev vitest supertest
```

The starter already includes `cross-env`. If it is missing from your project, install it:

```bash
npm install cross-env
```

Add the backend script:

```json
"test": "cross-env NODE_ENV=test vitest run"
```

Create `backend/vitest.config.mjs`:

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    fileParallelism: false,
    testTimeout: 20000,
  },
});
```

Create `tests/workout.test.js` with:

- A seed array containing two workouts.
- `beforeAll` connecting through `connectDB()`.
- `beforeEach` deleting test workouts and inserting the seed array.
- `afterAll` closing the Mongoose connection.
- One `describe` per endpoint, nested scenarios, and readable `it("should ...")` tests.
- Separate checks for status codes and database persistence.
- IDs read from MongoDB rather than hard-coded IDs.

Set `TEST_MONGO_URI` to a disposable database with a different database name from development. These tests reset the workout collection before each test. The script explicitly selects `NODE_ENV=test`.

Our workout API returns `400` for malformed IDs; adapt the product guide's `404` examples accordingly. Successful deletes return `204`.

Run:

```bash
npm test
```

Also verify CRUD in the browser against the backend. Stop if MongoDB is unavailable or a check fails.