import React from "react";
import PropTypes from "prop-types"
import Modal from "react-responsive-modal"
import { PlaylistSongs } from "../../components"
import { allPlaylists, addPlaylist, deletePlaylist, getAllSongsInPlaylist } from "../../actions"
import { connect } from "react-redux"
import "./Playlists.css"


function Playlist({allPlaylists, addPlaylist, deletePlaylist, getAllSongsInPlaylist, results, songs}) {
    const [openModal, setOpenModal] = React.useState(false)
    const [songsModal, setSongsModal] = React.useState(false)
    const [playlist, setPlaylist] = React.useState(null)
    const [pname, setPname] = React.useState("")
    const [description, setDescription] = React.useState("")

    React.useState(() => {
        const fetchPlaylists = async () => {
            await allPlaylists()
        }
        fetchPlaylists()
    }, [allPlaylists])
    
    const onOpenModal = () => setOpenModal(true)
    const onCloseModal = () => setOpenModal(false)
    const handlePname = (event) => setPname(event.target.value)
    const handleDescription = (event) => setDescription(event.target.value)
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            pname: pname,
            privacy: 0,
            description: description
        }
        addPlaylist(data)
        window.location.reload()
        
    }
    const onOpenPlaylist = async (event) => {
        setPlaylist(event.target.selected)
        if (playlist !== null) {
            await getAllSongsInPlaylist(playlist.pid)
        }
        setSongsModal(true)
    }
    const onClosePlaylist = () => setSongsModal(false)
    const handleDeletePlaylist = async (event) => {
        await deletePlaylist(event.target.value)
        window.location.reload()
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
                        {results.map((playlist, i) => 
                            <tr key={i}>
                                <td><button className="btn btn-light btn-lg" selected={playlist} onClick={onOpenPlaylist}>{playlist.pname}</button></td>
                                <td>{playlist.description}</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={playlist.pid} onClick={handleDeletePlaylist}>X</button></td>
                            </tr>     
                        )}
                    </tbody>
                </table>
            </div>
            <Modal open={openModal} onClose={onCloseModal}>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Playlist Name</label>
                            <input type="text" className="form-control" name="pname" onChange={handlePname}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" onChange={handleDescription}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Playlist</button>
                    </form>
                </div>
            </Modal>
            <PlaylistSongs open={songsModal} onClose={onClosePlaylist} playlist={playlist} songs={songs}/>
        </div>
    );
}

Playlist.propType = {
    allPlaylists: PropTypes.func.isRequired,
    addPlaylist: PropTypes.func,
    deletePlaylist: PropTypes.func,
    results: PropTypes.array,
    songs: PropTypes.array
};

const mapStateToProps = state => ({
    results: state.playlists.results,
    songs: state.playlists.songs
});

export const ConnectedPlaylists = connect(mapStateToProps, { allPlaylists, addPlaylist, deletePlaylist, getAllSongsInPlaylist })(Playlist);