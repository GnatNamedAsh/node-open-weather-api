import type { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
 res
  .header({
    'Content-Type': 'application/json'
  })
  .status(200)
  .send({ data: 'lots of cool stuff here' })
}
