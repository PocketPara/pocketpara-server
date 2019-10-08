/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:06:32
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-08 23:44:53
 * @ Description: Main route handler, combines all other route handlers
 */

import { Router } from 'express';
import auth from "./auth";
import user from "./user";
import status from "./status";
import keyword from "./keyword";

const routes = Router();

routes.use("/status", status);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/keyword", keyword);

export default routes;