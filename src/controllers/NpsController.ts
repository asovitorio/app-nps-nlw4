import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepositories } from "../database/repositories/SurveyUserRepositories";
import * as yup from 'yup';
class NpsController{

    async execute(req:Request,res:Response){
        const {survey_id} = req.params;

        const surveyUserRepository = await getCustomRepository(SurveyUserRepositories);

        const surveyUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = surveyUsers.filter(survey =>(survey.value >= 0 && survey.value<=6)).length;

        const passive = surveyUsers.filter(survey =>(survey.value >= 7 && survey.value<=8)).length;

        const promoter = surveyUsers.filter(survey =>(survey.value >= 9 && survey.value<=10)).length
        
        const total = surveyUsers.length;

        const calculate = ((promoter - detractor)/total)*100
       
        return res.status(200).json({detractor,passive,promoter,total,calculate})
    }

}
export {NpsController}