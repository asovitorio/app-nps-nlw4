import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../entity/SurveyUser";

@EntityRepository(SurveyUser)
class SurveyUserRepositories extends Repository<SurveyUser> {}

export { SurveyUserRepositories };
