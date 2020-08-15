import { Request, Response } from "express";

const AnnotationsController = {

    create: async (request:Request, response:Response) => {
        return response.send();
    }
}

export default AnnotationsController;