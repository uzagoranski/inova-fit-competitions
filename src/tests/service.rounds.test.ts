// Sinon mock middleware
import sinon from "sinon";

// Round service & repository
const roundService = require( "../service/rounds");
const roundRepository = require('../repository/rounds');

// RoundsList test object
const roundsList = [
   { 
        _id: "5d5fc24b21c99613763837b6",
        date: "2019-08-19T11:52:24.212Z",
        competitionId: "5d5a8d78019db504f493407d",
        stravaSegmentId: '1481291',
        __v: 0 
    },
    { 
        _id: "c4ef6b9d1333f8537d510bc1",
        date: "2019-08-19T11:52:24.212Z",
        competitionId: "5d5a8d78019db504f493407d",
        stravaSegmentId: '1111111',
        __v: "0" 
    },
    { 
        _id: "22418d78aerwb504f49340fs",
        date: "2019-08-19T11:52:24.212Z",
        competitionId: "5d5a8d78019db504f493407d",
        stravaSegmentId: '7102894',
        __v: 0 
    }
]

describe('Rounds service tests', () => {
    
    test("Test getRounds", async () => {

        sinon.stub(roundRepository, 'getRounds')
            .returns(Promise.resolve(roundsList));

        expect(await roundService.getRounds()).toEqual([
            { 
                _id: "5d5fc24b21c99613763837b6",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '1481291',
                __v: 0 
            },
            { 
                _id: "c4ef6b9d1333f8537d510bc1",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '1111111',
                __v: "0" 
            },
            { 
                _id: "22418d78aerwb504f49340fs",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '7102894',
                __v: 0 
            }
        ]);

    });

    test("Test addRound", async () => {

        await roundsList.push(
            { 
                _id: "fssa5fc221c9961376g837b3",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '4534242',
                __v: 0 
            }
        );

        sinon.stub(roundRepository, 'addRound')
            .returns(Promise.resolve(roundsList));

        expect(await roundService.addRound({ date: "2019-08-19T11:52:24.212Z", competitionId: "5d5a8d78019db504f493407d", stravaSegmentId: '4534242' })).toEqual([
            { 
                _id: "5d5fc24b21c99613763837b6",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '1481291',
                __v: 0 
            },
            { 
                _id: "c4ef6b9d1333f8537d510bc1",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '1111111',
                __v: "0" 
            },
            { 
                _id: "22418d78aerwb504f49340fs",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '7102894',
                __v: 0 
            },
            { 
                _id: "fssa5fc221c9961376g837b3",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '4534242',
                __v: 0 
            }
        ]);
                 
    });

    test("Test deleteRound", async () => {

        let mark = 0;
        let response = { success: false };

        for (let i in roundsList) {
            if (roundsList[i]._id == "22418d78aerwb504f49340fs") {
                roundsList.splice(mark, 1);
                response = { success: true };
                break;
            } else {
                continue;
            }
            mark++;
        }

        sinon.stub(roundRepository, 'deleteRound')
            .returns(Promise.resolve(response));
            
        expect(await roundService.deleteRound({_id: "22418d78aerwb504f49340fs"})).toEqual({ success: true });
                 
    });

    test("Test getRoundBySegmentId", async () => {

        let selectedRound;

        for (let i in roundsList) {
            if (roundsList[i].stravaSegmentId.match('1111111')) {
                selectedRound = roundsList[i];
            } else {
                continue;
            }
        }

        sinon.stub(roundRepository, 'getRoundBySegmentId')
            .returns(Promise.resolve(selectedRound));
            
        expect(await roundService.getRoundBySegmentId('1111111')).toEqual(
            { 
                _id: "c4ef6b9d1333f8537d510bc1",
                date: "2019-08-19T11:52:24.212Z",
                competitionId: "5d5a8d78019db504f493407d",
                stravaSegmentId: '1111111',
                __v: "0" 
            }
        );
                 
    });

});