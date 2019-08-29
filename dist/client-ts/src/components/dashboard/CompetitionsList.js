"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const reactstrap_1 = require("reactstrap");
const competitionActions_1 = require("../../actions/competitionActions");
const trophy = require("../../static/img/trophy.jpg");
class CompetitionsList extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onDeleteClick = (_id) => {
            this.props.deleteCompetition(_id);
        };
    }
    componentDidMount() {
        this.props.getCompetitions();
    }
    render() {
        const { competitions } = this.props.competition;
        return (<div style={{ minHeight: "70vh", marginTop: "130px" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s8">
                        <react_router_dom_1.Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                        </react_router_dom_1.Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Competitions</b> list
                            </h4>
                        </div>
                    </div>
                    <div className="col s12 center-align" style={{ marginTop: "20px" }}>
                        <div className="col s12">
                            <img style={{
            marginBottom: "2rem",
            minWidth: "250px",
            maxWidth: "100%"
        }} src={trophy} alt="Trophy"/>  <br />
                            <react_router_dom_1.Link to="/addCompetition" style={{
            width: "auto",
            minWidth: "250px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginBottom: "40px",
            alignContent: "center"
        }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                New competition
                            </react_router_dom_1.Link><br />
                                                        
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Competition name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {competitions.map(({ _id, name }) => (<tr key={_id}>
                                        <th scope="row"><reactstrap_1.Button className="btn btn-small waves-effect waves-light hoverable red accent-3" color="danger" size="sm" style={{ marginLeft: "10px" }} onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                            </reactstrap_1.Button></th>
                                        <td>
                                            <react_router_dom_1.Link to={"/competition/" + _id} className="competitionStats">{name}</react_router_dom_1.Link>
                                        </td>
                                    </tr>))}                 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
const mapStateToProps = (state) => ({
    competition: state.competition
});
exports.default = react_redux_1.connect(mapStateToProps, { getCompetitions: competitionActions_1.getCompetitions, deleteCompetition: competitionActions_1.deleteCompetition })(CompetitionsList);
//# sourceMappingURL=CompetitionsList.js.map