// Repository
const competitionsRepository = require('../repository/competitions');

// Model
const Competition = require('../models/Competition');

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
            const newCompetition = new Competition({
                name: body.name
            });
        
            response = await competitionsRepository.addCompetition(newCompetition);
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get current competition
    async getSelectedCompetition(_id: string) {

        return competitionsRepository.getSelectedCompetition(_id);

    }

    // Delete competition
    async deleteCompetition(_id: string) { 

        return competitionsRepository.deleteCompetition(_id);

    }
}

module.exports = new CompetitionsClass();