// Repository
const competitionsRepository = require('../repository/competitions');

// Interfaces
import  { IAddCompetitionForm } from '../common/interfaces';

class CompetitionsClass {

    // Full list of all competitions
    async getAllCompetitions() {

        return await competitionsRepository.getAllCompetitions();

    }

    // Add competition
    async addCompetition(body: IAddCompetitionForm) {

        let response;

        try {        
            response = await competitionsRepository.addCompetition(body.name);
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get current competition
    async getSelectedCompetition(_id: string) {

        return await competitionsRepository.getSelectedCompetition(_id);

    }

    // Delete competition
    async deleteCompetition(_id: string) { 

        return await competitionsRepository.deleteCompetition(_id);

    }

    // Get competition by name
    async getCompetitionByName(name: string) {

        return await competitionsRepository.getCompetitionByName(name);

    }
}

module.exports = new CompetitionsClass();