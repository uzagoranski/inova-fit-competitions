import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addCompetition } from '../../actions/competitionActions';

class AddCompetition extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      errors: {}
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newCompetition = {
        name: this.state.name
    }
    //Add competition via addCompetition action
    this.props.addCompetition(newCompetition, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ minHeight: "70vh" }}>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/competitions" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to list
            </Link>
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
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">
                  {errors.name}
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
  { addCompetition }
)(AddCompetition);