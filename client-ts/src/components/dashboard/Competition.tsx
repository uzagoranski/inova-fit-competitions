import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import Media from 'react-media';
import { getCompetition } from '../../actions/competitionActions';
import { getRounds, deleteRound } from '../../actions/roundActions';
import { getLeaderboard } from '../../actions/leaderboardActions';
import { ICompetitionProp, IRoundProp, ILeaderboardProp } from '../../common/interfaces';
import { AppState } from "../../reducers";

// Props
interface ICompetitionProps {

    competition: any,
    round: any,
    leaderboard: any,
    match: any,
    getCompetition: (id: string) => any,
    getRounds: (id: string) => any,
    getLeaderboard: (id: string) => any,
    deleteRound: (id: string) => any

}

class Competition extends Component<ICompetitionProps> {

    componentDidMount() {

        this.props.getCompetition(this.props.match.params._id);
        this.props.getRounds(this.props.match.params._id);
        this.props.getLeaderboard(this.props.match.params._id);  

    }

    onDeleteClick = (_id: string) => {

        this.props.deleteRound(_id)
        setTimeout(this.props.getLeaderboard(this.props.match.params._id), 10000);

    }

    render() {

        const { competitions } = this.props.competition;
        const { rounds } = this.props.round;
        const { leaderboards } = this.props.leaderboard;
        let position = 0;

        return(
            <Media query="(min-width: 700px)">
                {matches =>
                        matches ? 
                        (
                        <div className="container" style={{ minHeight: "70vh", marginTop: "100px"  }}>
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
                                <div className="col s12 center-align" style={{marginTop: "20px"}}>
                                    <div className="col s12">
                                    <Link
                                        to={`/addRound/${competitions._id}`}
                                        style={{
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginBottom: "40px",
                                            marginTop: "20px"
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                        New round
                                    </Link><br/>

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
                                        { rounds.map(({ _id, date, stravaSegmentID }: any) => (
                                            <tr key={_id}>
                                                <th scope="row"><Button
                                                        className="btn btn-small waves-effect waves-light hoverable red accent-3"                                            
                                                        color="danger"
                                                        size="sm"
                                                        style={{marginLeft: "10px"}}
                                                        onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                                    </Button></th>
                                                <td>
                                                    { date.substr(0, 10) }
                                                </td>
                                                <td>
                                                    { date.substr(11, 5) }
                                                </td>
                                                <td>
                                                    {stravaSegmentID}
                                                </td>
                                            </tr>   
                                        ))}                 
                                        </tbody>
                                    </table>
                                
                                    <table className="tableRounds">
                                        <thead>
                                            <tr>
                                                <th style={{ fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}} scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Average time</th>
                                                <th scope="col">Total distance</th>
                                                <th scope="col">Number of segments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { !(leaderboards === null) ?                           
                                        leaderboards.map(({ name, averageTime, totalDistance, numberOfRounds }: any) => (
                                            <tr key={name}>   
                                                <td style={{color: "red", fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}}>
                                                    {++position}
                                                </td>                                 
                                                <td>
                                                    { name }
                                                </td>
                                                <td>
                                                    { averageTime }
                                                </td>
                                                <td>
                                                    { totalDistance }
                                                </td>
                                                <td>
                                                    { numberOfRounds }
                                                </td>
                                            </tr>   
                                        ))
                                        :
                                        <td></td>
                                        }                 
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>                
                        </div>    
                        )
                        : 
                        (
                        <div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
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
                                <div className="col s12 center-align" style={{marginTop: "20px"}}>
                                    <div className="col s12">
                                        <Link
                                            to={`/addRound/${competitions._id}`}
                                            style={{
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginBottom: "40px",
                                                marginTop: "20px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                            >
                                            New round
                                        </Link><br/>

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
                                                { rounds.map(({ _id, date, stravaSegmentID }: any) => (
                                                    <tr key={_id}>
                                                        <th scope="row"><Button
                                                                className="btn btn-small waves-effect waves-light hoverable red accent-3"                                            
                                                                color="danger"
                                                                size="sm"
                                                                style={{marginLeft: "10px"}}
                                                                onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                                            </Button></th>
                                                        <td>
                                                            { date.substr(0, 10) }
                                                        </td>
                                                        <td>
                                                            { date.substr(11, 5) }
                                                        </td>
                                                        <td>
                                                            {stravaSegmentID}
                                                        </td>
                                                    </tr>   
                                                ))}                 
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col s12">
                                            <table className="tableRoundsMobile">
                                                <thead>
                                                    <tr>
                                                        <th style={{ fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}} scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Avg. time</th>
                                                        <th scope="col">Ttl. dist.</th>
                                                        <th scope="col">Num. of seg.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                            { !(leaderboards === null && leaderboards === "") ?                                                                          
                                                leaderboards.map(({ name, averageTime, totalDistance, numberOfRounds }: any) => (
                                                    <tr key={name}>   
                                                        <td style={{color: "red", fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}}>
                                                            {++position}
                                                        </td>                                 
                                                        <td>
                                                            { name }
                                                        </td>
                                                        <td>
                                                            { averageTime }
                                                        </td>
                                                        <td>
                                                            { totalDistance }
                                                        </td>
                                                        <td>
                                                            { numberOfRounds }
                                                        </td>
                                                    </tr>   
                                                ))
                                                :
                                                <td></td>
                                                }                 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>            
                        )
                    }
            </Media>            
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    competition: state.competition,
    round: state.round,
    leaderboard: state.leaderboard,
})

export default connect(mapStateToProps, { getCompetition, getRounds, deleteRound, getLeaderboard })(Competition);