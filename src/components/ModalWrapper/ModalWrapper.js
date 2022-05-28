import React from "react";
import Modal from "react-responsive-modal"
import { getIncompleteMatches, createMatch, pairMatch, getAllPlaylists, addSongToPlaylist, whichKey, whichMode } from "../../services"
import { GET_INCOMPLETE_MATCHES, CREATE_MATCH, PAIR_MATCH, GET_ALL_PLAYLISTS, ADD_SONG_TO_PLAYLIST } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";

function ModalWrapper({song, open, onClose}) {
    const [isAddToMatchesModalOpen, setIsAddToMatchesModalOpen] = React.useState(false)
    const [isAddToPlaylistsModalOpen, setIsAddToPlaylistsModalOpen] = React.useState(false)
    const [selectedMatch, setSelectedMatch] = React.useState(-1)
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(-1)

    const incompleteMatches = useSelector(state => state.matchReducer.incompleteMatches)
    const playlists = useSelector(state => state.playlistReducer.playlists)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getIncompleteMatches()
        .then(incompleteMatches => dispatch({ type: GET_INCOMPLETE_MATCHES, payload: incompleteMatches }))
        .catch(err => console.log(err))
        getAllPlaylists()
        .then(playlists => dispatch({ type: GET_ALL_PLAYLISTS, payload: playlists }))
        .catch(err => console.log(err))
    }, [dispatch, isAddToMatchesModalOpen, isAddToPlaylistsModalOpen])

    const handleCreateNewMatch = () => {
        createMatch(song.id)
        .then(() => {
            dispatch({ type: CREATE_MATCH })
            setIsAddToMatchesModalOpen(false)
        }).catch(err => console.log(err))
    }
    const handlePairMatch = (event) => {
        event.preventDefault()
        const pairMatchRequest = {
            matchId: selectedMatch,
            songId: song.id
        }
        pairMatch(pairMatchRequest)
        .then(() => {
            dispatch({ type: PAIR_MATCH })
            setIsAddToMatchesModalOpen(false)
        }).catch(err => console.log(err))
    }
    const handleAddSongToPlaylist = (event) => {
        event.preventDefault()
        const addSongToPlaylistRequest = {
            playlistId: selectedPlaylist,
            songId: song.id
        }
        addSongToPlaylist(addSongToPlaylistRequest)
        .then(() => {
            dispatch({ type: ADD_SONG_TO_PLAYLIST })
            setIsAddToPlaylistsModalOpen(false)
        }).catch(err => console.log(err))
    }

    return (
        song === null ?
        <div></div> : 
        <div>
            <Modal open={open} onClose={onClose}>
                <div className="modal-header"><h3>{song.name} from {song.albumName}</h3></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Feature</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Key</td>
                            <td>{whichKey(song.key)}</td>
                        </tr>
                        <tr>
                            <td>Mode</td>
                            <td>{whichMode(song.mode)}</td>
                        </tr>
                        <tr>
                            <td>Tempo (BPM)</td>
                            <td>{song.tempo}</td>
                        </tr>
                        <tr>
                            <td>Duration</td>
                            <td>{song.durationMs}</td>
                        </tr>
                        <tr>
                            <td>Danceability</td>
                            <td>{song.danceability}</td>
                        </tr>
                        <tr>
                            <td>Energy</td>
                            <td>{song.energy}</td>
                        </tr>
                        <tr>
                            <td>Valence</td>
                            <td>{song.valence}</td>
                        </tr>
                        <tr>
                            <td>Loudness</td>
                            <td>{song.loudness}</td>
                        </tr>
                        <tr>
                            <td>Liveness</td>
                            <td>{song.liveness}</td>
                        </tr>
                        <tr>
                            <td>Acousticness</td>
                            <td>{song.acousticness}</td>
                        </tr>
                        <tr>
                            <td>Time Signature</td>
                            <td>{song.timeSignature}</td>
                        </tr>
                        <tr>
                            <td>Speechiness</td>
                            <td>{song.speechiness}</td>
                        </tr>
                        <tr>
                            <td>Instrumentalness</td>
                            <td>{song.instrumentalness}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsAddToMatchesModalOpen(true)}>Add to Matches</button>
                    <button type="button" className="btn btn-primary" onClick={() => setIsAddToPlaylistsModalOpen(true)}>Add to Playlists</button>
                </div>
            </Modal>
            <Modal open={isAddToMatchesModalOpen} onClose={() => setIsAddToMatchesModalOpen(false)}>
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
                            {incompleteMatches.map((match, i) => 
                                <tr key={i}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="song" selected={match.id}
                                            onChange={(event) => setSelectedMatch(event.target.selected)}></input>
                                            <label className="form-check-label">{match.songName1}</label>
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
            <Modal open={isAddToPlaylistsModalOpen} onClose={() => setIsAddToPlaylistsModalOpen(false)}>
                <div className="modal-header">
                    <h4>Playlists</h4>
                </div>
                <form onSubmit={handleAddSongToPlaylist}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Playlist</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {playlists.map((playlist, i) => 
                                <tr key={i}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="song" selected={playlist.id}
                                            onChange={(event) => setSelectedPlaylist(event.target.selected)}></input>
                                            <label className="form-check-label">{playlist.name}</label>
                                        </div>
                                    </td>
                                    <td>{playlist.description}</td>
                                </tr>  
                            )}
                        </tbody>
                    </table>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Add to selected Playlist</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export { ModalWrapper };