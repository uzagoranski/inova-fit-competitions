"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Sinon mock middleware
const sinon_1 = __importDefault(require("sinon"));
// Round service & repository
const roundService = require("../service/rounds");
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
];
describe('Rounds service tests', () => {
    test("Test getRounds", () => __awaiter(this, void 0, void 0, function* () {
        sinon_1.default.stub(roundRepository, 'getRounds')
            .returns(Promise.resolve(roundsList));
        expect(yield roundService.getRounds()).toEqual([
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
    }));
    test("Test addRound", () => __awaiter(this, void 0, void 0, function* () {
        yield roundsList.push({
            _id: "fssa5fc221c9961376g837b3",
            date: "2019-08-19T11:52:24.212Z",
            competitionId: "5d5a8d78019db504f493407d",
            stravaSegmentId: '4534242',
            __v: 0
        });
        sinon_1.default.stub(roundRepository, 'addRound')
            .returns(Promise.resolve(roundsList));
        expect(yield roundService.addRound({ date: "2019-08-19T11:52:24.212Z", competitionId: "5d5a8d78019db504f493407d", stravaSegmentId: '4534242' })).toEqual([
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
    }));
    test("Test deleteRound", () => __awaiter(this, void 0, void 0, function* () {
        let mark = 0;
        let response = { success: false };
        for (let i in roundsList) {
            if (roundsList[i]._id == "22418d78aerwb504f49340fs") {
                roundsList.splice(mark, 1);
                response = { success: true };
                break;
            }
            else {
                continue;
            }
            mark++;
        }
        sinon_1.default.stub(roundRepository, 'deleteRound')
            .returns(Promise.resolve(response));
        expect(yield roundService.deleteRound({ _id: "22418d78aerwb504f49340fs" })).toEqual({ success: true });
    }));
    test("Test getRoundBySegmentId", () => __awaiter(this, void 0, void 0, function* () {
        let selectedRound;
        for (let i in roundsList) {
            if (roundsList[i].stravaSegmentId.match('1111111')) {
                selectedRound = roundsList[i];
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(roundRepository, 'getRoundBySegmentId')
            .returns(Promise.resolve(selectedRound));
        expect(yield roundService.getRoundBySegmentId('1111111')).toEqual({
            _id: "c4ef6b9d1333f8537d510bc1",
            date: "2019-08-19T11:52:24.212Z",
            competitionId: "5d5a8d78019db504f493407d",
            stravaSegmentId: '1111111',
            __v: "0"
        });
    }));
});
//# sourceMappingURL=service.rounds.test copy.js.map