import {Router} from 'express'
import {UserController} from './controllers/UserController'
import {SurveyController} from './controllers/SurveyController'
import {SendMailController} from './controllers/sendMailController'
import {AnswerController} from './controllers/AnswerController'
import {NpsController} from './controllers/NpsController'
const routes =  Router()
const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

routes.get('/users',userController.index)
routes.post('/users',userController.create)

routes.get('/surveys',surveyController.index)
routes.post('/surveys',surveyController.create)

routes.post('/send-mail',sendMailController.create)

routes.get('/ansewer/:value',answerController.execute)

routes.get('/nps/:survey_id',npsController.execute)




export {routes}