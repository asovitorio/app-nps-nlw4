import { error } from "console";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../database/repositories/SurveyRepositories";

class SurveyController {
    async index(req: Request, res: Response){
        const surveyRepository = getCustomRepository(SurveyRepository);
        try {
            const response = await surveyRepository.find()
            return res.status(200).json(response)
            
          } catch (error) {
            
            return res.status(400).json(error)
        }

    }
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
  
      const surveyRepository = getCustomRepository(SurveyRepository);
  
      const surveyAlreadyExists = await surveyRepository.findOne({ title });
  
      if (surveyAlreadyExists) {
        return res.status(400).json({
          err: "Titulo já existe na base de dados!",
        });
      }
  
      const user = surveyRepository.create({ title, description });
      const response = await surveyRepository.save(user);
      return res.status(201).json(response);
      
    } catch (error) {
    }
    return res.status(400).json(error);
      
    }
}
//#jornada infinita

export { SurveyController };

