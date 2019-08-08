import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { getCompetitions, deleteCompetition } from '../../actions/competitionActions';
import PropTypes from 'prop-types';  
import trophy from "../../static/img/trophy.jpg";

class CompetitionsList extends Component {

    static propTypes = {
        getCompetitions: PropTypes.func.isRequired,
        competition: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getCompetitions();
    }

    onDeleteClick = (_id) => {
        this.props.deleteCompetition(_id);
    }

    render() {
        const { competitions } = this.props.competition;
        return(
            <div style={{ minHeight: "70vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                    <Link
                        to="/addCompetition"
                        style={{
                            width: "300px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginBottom: "40px",
                            marginTop: "20px"
                        }}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        New competition
                    </Link><br/>
                    <img style={{
                        marginBottom: "2rem",
                        maxWidth: "800px"
                        }} src={trophy} alt="Trophy" />  <br/>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Competition name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {competitions.map(({ _id, name }) => (
                                <tr key={_id}>
                                    <th scope="row"><Button
                                            className="btn btn-small waves-effect waves-light hoverable red accent-3"                                            
                                            color="danger"
                                            size="sm"
                                            style={{marginLeft: "10px"}}
                                            onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                        </Button></th>
                                    <td>
                                        <a className="competitionStats" href={"/competition/" + _id}>{name}</a>
                                    </td>
                                </tr>   
                            ))}                 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    competition: state.competition
});

export default connect(mapStateToProps, { getCompetitions, deleteCompetition })(CompetitionsList);