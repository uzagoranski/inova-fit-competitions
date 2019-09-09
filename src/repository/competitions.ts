// Models
import Competition from '../models/Competition';
import Round from '../models/Round';
import Stats from '../models/Stats';

class CompetitionsClass {

    // Competitions list
    async getAllCompetitions() {

        return Competition.find().sort({ date: -1 });

    }

    // Add competition
    async addCompetition(name: String) {

        return Competition.create({ name });

    }

    // Get selected competition
    async getSelectedCompetition(_id: string) {

        return Competition.findById(_id);

    }

    // Delete competition
    async deleteCompetition(_id: string) {

        await Promise.all([Stats.deleteMany({ competitionID: _id }), Round.deleteMany({ competitionID: _id }), Competition.findByIdAndDelete(_id)]);

        return { success: true };

    }

    // Get competition by name
    async getCompetitionByName(name: string) {

        return Competition.findOne({ name });

    }
}

export default new CompetitionsClass();
