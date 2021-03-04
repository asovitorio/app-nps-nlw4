import { Response,Request} from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepositories } from "../database/repositories/SurveyUserRepositories";
import { AppError } from "../errors/AppErrors";

class AnswerController {
 
    async execute(req:Request,res:Response){
        const {value} = req.params;
        const {u} = req.query;
        const surveyUserRepository =getCustomRepository(SurveyUserRepositories);

        const surveyUser = await surveyUserRepository.findOne({id:String(u)})
        if(!surveyUser) throw new AppError("Survey User does not exists")
       
        
        surveyUser.value = Number(value);
        await surveyUserRepository.save(surveyUser);

        return res.status(201).json(surveyUser)
       
    }

}

export {AnswerController}