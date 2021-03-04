import "reflect-metadata";
import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors" 
import createConnection from  "./database"
import {routes} from './routes'
import { AppError } from "./errors/AppErrors";
createConnection()
const app = express()
var bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())

app.use('/',routes)

app.use((err:Error,req:Request, res:Response,_next:NextFunction)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message:err.message
        })
    }
    return res.status(500).json({
        status:"Error",
        message:'Internal server error ' + err.message
    })
})

export{app}
