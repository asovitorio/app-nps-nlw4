import {Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepositories } from "../database/repositories/SurveyUserRepositories";
import { UserRepository } from "../database/repositories/UserRepositories";
import { SurveyRepository } from "../database/repositories/SurveyRepositories";
import SendMailService from '../services/sendMailService'
import { resolve } from "path";
import { AppError } from "../errors/AppErrors";
 class SendMailController{
     
async create(req:Request,res:Response){
    const { email, survey_id} = req.body;
   
    try {
        const surveyUserRepository =getCustomRepository(SurveyUserRepositories);
        const userRepository =getCustomRepository(UserRepository);
        const surveyRepository =getCustomRepository(SurveyRepository);

        const user = await userRepository.findOne({email})
        const survey = await surveyRepository.findOne({id:survey_id})
       
        if(!user) throw new AppError("User does not exists")
        if(!survey) throw new AppError("Survey does not exists")
       
        const body = {
            user_id:user.id,
            survey_id:survey.id,
           
        }
        
        const [surveyUserAlreadyExist] = await surveyUserRepository.find({
            where:[{user_id:user.id,value:null}],
            relations:["user","survey"]
        })
        const variables = {
            name:user.name,
            title:survey.title,
            description:survey.description,
            id: "",
            link:process.env.URL_MAIL
            
        }
        const npsPath = resolve(__dirname,"..","views","emails","npsMail.hbs")
        if(surveyUserAlreadyExist){
            variables.id = surveyUserAlreadyExist.id
            await SendMailService.execute(email,survey.title,variables,npsPath)
          
            return res.json(surveyUserAlreadyExist);
        }
        const surveyUser = surveyUserRepository.create(body);
        const response = await surveyUserRepository.save(surveyUser);
        variables.id = response.id
        await SendMailService.execute(email,survey.title,variables,npsPath)
       
        return res.status(201).json(response);
    } catch (error) {
          return res.status(400).json(error);
    }

    }
}
export {SendMailController}

