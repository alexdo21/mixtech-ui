import React from "react";
import PropTypes from "prop-types"
import Modal from "react-responsive-modal"
import { PlaylistSongs } from "../../components"
import { getAllPlaylists, createPlaylist, deletePlaylist, getAllSongsInPlaylist } from "../../actions"
import { connect } from "react-redux"
import "./Playlists.css"


function Playlist({getAllPlaylists, createPlaylist, deletePlaylist, getAllSongsInPlaylist, playlists, playlistSongs}) {
    const [openModal, setOpenModal] = React.useState(false)
    const [songsModal, setSongsModal] = React.useState(false)
    const [playlist, setPlaylist] = React.useState(null)
    const [playlistName, setPlaylistName] = React.useState("")
    const [description, setDescription] = React.useState("")

    React.useEffect(() => {
        const fetchPlaylists = async () => {
            await getAllPlaylists()
        }
        fetchPlaylists()
    }, [getAllPlaylists, openModal])
    
    const onOpenModal = () => setOpenModal(true)
    const onCloseModal = () => setOpenModal(false)
    const handlePlaylistName = (event) => setPlaylistName(event.target.value)
    const handleDescription = (event) => setDescription(event.target.value)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            name: playlistName,
            description: description
        }
        await createPlaylist(data)
        await getAllPlaylists()
    }
    const onOpenPlaylist = async (event) => {
        await getAllSongsInPlaylist(event.target.selected.id)
    }
    const onClosePlaylist = () => setSongsModal(false)
    const handleDeletePlaylist = async (event) => {
        await deletePlaylist(event.target.value)
    }

    return (
        <div id="playlistContent">
            <div id="playlistTitle">
                <h1>My Playlists</h1>
                <button className="btn btn-outline-primary btn-sm" onClick={onOpenModal}>Add Playlist</button>
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
                        {playlists.map((playlist, i) => 
                            <tr key={i}>
                                <td><button className="btn btn-light btn-lg" selected={playlist} onClick={(event) => {onOpenPlaylist(event).then(() => {setPlaylist(event.target.selected); setSongsModal(true)})}}>{playlist.name}</button></td>
                                <td>{playlist.description}</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={playlist.id} onClick={handleDeletePlaylist}>X</button></td>
                            </tr>     
                        )}
                    </tbody>
                </table>
            </div>
            <Modal open={openModal} onClose={onCloseModal}>
                <div className="container">
                    <form onSubmit={(event) => handleSubmit(event).then(() => setOpenModal(false))}>
                        <div className="form-group">
                            <label>Playlist Name</label>
                            <input type="text" className="form-control" name="playlistName" onChange={handlePlaylistName}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" onChange={handleDescription}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Playlist</button>
                    </form>
                </div>
            </Modal>
            <PlaylistSongs open={songsModal} onClose={onClosePlaylist} playlist={playlist} playlistSongs={playlistSongs}/>
        </div>
    );
}

Playlist.propTypes = {
    getAllPlaylists: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func,
    deletePlaylist: PropTypes.func,
    playlists: PropTypes.array,
    playlistSongs: PropTypes.array
};

const mapStateToProps = state => ({
    playlists: state.playlistReducer.playlists,
    playlistSongs: state.playlistReducer.playlistSongs
});

export const ConnectedPlaylists = connect(mapStateToProps, { getAllPlaylists, createPlaylist, deletePlaylist, getAllSongsInPlaylist })(Playlist);