/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 23:13:46
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 23:16:32
 * @ Description: Controller for all faulty requests that are handeled
 *                nowhere else
 */
import { Response,Request } from "express";

class ErrorController {

    static notFound = async(req: Request, res: Response) => {
        res.status(404).send("<h1>404 Not Found</h1><hr/>");
        return;
    }

}

export default ErrorController;
