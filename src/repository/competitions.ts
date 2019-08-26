// Models
import Competition from '../models/Competition';
import Round from '../models/Round';
import Stats from '../models/Stats';

class CompetitionsClass {
    
    // Competitions list
    async getAllCompetitions() {

        let response;

        try {
            response = await Competition.find().sort({ date: -1 });
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Add competition
    async addCompetition(name: String) {
        
        let response;

        try {    
            response = await Competition.create({ name: name });
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get selected competition
    async getSelectedCompetition(_id: string) {
        
        let response;

        try {    
            response = await Competition.findById(_id);
        }
        catch(err) {
            response = err;
        }
        
        return response;

    }

    // Delete competition
    async deleteCompetition(_id: string) { 

        try {
            await Promise.all([Competition.findByIdAndDelete(_id), Round.deleteMany({ "competitionID": _id }), Stats.deleteMany({ "competitionID": _id })])
        }
        catch(err) {
            return err;
        }

        return { success: true };
        
    }

      // Get competition by name
      async getCompetitionByName(name: string) {
        
        let response;

        try {    
            response = await Competition.find({ "name": name });
        }
        catch(err) {
            response = err;
        }
        
        return response;

    }
}

module.exports = new CompetitionsClass();