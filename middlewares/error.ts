import { error } from "../utils/response.js";


const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(req.url + " : " + (err.stack || err));
  error(res, "Internal Server Error");
  next();
};

export default errorHandler;