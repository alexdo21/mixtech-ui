import React from "react";
import Modal from "react-responsive-modal"
import { PlaylistSongs } from "../../components"
import { getAllPlaylists, createPlaylist, deletePlaylist, getAllSongsInPlaylist, addPlaylistOnSpotify } from "../../services"
import { GET_ALL_PLAYLISTS, GET_ALL_SONGS_IN_PLAYLIST, CREATE_PLAYLIST, DELETE_PLAYLIST } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import "./Playlists.css"


function Playlists() {
    const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = React.useState(false)
    const [isPlaylistSongsModalOpen, setIsPlaylistSongsModalOpen] = React.useState(false)
    const [playlistName, setPlaylistName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null)

    const playlists = useSelector(state => state.playlistReducer.playlists)
    const playlistSongs = useSelector(state => state.playlistReducer.playlistSongs)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getAllPlaylists()
        .then(playlists => dispatch({ type: GET_ALL_PLAYLISTS, payload: playlists }))
        .catch(err => console.log(err))
    }, [dispatch, isAddPlaylistModalOpen])

    const handleCreateNewPlaylist = (event) => {
        event.preventDefault()
        const newPlaylistRequest = {
            name: playlistName,
            description: description
        }
        createPlaylist(newPlaylistRequest)
        .then(() => {
            dispatch({ type: CREATE_PLAYLIST })
            setIsAddPlaylistModalOpen(false)
        }).catch(err => console.log(err))
    }
    const handleSelectedPlaylistToOpen = (event) => {
        const selectedPlaylist = event.target.selected
        getAllSongsInPlaylist(selectedPlaylist.id)
        .then(playlistSongs => {
            dispatch({ type: GET_ALL_SONGS_IN_PLAYLIST, payload: playlistSongs })
            setSelectedPlaylist(selectedPlaylist)
            setIsPlaylistSongsModalOpen(true)
        }).catch(err => console.log(err))
    }
    const handleAddOnSpotify = (event) => {
        const playlistId = event.target.value
        addPlaylistOnSpotify(playlistId)
        .then(() => alert("Playlist added on spotify succesfully"))
        .catch(err => console.log(err))
    }
    const handleDeletePlaylist = (event) => {
        const playlistId = event.target.value
        deletePlaylist(playlistId)
        .then(() => dispatch({ type: DELETE_PLAYLIST, payload: Number(playlistId) }))
        .catch(err => console.log(err))
    }

    return (
        <div id="playlistContent">
            <div id="playlistTitle">
                <h1>My Playlists</h1>
                <button className="btn btn-outline-primary btn-sm" onClick={() => setIsAddPlaylistModalOpen(true)}>Add Playlist</button>
            </div>
            <div id="playlistTable">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Playlist</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlists.map((playlist) => 
                            <tr key={playlist.id}>
                                <td><button className="btn btn-light btn-lg" selected={playlist} onClick={handleSelectedPlaylistToOpen}>{playlist.name}</button></td>
                                <td>{playlist.description}</td>
                                <td>
                                    <button className="btn btn-outline-success btn-sm" value={playlist.id} onClick={handleAddOnSpotify}>Add On Spotify</button>
                                    <button className="btn btn-outline-danger btn-sm" value={playlist.id} onClick={handleDeletePlaylist}>X</button>
                                </td>
                            </tr>     
                        )}
                    </tbody>
                </table>
            </div>
            <Modal open={isAddPlaylistModalOpen} onClose={() => setIsAddPlaylistModalOpen(false)}>
                <div className="container">
                    <form onSubmit={handleCreateNewPlaylist}>
                        <div className="form-group">
                            <label>Playlist Name</label>
                            <input type="text" className="form-control" name="playlistName" onChange={(event) => setPlaylistName(event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Playlist</button>
                    </form>
                </div>
            </Modal>
            <PlaylistSongs open={isPlaylistSongsModalOpen} onClose={() => setIsPlaylistSongsModalOpen(false)} playlist={selectedPlaylist} playlistSongs={playlistSongs}/>
        </div>
    );
}

export { Playlists };