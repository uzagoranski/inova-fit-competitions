import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { getCompetitions, deleteCompetition } from '../../actions/competitionActions';
const trophy = require("../../static/img/trophy.jpg");

interface Props {
    getCompetitions(): any;
    competition: object;
    deleteCompetition(id: string): any;
}

class CompetitionsList extends Component<Props> {

    componentDidMount() {
        this.props.getCompetitions();
    }

    onDeleteClick = (_id: string) => {
        this.props.deleteCompetition(_id);
    }

    render() {
        const { competitions } = this.props.competition;
        return(
            <div style={{ minHeight: "70vh", marginTop: "130px" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s8">
                        <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Competitions</b> list
                            </h4>
                        </div>
                    </div>
                    <div className="col s12 center-align" style={{marginTop: "20px"}}>
                        <div className="col s12">
                            <img style={{
                                marginBottom: "2rem",
                                minWidth: "250px",
                                maxWidth: "100%"
                                }} src={trophy} alt="Trophy" />  <br/>
                            <Link
                                to="/addCompetition"
                                style={{
                                    width: "auto",
                                    minWidth: "250px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginBottom: "40px",
                                    alignContent:"center"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                New competition
                            </Link><br/>
                                                        
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
                                            <Link to={"/competition/" + _id} className="competitionStats" >{name}</Link>
                                        </td>
                                    </tr>   
                                ))}                 
                                </tbody>
                            </table>
                        </div>
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