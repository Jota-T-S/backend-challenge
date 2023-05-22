import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";

import userRouter from "./routes/user.routes";
import rolRouter from "./routes/rol.routes";
import memeRouter from "./routes/meme.routes";
import categoryRouter from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/",
    limits: { fileSize: 10000000 },
    abortOnLimit: true,
  })
);
app.use("/user", userRouter);
app.use("/rol", rolRouter);
app.use("/meme", memeRouter);
app.use("/category", categoryRouter);

export default app;
