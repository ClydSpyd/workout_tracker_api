### Design Principles

- **Separation of concerns** — each layer has one responsibility  
- **High cohesion** — all module-specific code lives together  
- **Low coupling** — layers depend only on what they need  
- **Scalable structure** — easy to extend with auth, analytics, caching, etc.  

This structure keeps the codebase maintainable, testable, and production-ready.

## Module Architecture

Modules follow a layered, feature-based architecture.  
Each file has a single, clear responsibility:

| File | Responsibility |
|------|---------------|
| `[module].routes.ts`     | Maps HTTP routes (URLs) to controller functions
| `[module].controller.ts` | Handles the HTTP layer (request/response logic)
| `[module].service.ts`    | Contains business logic and domain rules
| `[module].repository.ts` | Handles database access and queries
| `[module].model.ts`      | Defines the MongoDB schema (Mongoose model)
| `[module].types.ts`      | Contains TypeScript types and DTO definitions

## API Functionalities Overview

### Workout Module
This module enables users to:
- **Log a workout session:** Record details of a gym visit, including date, notes, and a list of exercises performed (with sets, reps, and weights).
- **Fetch a specific workout:** Retrieve all details for a single workout by its unique ID.
- **List all workouts for a user:** Get a history of workouts performed by a specific user, supporting progress tracking and analytics.
- **Prevent duplicate logging:** Ensures a user cannot log more than one workout for the same date.
- **Delete a workout:** Remove a workout record if needed (e.g., for corrections).

### Routine Module
This module enables users to:
- **Create a workout routine:** Define a fixed set of exercises (with sets/reps/weights) as a template for future workouts or for sharing.
- **Fetch a specific routine:** Retrieve the details of a routine by its unique ID.
- **List all routines:** View all available routines, supporting reference, planning, or selection for a workout.
- **Delete a routine:** Remove a routine template if it is no longer needed.

### Shared & Core Functionalities
- **Database Connection:** Securely connects to MongoDB using environment variables, ensuring data persistence for workouts and routines.
- **Error Handling:** Provides consistent, user-friendly error responses for all API endpoints, improving reliability and debugging.

---
