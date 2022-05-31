import React from "react";
import Modal from "react-responsive-modal"

function PlaylistSongs({playlist, open, onClose, playlistSongs}) {
    return (
        playlist === null ?
        <div></div> :
        <Modal open={open} onClose={onClose}>
            <div className="modal-header"><h3>{playlist.name}</h3></div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Song</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {playlistSongs.map((song, i) => 
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{song.name}</td>
                            <td><button className="btn btn-outline-danger btn-sm">X</button></td>
                        </tr>    
                    )}
                </tbody>
            </table>
        </Modal>
    )
}

export { PlaylistSongs };