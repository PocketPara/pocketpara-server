/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 15:12:20
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-08 15:17:56
 * @ Description: Status controller
 */
import { Request, Response } from 'express';

class StatusController {

    static currentStatus = async(req: Request, res: Response) => {
        res.status(200).json({
            status: 'SUCCESS',
            apiStatus: 'OK',
            reqtime: Date.now()
        });
    };

};

export default StatusController;