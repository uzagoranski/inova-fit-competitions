"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Sinon mock middleware
const sinon_1 = __importDefault(require("sinon"));
// Competition service & repository
const competitionsService = require("../service/competitions");
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
];
describe('Competition service tests', () => {
    test("Test getAllCompetitions", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(competitionsRepository, 'getAllCompetitions')
            .returns(Promise.resolve(competitionsList));
        expect(yield competitionsService.getAllCompetitions()).toEqual([
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
    }));
    test("Test addCompetition", () => __awaiter(void 0, void 0, void 0, function* () {
        yield competitionsList.push({
            _id: "5d5fc24b21c99613763837b2",
            name: 'Test 234',
            date: "2019-08-23T10:39:07.534Z",
            __v: 0
        });
        sinon_1.default.stub(competitionsRepository, 'addCompetition')
            .returns(Promise.resolve(competitionsList));
        expect(yield competitionsService.addCompetition({ name: "Test 234" })).toEqual([
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
    }));
    test("Test getSelectedCompetition", () => __awaiter(void 0, void 0, void 0, function* () {
        let competition;
        for (let i in competitionsList) {
            if (competitionsList[i]._id == "5d5fc24b21c99613763837b6") {
                competition = competitionsList[i];
                break;
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(competitionsRepository, 'getSelectedCompetition')
            .returns(Promise.resolve(competition));
        expect(yield competitionsService.getSelectedCompetition({ _id: "5d5fc24b21c99613763837b6" })).toEqual({
            _id: "5d5fc24b21c99613763837b6",
            name: 'Test',
            date: "2019-08-23T10:39:07.534Z",
            __v: 0
        });
    }));
    test("Test deleteCompetition", () => __awaiter(void 0, void 0, void 0, function* () {
        let mark = 0;
        let response = { success: false };
        for (let i in competitionsList) {
            if (competitionsList[i]._id == "5d5cfef13338410bc16b9d37") {
                competitionsList.splice(mark, 1);
                response = { success: true };
                break;
            }
            else {
                continue;
            }
            mark++;
        }
        sinon_1.default.stub(competitionsRepository, 'deleteCompetition')
            .returns(Promise.resolve(response));
        expect(yield competitionsService.deleteCompetition({ _id: "5d5cfef13338410bc16b9d37" })).toEqual({ success: true });
    }));
    test("Test getCompetitionByName", () => __awaiter(void 0, void 0, void 0, function* () {
        let selectedCompetition;
        for (let i in competitionsList) {
            if (competitionsList[i].name.match('Test 234')) {
                selectedCompetition = competitionsList[i];
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(competitionsRepository, 'getCompetitionByName')
            .returns(Promise.resolve(selectedCompetition));
        expect(yield competitionsService.getCompetitionByName("Test")).toEqual({
            _id: "5d5fc24b21c99613763837b2",
            name: 'Test 234',
            date: "2019-08-23T10:39:07.534Z",
            __v: 0
        });
    }));
});
//# sourceMappingURL=service.competitions.test.js.map