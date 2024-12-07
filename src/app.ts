import express, { Request, Response, NextFunction } from "express";
import AppError from "./errors/appError";
import globalErrorHandler from "./errors/errorController";
import rateLimit from "express-rate-limit";
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Example route
app.get("/", (req: Request, res: Response) => {
  console.log("GET / - Hello World route hit");
  res.send("Hello World!");
});

// Example route that throws an error
app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  console.log("GET /error - Error route hit");
  next(new AppError("This is a test error!", 400));
});

// Handle undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Undefined route hit: ${req.originalUrl}`);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("Global error handler hit");
  globalErrorHandler(err, req, res, next);
});

export default app;
