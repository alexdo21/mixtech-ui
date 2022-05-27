import React from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getCompleteMatches, getIncompleteMatches, deleteMatch } from "../../actions"
import { useSelector, useDispatch } from "react-redux";
import "./Matches.css"

function Matches({getCompleteMatches, getIncompleteMatches, deleteMatch, completeMatches, incompleteMatches}) {
    // const completeMatches = useSelector(state => state.matchReducer.completeMatches)
    // const incompleteMatches = useSelector(state => state.matchReducer.incompleteMatches)
    // const dispatch = useDispatch()
    React.useEffect(() => {
        const fetchMatches = async () => {
            await getCompleteMatches()
            await getIncompleteMatches()
        }
        fetchMatches()
    }, [getCompleteMatches, getIncompleteMatches])

    const handleDelete = async (event) => {
        await deleteMatch(event.target.value)
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
                        {completeMatches.map((match, i) => 
                            <tr key={i}>
                                <td>{match.songName1}</td>
                                <td>{match.songName2}</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={match.id} onClick={handleDelete}>X</button></td>
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
                        {incompleteMatches.map((match, i) => 
                            <tr key={i}>
                                <td>{match.songName1}</td>
                                <td>...</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={match.id} onClick={handleDelete}>X</button></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Matches.propTypes = {
    getCompleteMatches: PropTypes.func.isRequired,
    getIncompleteMatches: PropTypes.func.isRequired,
    deleteMatch: PropTypes.func.isRequired,
    completeMatches: PropTypes.array,
    incompleteMatches: PropTypes.array
};

const mapStateToProps = state => ({
    completeMatches: state.matchReducer.completeMatches,
    incompleteMatches: state.matchReducer.incompleteMatches
})

export const ConnectedMatches = connect(mapStateToProps, { getCompleteMatches, getIncompleteMatches, deleteMatch })(Matches)