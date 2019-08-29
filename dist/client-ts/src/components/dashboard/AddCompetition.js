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
const competitionActions_1 = require("../../actions/competitionActions");
class AddCompetition extends react_1.Component {
    constructor() {
        super();
        this.onChange = (e) => {
            this.setState({ [e.target.id]: e.target.value });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const newCompetition = {
                name: this.state.name
            };
            //Add competition via addCompetition action
            this.props.addCompetition(newCompetition, this.props.history);
        };
        this.state = {
            name: "",
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
                <react_router_dom_1.Link to="/competitions" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to list
                </react_router_dom_1.Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    New <b>competition</b>
                </h4>
                <p className="grey-text text-darken-1">
                    Add new competition below
                </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" className={classnames_1.default("", {
            invalid: errors.name
        })}/>
                    <label htmlFor="name">Name</label>
                    <span className="red-text">
                    {errors.name}
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
exports.default = react_redux_1.connect(mapStateToProps, { addCompetition: competitionActions_1.addCompetition })(AddCompetition);
//# sourceMappingURL=AddCompetition.js.map