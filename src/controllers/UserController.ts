import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../database/repositories/UserRepositories";
import * as yup from 'yup';
import { AppError } from "../errors/AppErrors";
class UserController {
    async index(req: Request, res: Response){
        const userRepository = getCustomRepository(UserRepository);
        try {
            const response = await userRepository.find()
            return res.status(200).json(response)
            
          } catch (error) {
          return res.status(400).json(error)
            
        }

    }
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const schema = yup.object().shape({
      name: yup.string().required(),
      email:yup.string().email().required(),
    }) 
    // if(!await schema.isValid(req.body)){
    //   return  res.status(400).json({erro:"Validation Failed!"})
    // }
    try {
      await schema.validate(req.body,{abortEarly:false})
      
    } catch (error) {
      return res.status(400).json(error)      
    }
    try {
      const userRepository =getCustomRepository(UserRepository);
  
      const userAlreadyExists = await userRepository.findOne({ email });
  
      if (userAlreadyExists) throw new AppError("Email já existe na base de dados!") 
  
      const user = userRepository.create({ name, email });
      const response = await userRepository.save(user);
      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(400).json(error);
    }

  }
}
//#jornada infinita

export { UserController };

