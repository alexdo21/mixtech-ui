import React from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { completeMatches, incompleteMatches, deleteMatch } from "../../actions"
import "./Matches.css"

function Matches({completeMatches, incompleteMatches, deleteMatch, completeResults, incompleteResults}) {
    React.useEffect(() => {
        const fetchMatches = async () => {
            await completeMatches()
            await incompleteMatches()
        }
        fetchMatches()
    }, [completeMatches, incompleteMatches])

    const handleDelete = async (event) => {
        await deleteMatch(event.target.value)
        window.location.reload()
    }

    return (
        <div id="matchesContent">
            <div id="matchesTitle">
                <h1>My Matches</h1>
            </div>
            <div className="matchesTable">
                <h4>Complete Matches</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Song 1</th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeResults.map((match, i) => 
                            <tr key={i}>
                                <td>{match.song1}</td>
                                <td>{match.song2}</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={match.matchID} onClick={handleDelete}>X</button></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <div className="matchesTable">
                <h4>Incomplete Matches</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Song 1</th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {incompleteResults.map((match, i) => 
                            <tr key={i}>
                                <td>{match.song1}</td>
                                <td>...</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={match.matchID} onClick={handleDelete}>X</button></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Matches.propTypes = {
    completeMatches: PropTypes.func.isRequired,
    incompleteMatches: PropTypes.func.isRequired,
    deleteMatch: PropTypes.func.isRequired,
    completeResults: PropTypes.array,
    incompleteResults: PropTypes.array
};

const mapStateToProps = state => ({
    completeResults: state.matches.completeResults,
    incompleteResults: state.matches.incompleteResults
})

export const ConnectedMatches = connect(mapStateToProps, { completeMatches, incompleteMatches, deleteMatch })(Matches)