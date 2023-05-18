import { Response } from "express";

export function handleResponseError(res: Response, error: any) {
  console.error(error);
  return res.status(500).send("Internal Server Error");
}
