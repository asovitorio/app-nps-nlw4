import { join } from "path";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {v4 as uuid} from 'uuid'
import { Survey } from "./Survey";
import { User } from "./User";
@Entity("surveys_users")
export class SurveyUser {
    @PrimaryColumn()
readonly id:string;

 @Column()
 value:number;

 
 @Column()
 user_id:string;
 
 @ManyToOne(() => User)
 @JoinColumn({name:"user_id"})
  user:User

 @Column()
 survey_id:string;

 @ManyToOne(() => Survey)
@JoinColumn({name:"survey_id"})
survey:Survey

 @CreateDateColumn()
 created_at: Date;
 
 constructor(){
     if(!this.id){
         this.id = uuid()
     }
 }

}
