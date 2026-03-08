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


# API Functionalities Overview

## Modules

### Workout Module
This module enables users to:
- **Create a workout session (incremental):** Start a new workout session. Accepts partial data (routineId/baseId, date, initial exercises, notes). You can begin with just a routine reference and add exercises/notes later.
- **Update workout session incrementally:** Add exercises, update notes, or metrics as the session progresses. Accepts partial updates.
- **Fetch a specific workout:** Retrieve the current state of a workout session by its unique ID.
- **List all workouts for a user:** Get a history of workouts performed by the authenticated user.
- **Delete a workout:** Remove a workout record if needed (e.g., for corrections).

### Routine Module
This module enables users to:
- **Create a workout routine:** Define a fixed set of exercises (with sets/reps/weights) as a template for future workouts or for sharing.
- **Fetch a specific routine:** Retrieve the details of a routine by its unique ID.
- **List all routines:** View all available routines, supporting reference, planning, or selection for a workout.
- **Delete a routine:** Remove a routine template if it is no longer needed.

### User Module
- **Register and login:** Handles user registration (with password hashing) and login (with JWT issuance).
- **User profile:** Stores email, password, username, profile pic, and other profile fields.
- **Repository/service pattern:** Separates database logic from business logic for maintainability.

### UserMetrics Module
- **Track metrics:** Allows users to record weight, BMI, body fat %, and personal bests (flexible keys).
- **History:** Supports historical tracking and analytics for user metrics.
- **Partial updates:** Endpoints accept partial objects for easy metric updates.
- **Repository/service pattern:** Clean separation of DB and business logic.


## Middlewares

### authMiddleware
- Verifies JWT tokens in Authorization header.
- Attaches user info (id, email, etc.) to req.user for downstream access.
- Used to protect routes that require authentication.

### errorHandler
- Catches errors thrown in controllers/routes.
- Logs error details for debugging.
- Sends standardized JSON error responses to the client.
- Optionally includes stack trace in development mode.

---
