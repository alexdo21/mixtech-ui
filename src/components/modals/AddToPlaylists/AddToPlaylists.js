import React from 'react';
import Modal from "react-responsive-modal"
import { getAllPlaylists, addSongToPlaylist, UNAUTHORIZED } from "../../../services"
import { GET_ALL_PLAYLISTS, ADD_SONG_TO_PLAYLIST, LOGOUT } from "../../../reducers/types"
import { useSelector, useDispatch } from "react-redux";

function AddToPlaylists({open, toggleCallback, song}) {
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(-1)

    const playlists = useSelector(state => state.playlistReducer.playlists)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getAllPlaylists()
        .then(playlists => dispatch({ type: GET_ALL_PLAYLISTS, payload: playlists }))
        .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }, [dispatch])

    const handleAddSongToPlaylist = (event) => {
        event.preventDefault()
        addSongToPlaylist(selectedPlaylist, song.spotifyId)
        .then(() => {
            dispatch({ type: ADD_SONG_TO_PLAYLIST })
            toggleCallback(false)
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }

    return (
        <Modal open={open} onClose={() => toggleCallback(false)}>
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
                        {playlists.map((playlist) => 
                            <tr key={playlist.id}>
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
    );
}

export { AddToPlaylists };