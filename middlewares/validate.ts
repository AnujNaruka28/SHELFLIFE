import type { NextFunction, Request, Response } from "express";
import { treeifyError, ZodType } from "zod";
import { badRequest } from "../utils/response.js";

type ValidationSource = "body" | "query" | "params" | "all";

const validate = (schema: ZodType, source: ValidationSource = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data =
      source === "body"
        ? req.body
        : source === "query"
          ? req.query
          : source === "params"
            ? req.params
            : { ...req.body, ...req.query, ...req.params };

    const result = schema.safeParse(data);

    if (!result.success) {
      return badRequest(res, treeifyError(result.error).toString());
    }

    next();
  };
};

export default validate;
