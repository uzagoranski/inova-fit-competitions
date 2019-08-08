import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addRound } from '../../actions/roundActions';

class AddRound extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      competitionId: "",
      stravaSegmentId: "",
      errors: {}
    };
  }
  
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newRound = {
        date: this.state.date,
        competitionId: this.props.match.params._id,
        stravaSegmentId: this.state.stravaSegmentId
    }

    //Add date via addRound action
    this.props.addRound(newRound, this.props.history, this.props.match.params._id);

    //this.props.history.push(`/competition/${this.props.match.params._id}`);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ minHeight: "70vh" }}>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to={`/competition/${this.props.match.params._id}`} className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to details
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                New <b>round</b>
              </h4>
              <p className="grey-text text-darken-1">
                Add a new round below
              </p><br/>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <label style={{ marginLeft: "10px" }} htmlFor="date">Date and time</label>
              <div className="input-field col s12">               
                <input
                  onChange={this.onChange}
                  value={this.state.date}
                  error={errors.date}
                  id="date"
                  type="datetime-local"
                  placeholder="Date"
                  className={classnames("", {
                    invalid: errors.date
                  })}
                />
                <span className="red-text">
                  {errors.date}
                </span>
              </div>               
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.stravaSegmentId}
                  error={errors.stravaSegmentId}
                  id="stravaSegmentId"
                  type="text"
                  className={classnames("", {
                    invalid: errors.stravaSegmentId
                  })}
                />
                <label htmlFor="email">Strava segment ID</label>
                <span className="red-text">
                  {errors.stravaSegmentId}
                </span>
              </div>                 
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add new
                </button>                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  competition: state.competition,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRound }
)(AddRound);