import React from 'react';
import Modal from "react-responsive-modal"
import { getIncompleteMatches, createMatch, pairMatch, UNAUTHORIZED } from "../../../services"
import { GET_INCOMPLETE_MATCHES, CREATE_MATCH, PAIR_MATCH, LOGOUT } from "../../../reducers/types"
import { useSelector, useDispatch } from "react-redux";

function AddToMatches({open, toggleCallback, song}) {
    const [selectedMatch, setSelectedMatch] = React.useState(-1)

    const incompleteMatches = useSelector(state => state.matchReducer.incompleteMatches)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getIncompleteMatches()
        .then(incompleteMatches => dispatch({ type: GET_INCOMPLETE_MATCHES, payload: incompleteMatches }))
        .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }, [dispatch, open])

    const handleCreateNewMatch = () => {
        createMatch(song.spotifyId)
        .then(() => {
            dispatch({ type: CREATE_MATCH })
            toggleCallback(false)
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : alert(err))
    }
    const handlePairMatch = (event) => {
        event.preventDefault()
        pairMatch(selectedMatch, song.spotifyId)
        .then(() => {
            dispatch({ type: PAIR_MATCH })
            toggleCallback(false)
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : alert(err))
    }

    return (
        <Modal open={open} onClose={() => toggleCallback(false)}>
            <div className="modal-header">
                <h4>Incomplete Matches</h4>
            </div>
            <form onSubmit={handlePairMatch}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Song 1</th>
                            <th scope="col">    </th>
                        </tr>
                    </thead>
                    <tbody>  
                        {incompleteMatches.map((match) => 
                            <tr key={match.id}>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="song" selected={match.id}
                                        onChange={(event) => setSelectedMatch(event.target.selected)}></input>
                                        <label className="form-check-label">{match.song1.name}</label>
                                    </div>
                                </td>
                                <td>...</td>
                            </tr>  
                        )}
                    </tbody>
                </table>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCreateNewMatch}>Add New Match</button>
                    <button type="submit" className="btn btn-primary">Add to selected Match</button>
                </div>
            </form>
        </Modal>
    );
}

export { AddToMatches };