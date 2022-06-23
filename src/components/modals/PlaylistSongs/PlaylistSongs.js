import React from "react";
import { SongDetails, SpotifyPlayer } from "../../../components";
import { deleteSongFromPlaylist, UNAUTHORIZED } from "../../../services"
import Modal from "react-responsive-modal"
import { DELETE_SONG_FROM_PLAYLIST, LOGOUT } from "../../../reducers/types";
import { useDispatch } from "react-redux";

function PlaylistSongs({playlist, open, onClose, playlistSongs}) {
    const [isSongDetailsModalOpen, setIsSongDetailsModalOpen] = React.useState(false)
    const [selectedSong, setSelectedSong] = React.useState(null)

    const dispatch = useDispatch()

    React.useEffect(() => {}, [playlistSongs])

    const handleSelectedSongToOpen = (event) => {
        const song = event.target.selected
        setSelectedSong(song)
        setIsSongDetailsModalOpen(true)
        event.target.blur()
    }
    const handleDelete = (event) => {
        const songId = event.target.value
        deleteSongFromPlaylist(playlist.id, songId)
        .then(() => {
            dispatch({ type: DELETE_SONG_FROM_PLAYLIST, payload: songId })
            playlistSongs.filter(song => song.id !== songId)
        }).catch(err => err === UNAUTHORIZED ? dispatch({ type: LOGOUT }) : console.log(err))
    }

    if (playlist != null) {
        return (
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
                        {playlistSongs.map((song) => 
                            <tr key={song.spotifyId}>
                                <td><SpotifyPlayer song={song} /></td>
                                <td><button className="btn btn-light btn-lg" selected={song} onClick={handleSelectedSongToOpen}>{song.name}</button></td>
                                <td><button className="btn btn-outline-danger btn-sm" value={song.spotifyId} onClick={handleDelete}>X</button></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
                <SongDetails open={isSongDetailsModalOpen} onClose={() => setIsSongDetailsModalOpen(false)} song={selectedSong} addMatchesModal={true} addPlaylistsModal={false} />
            </Modal>
        )
    }
}

export { PlaylistSongs };