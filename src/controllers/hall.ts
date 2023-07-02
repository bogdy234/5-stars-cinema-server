import { Router } from "express";

import hallService from "../services/hall";
import { type IHall } from "../models/hall";
import { onlyAdminsRoute } from "../middleware/user";

import type { Request, Response } from "express";

const hallRouter = Router();

function createHall(req: Request, res: Response): void {
  const value = req.body;
  hallService.create(
    value,
    (data: IHall) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
}

const readHall = (req: Request, res: Response): void => {
  const value = req.query;

  hallService.read(
    value,
    (data: IHall) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const updateHall = (req: Request, res: Response): void => {
  const value = req.body;

  hallService.update(
    value,
    (data: IHall) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const deleteHall = (req: Request, res: Response): void => {
  const value = req.query;

  hallService.deleteOne(
    value,
    () =>
      res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
    (err) => res.status(400).json({ message: err, deleted: false })
  );
};

const getAllHalls = (req: Request, res: Response): void => {
  hallService.getAllHalls(
    (data: IHall[]) => {
      res.status(200).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

const readByNumber = (req: Request, res: Response): void => {
  const value = req.query;

  hallService.readByNumber(
    value,
    (data: IHall) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

hallRouter.route("").post(onlyAdminsRoute, createHall);
hallRouter.route("").get(readHall);
hallRouter.route("").put(onlyAdminsRoute, updateHall);
hallRouter.route("").delete(onlyAdminsRoute, deleteHall);
hallRouter.route("/getAllHalls").get(getAllHalls);
hallRouter.route("/readByNumber").get(readByNumber);

export default hallRouter;
