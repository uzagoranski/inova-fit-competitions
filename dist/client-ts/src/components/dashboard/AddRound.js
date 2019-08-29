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
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const classnames_1 = __importDefault(require("classnames"));
const roundActions_1 = require("../../actions/roundActions");
class AddRound extends react_1.Component {
    constructor() {
        super();
        this.onChange = (e) => {
            this.setState({ [e.target.id]: e.target.value });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const newRound = {
                date: this.state.date,
                competitionId: this.props.match.params._id,
                stravaSegmentId: this.state.stravaSegmentId
            };
            //Add date via addRound action
            this.props.addRound(newRound, this.props.history, this.props.match.params._id);
            //this.props.history.push(`/competition/${this.props.match.params._id}`);
        };
        this.state = {
            date: "",
            competitionId: "",
            stravaSegmentId: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { errors } = this.state;
        return (<div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <react_router_dom_1.Link to={`/competition/${this.props.match.params._id}`} className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to details
                    </react_router_dom_1.Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        New <b>round</b>
                    </h4>
                    <p className="grey-text text-darken-1">
                        Add a new round below
                    </p><br />
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                    <label style={{ marginLeft: "10px" }} htmlFor="date">Date and time</label>
                    <div className="input-field col s12">               
                        <input onChange={this.onChange} value={this.state.date} error={errors.date} id="date" type="datetime-local" placeholder="Date" className={classnames_1.default("", {
            invalid: errors.date
        })}/>
                        <span className="red-text">
                        {errors.date}
                        </span>
                    </div>               
                    <div className="input-field col s12">
                        <input onChange={this.onChange} value={this.state.stravaSegmentId} error={errors.stravaSegmentId} id="stravaSegmentId" type="text" className={classnames_1.default("", {
            invalid: errors.stravaSegmentId
        })}/>
                        <label htmlFor="email">Strava segment ID</label>
                        <span className="red-text">
                        {errors.stravaSegmentId}
                        </span>
                    </div>                 
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
        }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                        Add new
                        </button>                
                    </div>
                    </form>
                </div>
            </div>
        </div>);
    }
}
const mapStateToProps = (state) => ({
    competition: state.competition,
    auth: state.auth,
    errors: state.errors
});
exports.default = react_redux_1.connect(mapStateToProps, { addRound: roundActions_1.addRound })(AddRound);
//# sourceMappingURL=AddRound.js.map