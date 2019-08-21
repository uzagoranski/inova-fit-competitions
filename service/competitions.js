// Repository
const competitionsRepository = require('../repository/competitions');

// Full list of all competitions
module.exports.getAllCompetitions = async function getAllCompetitions() {

    return await competitionsRepository.getAllCompetitions();

}

// Add competition
module.exports.addCompetition = async function addCompetition(body) {

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
module.exports.getSelectedCompetition = async function getSelectedCompetition(id) {

    return await competitionsRepository.getSelectedCompetition(id);

}

// Delete competition
module.exports.deleteCompetition = async function deleteCompetition(id) { 

    return await competitionsRepository.deleteCompetition(id);

}