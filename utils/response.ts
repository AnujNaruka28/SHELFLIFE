import type { Response } from "express";
import { StatusCode } from "../types/StatusCode.js";

const success = <T>(
  res: Response,
  message: string,
  data?: T
): Response => {
  return res.status(StatusCode.success).json({
    status: "success",
    message,
    data : data
  });
};

const noContent = (
    res: Response,
    message: string
) : Response => {
    return res.status(StatusCode.noContent).json({
        status: "success",
        message
    })
}

const error = <T>(
  res: Response,
  message: string,
  data?: T
): Response => {
  return res.status(StatusCode.internalServerError).json({
    status: "error",
    message,
    data
  });
};

const notFound = (
  res: Response,
  message: string
): Response => {
  return res.status(StatusCode.notFound).json({
    status: "error",
    message
  });
};

const unauthorized = (
  res: Response,
  message: string
): Response => {
  return res.status(StatusCode.unauthorized).json({
    status: "error",
    message
  });
};

const forbidden = (
  res: Response,
  message: string
): Response => {
  return res.status(StatusCode.forbidden).json({
    status: "error",
    message
  });
};

const badRequest = (
  res: Response,
  message: string
): Response => {
  return res.status(StatusCode.badRequest).json({
    status: "error",
    message
  });
};

export {
    success,
    noContent,
    error,
    notFound,
    unauthorized,
    forbidden,
    badRequest,
}