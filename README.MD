# Error Handler Package

A robust error-handling package for Node.js applications using Express. This package provides custom error classes and middleware to handle various types of errors, such as validation errors, JWT errors, and more.

## Installation

To install this package, use npm:

```bash
npm install error-handler-package
```

## Usage

### Import the Package

In your Express application, import the necessary components from the package:

```typescript
import express from "express";
import { AppError, globalErrorHandler } from "error-handler-package";
```

### Setup Middleware

Use the error-handling middleware in your Express app:

```typescript
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Global error handling middleware
app.use(globalErrorHandler);
```

### Using in Controllers

You can use the `AppError` class in your controllers to throw errors:

```typescript
// userController.js
export const getUser = (req, res, next) => {
  const user = findUserById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
};

export const updateUser = (req, res, next) => {
  try {
    const updatedUser = updateUserById(req.params.id, req.body);
    if (!updatedUser) {
      return next(new AppError("Failed to update user", 400));
    }
    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    next(new AppError("An error occurred while updating user", 500));
  }
};
```

### Handle Undefined Routes

You can handle undefined routes by using the `AppError` class:

```typescript
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
```

### Run the Server

Start your server as usual:

```typescript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Features

- **Custom Error Class:** `AppError` allows you to create operational errors with a status code and message.
- **Error Handling Middleware:** Centralized error handling for different environments (development and production).
- **Predefined Error Handlers:** Includes handlers for common errors like `CastError`, `ValidationError`, and JWT errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
