"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const reactstrap_1 = require("reactstrap");
const react_media_1 = __importDefault(require("react-media"));
const competitionActions_1 = require("../../actions/competitionActions");
const roundActions_1 = require("../../actions/roundActions");
const leaderboardActions_1 = require("../../actions/leaderboardActions");
class Competition extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onDeleteClick = (_id) => {
            this.props.deleteRound(_id);
            setTimeout(this.props.getLeaderboard(this.props.match.params._id), 10000);
        };
    }
    componentDidMount() {
        this.props.getCompetition(this.props.match.params._id);
        this.props.getRounds(this.props.match.params._id);
        this.props.getLeaderboard(this.props.match.params._id);
    }
    render() {
        const { competitions } = this.props.competition;
        const { rounds } = this.props.round;
        const { leaderboards } = this.props.leaderboard;
        let position = 0;
        return (<react_media_1.default query="(min-width: 700px)">
                {matches => matches ?
            (<div className="container" style={{ minHeight: "70vh", marginTop: "100px" }}>
                            <div className="row">
                                <div className="col s8">
                                    <a href="/competitions" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i> Back to
                                    list
                                    </a>
                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <h4>
                                            Competition: <b>{competitions.name}</b>
                                        </h4>
                                    </div>
                                </div>
                                <div className="col s12 center-align" style={{ marginTop: "20px" }}>
                                    <div className="col s12">
                                    <react_router_dom_1.Link to={`/addRound/${competitions._id}`} style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginBottom: "40px",
                marginTop: "20px"
            }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                        New round
                                    </react_router_dom_1.Link><br />

                                    <table className="leaderboard">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Strava segment ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {rounds.map(({ _id, date, stravaSegmentID }) => (<tr key={_id}>
                                                <th scope="row"><reactstrap_1.Button className="btn btn-small waves-effect waves-light hoverable red accent-3" color="danger" size="sm" style={{ marginLeft: "10px" }} onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                                    </reactstrap_1.Button></th>
                                                <td>
                                                    {date.substr(0, 10)}
                                                </td>
                                                <td>
                                                    {date.substr(11, 5)}
                                                </td>
                                                <td>
                                                    {stravaSegmentID}
                                                </td>
                                            </tr>))}                 
                                        </tbody>
                                    </table>
                                
                                    <table className="tableRounds">
                                        <thead>
                                            <tr>
                                                <th style={{ fontWeight: "bold", paddingRight: "10px", paddingLeft: "10px" }} scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Average time</th>
                                                <th scope="col">Total distance</th>
                                                <th scope="col">Number of segments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {!(leaderboards === null) ?
                leaderboards.map(({ _id, name, averageTime, totalDistance, numberOfRounds }) => (<tr key={_id}>   
                                                <td style={{ color: "red", fontWeight: "bold", paddingRight: "10px", paddingLeft: "10px" }}>
                                                    {++position}
                                                </td>                                 
                                                <td>
                                                    {name}
                                                </td>
                                                <td>
                                                    {averageTime}
                                                </td>
                                                <td>
                                                    {totalDistance}
                                                </td>
                                                <td>
                                                    {numberOfRounds}
                                                </td>
                                            </tr>))
                :
                    <td></td>}                 
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>                
                        </div>)
            :
                (<div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
                            <div className="row">
                                <div className="col s8">
                                    <a href="/competitions" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i> Back to
                                    list
                                    </a>
                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <h4>
                                            Competition: <b>{competitions.name}</b>
                                        </h4>
                                    </div>
                                </div>
                                <div className="col s12 center-align" style={{ marginTop: "20px" }}>
                                    <div className="col s12">
                                        <react_router_dom_1.Link to={`/addRound/${competitions._id}`} style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginBottom: "40px",
                    marginTop: "20px"
                }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                            New round
                                        </react_router_dom_1.Link><br />

                                        <div className="col s12">
                                            <table className="leaderboardMobile">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col">Strava segment ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {rounds.map(({ _id, date, stravaSegmentID }) => (<tr key={_id}>
                                                        <th scope="row"><reactstrap_1.Button className="btn btn-small waves-effect waves-light hoverable red accent-3" color="danger" size="sm" style={{ marginLeft: "10px" }} onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                                            </reactstrap_1.Button></th>
                                                        <td>
                                                            {date.substr(0, 10)}
                                                        </td>
                                                        <td>
                                                            {date.substr(11, 5)}
                                                        </td>
                                                        <td>
                                                            {stravaSegmentID}
                                                        </td>
                                                    </tr>))}                 
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col s12">
                                            <table className="tableRoundsMobile">
                                                <thead>
                                                    <tr>
                                                        <th style={{ fontWeight: "bold", paddingRight: "10px", paddingLeft: "10px" }} scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Avg. time</th>
                                                        <th scope="col">Ttl. dist.</th>
                                                        <th scope="col">Num. of seg.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                            {!(leaderboards === null && leaderboards === "") ?
                    leaderboards.map(({ _id, name, averageTime, totalDistance, numberOfRounds }) => (<tr key={_id}>   
                                                        <td style={{ color: "red", fontWeight: "bold", paddingRight: "10px", paddingLeft: "10px" }}>
                                                            {++position}
                                                        </td>                                 
                                                        <td>
                                                            {name}
                                                        </td>
                                                        <td>
                                                            {averageTime}
                                                        </td>
                                                        <td>
                                                            {totalDistance}
                                                        </td>
                                                        <td>
                                                            {numberOfRounds}
                                                        </td>
                                                    </tr>))
                    :
                        <td></td>}                 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>)}
            </react_media_1.default>);
    }
}
const mapStateToProps = (state) => ({
    competition: state.competition,
    round: state.round,
    leaderboard: state.leaderboard,
});
exports.default = react_redux_1.connect(mapStateToProps, { getCompetition: competitionActions_1.getCompetition, getRounds: roundActions_1.getRounds, deleteRound: roundActions_1.deleteRound, getLeaderboard: leaderboardActions_1.getLeaderboard })(Competition);
//# sourceMappingURL=Competition.js.map