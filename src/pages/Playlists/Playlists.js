import React from "react";
import { CreatePlaylist, PlaylistSongs } from "../../components"
import { getAllPlaylists, deletePlaylist, getAllSongsInPlaylist, addPlaylistOnSpotify, UNAUTHORIZED } from "../../services"
import { GET_ALL_PLAYLISTS, GET_ALL_SONGS_IN_PLAYLIST, DELETE_PLAYLIST, LOGOUT } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import "./Playlists.css"

function Playlists() {
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = React.useState(false)
    const [isPlaylistSongsModalOpen, setIsPlaylistSongsModalOpen] = React.useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null)

    const playlists = useSelector(state => state.playlistReducer.playlists)
    const playlistSongs = useSelector(state => state.playlistReducer.playlistSongs)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getAllPlaylists()
        .then(playlists => dispatch({ type: GET_ALL_PLAYLISTS, payload: playlists }))
        .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }, [dispatch, isCreatePlaylistModalOpen])

    const handleSelectedPlaylistToOpen = (event) => {
        const selectedPlaylist = event.target.selected
        getAllSongsInPlaylist(selectedPlaylist.id)
        .then(playlistSongs => {
            dispatch({ type: GET_ALL_SONGS_IN_PLAYLIST, payload: playlistSongs })
            setSelectedPlaylist(selectedPlaylist)
            setIsPlaylistSongsModalOpen(true)
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
        event.target.blur()
    }
    const handleAddOnSpotify = (event) => {
        const playlistId = event.target.value
        addPlaylistOnSpotify(playlistId)
        .then(() => alert("Playlist added on spotify succesfully"))
        .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
        event.target.blur()
    }
    const handleDeletePlaylist = (event) => {
        const playlistId = event.target.value
        deletePlaylist(playlistId)
        .then(() => dispatch({ type: DELETE_PLAYLIST, payload: Number(playlistId) }))
        .catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }
    const handleOpenAddPlaylistModal = (event) => {
        setIsCreatePlaylistModalOpen(true)
        event.target.blur()
    }

    return (
        <div id="playlistContent">
            <div id="playlistTitle">
                <h1>My Playlists</h1>
                <button className="btn btn-outline-primary btn-sm" onClick={handleOpenAddPlaylistModal}>Add Playlist</button>
            </div>
            <div id="playlistTable">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Playlist</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlists.map((playlist) => 
                            <tr key={playlist.id}>
                                <td></td>
                                <td><button className="btn btn-light btn-lg" selected={playlist} onClick={handleSelectedPlaylistToOpen}>{playlist.name}</button></td>
                                <td>{playlist.description}</td>
                                <td className="option-buttons">
                                    <button className="btn btn-outline-danger btn-sm" value={playlist.id} onClick={handleDeletePlaylist}>X</button>
                                    <button className="btn btn-outline-success btn-sm" value={playlist.id} onClick={handleAddOnSpotify}>Add on Spotify</button>
                                </td>
                            </tr>     
                        )}
                    </tbody>
                </table>
            </div>
            <CreatePlaylist open={isCreatePlaylistModalOpen} onClose={() => setIsCreatePlaylistModalOpen(false)} />
            <PlaylistSongs open={isPlaylistSongsModalOpen} onClose={() => setIsPlaylistSongsModalOpen(false)} playlist={selectedPlaylist} playlistSongs={playlistSongs} />
        </div>
    );
}

export { Playlists };