import React from "react";
import Modal from "react-responsive-modal"
import { AddMatches, AddPlaylists } from "../"
import { whichKey, whichMode } from "../../services"
import "./SongDetails.css"

function SongDetails({open, onClose, song, addMatchesModal, addPlaylistsModal}) {
    const [isAddToMatchesModalOpen, setIsAddToMatchesModalOpen] = React.useState(false)
    const [isAddToPlaylistsModalOpen, setIsAddToPlaylistsModalOpen] = React.useState(false)

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
                                    <td>Tempo (BPM)</td>
                                    <td>{song.tempo}</td>
                                </tr>
                                <tr>
                                    <td>Duration</td>
                                    <td>{song.durationMs}</td>
                                </tr>
                                <tr>
                                    <td>Danceability</td>
                                    <td>{song.danceability}</td>
                                </tr>
                                <tr>
                                    <td>Energy</td>
                                    <td>{song.energy}</td>
                                </tr>
                                <tr>
                                    <td>Valence</td>
                                    <td>{song.valence}</td>
                                </tr>
                                <tr>
                                    <td>Loudness</td>
                                    <td>{song.loudness}</td>
                                </tr>
                                <tr>
                                    <td>Liveness</td>
                                    <td>{song.liveness}</td>
                                </tr>
                                <tr>
                                    <td>Acousticness</td>
                                    <td>{song.acousticness}</td>
                                </tr>
                                <tr>
                                    <td>Time Signature</td>
                                    <td>{song.timeSignature}</td>
                                </tr>
                                <tr>
                                    <td>Speechiness</td>
                                    <td>{song.speechiness}</td>
                                </tr>
                                <tr>
                                    <td>Instrumentalness</td>
                                    <td>{song.instrumentalness}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="modal-footer">
                            {addMatchesModal ? <button type="button" className="btn btn-secondary" onClick={() => setIsAddToMatchesModalOpen(true)}>Add to Matches</button> : null}
                            {addPlaylistsModal ? <button type="button" className="btn btn-primary" onClick={() => setIsAddToPlaylistsModalOpen(true)}>Add to Playlists</button> : null}
                        </div>
                    </div>
                </Modal>
                {addMatchesModal ? <AddMatches open={isAddToMatchesModalOpen} toggleCallback={setIsAddToMatchesModalOpen} song={song} /> : null}
                {addPlaylistsModal ? <AddPlaylists open={isAddToPlaylistsModalOpen} toggleCallback={setIsAddToPlaylistsModalOpen} song={song} /> : null}
            </>
        )
    }
}

export { SongDetails };