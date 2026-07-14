import { error } from "../utils/response.js";


const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Checks for stack, then message, then falls back to JSON text
  const errorMessage = err.stack || err.message || JSON.stringify(err);
  console.error(`${req.url} : ${errorMessage}`);
  error(res, "Internal Server Error");
  next();
};


export default errorHandler;