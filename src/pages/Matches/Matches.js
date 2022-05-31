import React from "react";
import { GET_COMPLETE_MATCHES, GET_INCOMPLETE_MATCHES, DELETE_MATCH } from "../../reducers/types"
import { SpotifyPlayer } from "../../components";
import { getCompleteMatches, getIncompleteMatches, deleteMatch } from "../../services"
import { useSelector, useDispatch } from "react-redux";
import "./Matches.css"

function Matches() {
    const completeMatches = useSelector(state => state.matchReducer.completeMatches)
    const incompleteMatches = useSelector(state => state.matchReducer.incompleteMatches)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getCompleteMatches()
        .then(completeMatches => dispatch({ type: GET_COMPLETE_MATCHES, payload: completeMatches }))
        .catch(err => console.log(err))
        getIncompleteMatches()
        .then(incompleteMatches => dispatch({ type: GET_INCOMPLETE_MATCHES, payload: incompleteMatches }))
        .catch(err => console.log(err))
    }, [dispatch])

    const handleDelete = (event) => {
        const matchId = event.target.value
        deleteMatch(matchId)
        .then(() => dispatch({ type: DELETE_MATCH, payload: Number(matchId) }))
        .catch(err => console.log(err))
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
                            <th scope="col"></th>
                            <th scope="col">Song 1</th>
                            <th scope="col"></th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeMatches.map((match, i) => 
                            <tr key={i}>
                                <td><SpotifyPlayer song={match.song1} /></td>
                                <td>{match.song1.name}</td>
                                <td><SpotifyPlayer song={match.song2} /></td>
                                <td>{match.song2.name}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm">{"\u2713"}</button>
                                    <button className="btn btn-outline-danger btn-sm" value={match.id} onClick={handleDelete}>X</button>
                                </td>
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
                            <th scope="col"></th>
                            <th scope="col">Song 1</th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {incompleteMatches.map((match, i) => 
                            <tr key={i}>
                                <td><SpotifyPlayer song={match.song1} /></td>
                                <td>{match.song1.name}</td>
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

export { Matches };