// Sinon mock middleware
import sinon from "sinon";

// Competition service & repository
const competitionsService = require( "../service/competitions");
const competitionsRepository = require('../repository/competitions');

// CompetitionsList test object
const competitionsList = [
    { 
       _id: "5d5fc24b21c99613763837b6",
        name: 'Test',
        date: "2019-08-23T10:39:07.534Z",
        __v: 0 
    },
    { 
       _id: "5d5cfef13338410bc16b9d37",
        name: 'Maribor Open',
        date: "2019-08-21T08:21:05.411Z",
        __v: "0" 
    },
    { 
       _id: "5d5a8d78019db504f493407d",
        name: 'Inova FIT Pohorje',
        date: "2019-08-19T11:52:24.212Z",
        __v: 0 
    }
]

describe('Competition service tests', () => {
    
    test("Test getAllCompetitions", async () => {

        sinon.stub(competitionsRepository, 'getAllCompetitions')
            .returns(Promise.resolve(competitionsList));

        expect(await competitionsService.getAllCompetitions()).toEqual([
            { 
                _id: "5d5fc24b21c99613763837b6",
                name: 'Test',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            },
            { 
                _id: "5d5cfef13338410bc16b9d37",
                name: 'Maribor Open',
                date: "2019-08-21T08:21:05.411Z",
                __v: "0" 
            },
            { 
                _id: "5d5a8d78019db504f493407d",
                name: 'Inova FIT Pohorje',
                date: "2019-08-19T11:52:24.212Z",
                __v: 0 
            }
         ]);

    });

    test("Test addCompetition", async () => {

        await competitionsList.push(
            { 
                _id: "5d5fc24b21c99613763837b2",
                name: 'Test 234',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            }
        );

        sinon.stub(competitionsRepository, 'addCompetition')
            .returns(Promise.resolve(competitionsList));

        expect(await competitionsService.addCompetition({name: "Test 234"})).toEqual([
            { 
                _id: "5d5fc24b21c99613763837b6",
                name: 'Test',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            },
            { 
                _id: "5d5cfef13338410bc16b9d37",
                name: 'Maribor Open',
                date: "2019-08-21T08:21:05.411Z",
                __v: "0" 
            },
            { 
                _id: "5d5a8d78019db504f493407d",
                name: 'Inova FIT Pohorje',
                date: "2019-08-19T11:52:24.212Z",
                __v: 0 
            },
            { 
                _id: "5d5fc24b21c99613763837b2",
                name: 'Test 234',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            }
         ]);
                 
    });

    test("Test getSelectedCompetition", async () => {

        let competition;

        for (let i in competitionsList) {
            if (competitionsList[i]._id == "5d5fc24b21c99613763837b6") {
                competition = competitionsList[i];
                break;
            } else {
                continue;
            }
        }

        sinon.stub(competitionsRepository, 'getSelectedCompetition')
            .returns(Promise.resolve(competition));
            
        expect(await competitionsService.getSelectedCompetition({_id: "5d5fc24b21c99613763837b6"})).toEqual(
            { 
                _id: "5d5fc24b21c99613763837b6",
                name: 'Test',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            }
        );
                 
    });

    test("Test deleteCompetition", async () => {

        let mark = 0;
        let response = { success: false };

        for (let i in competitionsList) {
            if (competitionsList[i]._id == "5d5cfef13338410bc16b9d37") {
                competitionsList.splice(mark, 1);
                response = { success: true };
                break;
            } else {
                continue;
            }
            mark++;
        }

        sinon.stub(competitionsRepository, 'deleteCompetition')
            .returns(Promise.resolve(response));
            
        expect(await competitionsService.deleteCompetition({_id: "5d5cfef13338410bc16b9d37"})).toEqual({ success: true });
                 
    });

    test("Test getCompetitionByName", async () => {

        let selectedCompetition;

        for (let i in competitionsList) {
            if (competitionsList[i].name.match('Test 234')) {
                selectedCompetition = competitionsList[i];
            } else {
                continue;
            }
        }

        sinon.stub(competitionsRepository, 'getCompetitionByName')
            .returns(Promise.resolve(selectedCompetition));
            
        expect(await competitionsService.getCompetitionByName("Test")).toEqual(
            { 
                _id: "5d5fc24b21c99613763837b2",
                name: 'Test 234',
                date: "2019-08-23T10:39:07.534Z",
                __v: 0 
            }
        );
                 
    });

});