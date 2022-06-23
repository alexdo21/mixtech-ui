import React from 'react';
import Modal from "react-responsive-modal"
import { createPlaylist, UNAUTHORIZED } from "../../../services"
import { useDispatch } from "react-redux";
import { CREATE_PLAYLIST, LOGOUT } from "../../../reducers/types"

function CreatePlaylist({open, onClose}) {
    const [playlistName, setPlaylistName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const dispatch = useDispatch()

    const handleCreateNewPlaylist = (event) => {
        event.preventDefault()
        const newPlaylistRequest = {
            name: playlistName,
            description: description
        }
        createPlaylist(newPlaylistRequest)
        .then(() => {
            dispatch({ type: CREATE_PLAYLIST })
            onClose()
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }

    return (
        <Modal open={open} onClose={onClose}>
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
                    <button type="submit" className="btn btn-primary">Create Playlist</button>
                </form>
            </div>
        </Modal>
    );
}

export { CreatePlaylist };