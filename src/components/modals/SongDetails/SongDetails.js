import React from "react";
import Modal from "react-responsive-modal"
import { AddToMatches, AddToPlaylists } from "../.."
import { whichKey, whichMode, round2, minuteSeconds } from "../../../services"
import "./SongDetails.css"

function SongDetails({open, onClose, song, addMatchesModal, addPlaylistsModal}) {
    const [isAddToMatchesModalOpen, setIsAddToMatchesModalOpen] = React.useState(false)
    const [isAddToPlaylistsModalOpen, setIsAddToPlaylistsModalOpen] = React.useState(false)

    const handleOpenAddToMatchesModal = (event) => {
        setIsAddToMatchesModalOpen(true)
        event.target.blur()
    }
    const handleOpenAddToPlaylistsModal = (event) => {
        setIsAddToPlaylistsModalOpen(true)
        event.target.blur()
    }

    if (song != null) {
        return (
            <>
                <Modal open={open} onClose={onClose}>
                    <div className="song-details-wrapper">
                        <div className="modal-header">
                            <h4>{song.name}</h4><br/>
                            <h6>{song.artistName} <br/>
                            {song.albumName} </h6>
                        </div>
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
                                    <td>Time Signature</td>
                                    <td>{`${song.timeSignature}/4`}</td>
                                </tr>
                                <tr>
                                    <td>Tempo (BPM)</td>
                                    <td>{round2(song.tempo)}</td>
                                </tr>
                                <tr>
                                    <td>Duration</td>
                                    <td>{minuteSeconds(song.durationMs)}</td>
                                </tr>
                                <tr>
                                    <td>Danceability</td>
                                    <td>{round2(song.danceability)}</td>
                                </tr>
                                <tr>
                                    <td>Energy</td>
                                    <td>{round2(song.energy)}</td>
                                </tr>
                                <tr>
                                    <td>Valence</td>
                                    <td>{round2(song.valence)}</td>
                                </tr>
                                <tr>
                                    <td>Loudness</td>
                                    <td>{round2(song.loudness)}</td>
                                </tr>
                                <tr>
                                    <td>Liveness</td>
                                    <td>{round2(song.liveness)}</td>
                                </tr>
                                <tr>
                                    <td>Acousticness</td>
                                    <td>{round2(song.acousticness)}</td>
                                </tr>
                                <tr>
                                    <td>Speechiness</td>
                                    <td>{round2(song.speechiness)}</td>
                                </tr>
                                <tr>
                                    <td>Instrumentalness</td>
                                    <td>{round2(song.instrumentalness)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="modal-footer">
                            {addMatchesModal ? <button type="button" className="btn btn-secondary shadow-none" onClick={handleOpenAddToMatchesModal}>Add to Matches</button> : null}
                            {addPlaylistsModal ? <button type="button" className="btn btn-primary shadow-none" onClick={handleOpenAddToPlaylistsModal}>Add to Playlists</button> : null}
                        </div>
                    </div>
                </Modal>
                {addMatchesModal ? <AddToMatches open={isAddToMatchesModalOpen} toggleCallback={setIsAddToMatchesModalOpen} song={song} /> : null}
                {addPlaylistsModal ? <AddToPlaylists open={isAddToPlaylistsModalOpen} toggleCallback={setIsAddToPlaylistsModalOpen} song={song} /> : null}
            </>
        )
    }
}

export { SongDetails };