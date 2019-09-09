// Dependencies
import competitionsRepository from '../repository/competitions';
import { IAddCompetitionForm } from '../common/interfaces';
import ValidationError from '../middleware/errors';

class CompetitionsClass {

    // Full list of all competitions
    async getAllCompetitions() {

        return competitionsRepository.getAllCompetitions();

    }

    // Add competition
    async addCompetition(body: IAddCompetitionForm) {
        
        // Find competition by name
        let competition = await competitionsRepository.getCompetitionByName(body.name);

        if(competition) {

            throw new ValidationError("NameAlreadyExists");

        }
      
        return competitionsRepository.addCompetition(body.name);
      
    }

    // Get current competition
    async getSelectedCompetition(_id: string) {

        return competitionsRepository.getSelectedCompetition(_id);

    }

    // Delete competition
    async deleteCompetition(_id: string) { 

        return competitionsRepository.deleteCompetition(_id);

    }

    // Get competition by name
    async getCompetitionByName(name: string) {

        return competitionsRepository.getCompetitionByName(name);

    }
}

export default new CompetitionsClass();