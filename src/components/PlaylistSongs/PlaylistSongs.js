import React from "react";
import Modal from "react-responsive-modal"
import { connect } from "react-redux"
import { getAllSongsInPlaylist } from "../../actions"
import PropTypes from "prop-types"

function PlaylistSongs({playlist, open, onClose, songs}) {
    return (
        playlist === null ?
        <div></div> :
        <Modal open={open} onClose={onClose}>
            <div className="modal-header"><h3>{playlist.pname}</h3></div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Song</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, i) => 
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{song.name}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
        </Modal>
    )
}

PlaylistSongs.propTypes = {
    getAllSongsInPlaylist: PropTypes.func.isRequired,
    songs: PropTypes.array
}

const mapStateToProps = state => ({
    songs: state.playlists.songs
})

export const ConnectedPlaylistSongs = connect(mapStateToProps, { getAllSongsInPlaylist })(PlaylistSongs);