import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import resourceRoutes from "./routes/resourceRoutes";
import * as database from "./cores/database";
import configs from "./configs";

async function boot() {
  try {
    await database.start();

    const app: Application = express();
    app.use(bodyParser.json());
    app.use("/api/resources", resourceRoutes);
    app.get("/", (req: Request, res: Response) => {
      return res.send("Running Express Server");
    });

    app.listen(configs.port, () => {
      console.log(`Server is running at port ${configs.port}`);
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export { boot };
