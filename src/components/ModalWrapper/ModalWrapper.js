import React from "react";
import Modal from "react-responsive-modal"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getIncompleteMatches, createMatch, pairMatch, getAllPlaylists, addSongToPlaylist } from "../../actions"

function ModalWrapper({getIncompleteMatches, getAllPlaylists, createMatch, pairMatch, addSongToPlaylist, song, open, onClose, incompleteMatches, playlists}) {
    const [openAddMatches, setOpenAddMatches] = React.useState(false)
    const [openAddPlaylists, setOpenAddPlaylists] = React.useState(false)
    const [selectedMatch, setSelectedMatch] = React.useState(-1)
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(-1)

    React.useEffect(() => {
        const fetchMatchesAndPlaylists = async () => {
            await getIncompleteMatches()
            await getAllPlaylists()
        }
        fetchMatchesAndPlaylists()
    }, [getIncompleteMatches, getAllPlaylists, openAddMatches, openAddPlaylists])

    const onOpenMatches = () => setOpenAddMatches(true)
    const onCloseMatches = () => setOpenAddMatches(false)
    const onOpenPlaylists = () => setOpenAddPlaylists(true)
    const onClosePlaylists = () => setOpenAddPlaylists(false)
    const handleNewMatch = async () => {
        await createMatch(song)
        await getIncompleteMatches()
    }
    const handleMatchChange = (event) => setSelectedMatch(event.target.selected)
    const handleMatchSubmit = async (event) => {
        event.preventDefault()
        const req = {
            matchId: selectedMatch,
            songId: song.id
        }
        await pairMatch(req)
        await getIncompleteMatches()
    }
    const handlePlaylistChange = (event) => setSelectedPlaylist(event.target.selected)
    const handlePlaylistSubmit = async (event) => {
        event.preventDefault()
        const req = {
            playlistId: selectedPlaylist,
            songId: song.id
        }
        await addSongToPlaylist(req)
        await getAllPlaylists()
    }

    return (
        song === null ?
        <div></div> : 
        <div>
            <Modal open={open} onClose={onClose}>
                <div className="modal-header"><h3>{song.name} from {song.albumName}</h3></div>
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
                    <button type="button" className="btn btn-secondary" onClick={onOpenMatches}>Add to Matches</button>
                    <button type="button" className="btn btn-primary" onClick={onOpenPlaylists}>Add to Playlists</button>
                </div>
            </Modal>
            <Modal open={openAddMatches} onClose={onCloseMatches}>
                <div className="modal-header">
                    <h4>Incomplete Matches</h4>
                </div>
                <form onSubmit={(event) => handleMatchSubmit(event).then(onCloseMatches)}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Song 1</th>
                                <th scope="col">    </th>
                            </tr>
                        </thead>
                        <tbody>  
                            {incompleteMatches.map((match, i) => 
                                <tr key={i}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="song" selected={match.id}
                                            onChange={handleMatchChange}></input>
                                            <label className="form-check-label">{match.songName1}</label>
                                        </div>
                                    </td>
                                    <td>...</td>
                                </tr>  
                            )}
                        </tbody>
                    </table>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={(event) => handleNewMatch(event).then(onCloseMatches)}>Add New Match</button>
                        <button type="submit" className="btn btn-primary">Add to selected Match</button>
                    </div>
                </form>
            </Modal>
            <Modal open={openAddPlaylists} onClose={onClosePlaylists}>
                <div className="modal-header">
                    <h4>Playlists</h4>
                </div>
                <form onSubmit={(event) => handlePlaylistSubmit(event).then(onClosePlaylists)}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Playlist</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {playlists.map((playlist, i) => 
                                <tr key={i}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="song" selected={playlist.id}
                                            onChange={handlePlaylistChange}></input>
                                            <label className="form-check-label">{playlist.name}</label>
                                        </div>
                                    </td>
                                    <td>{playlist.description}</td>
                                </tr>  
                            )}
                        </tbody>
                    </table>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Add to selected Playlist</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

/**
 * Helper function for which mode,
 * Major or Minor.
 * @param {*} value 
 */
const whichMode = (value) => {
    switch(value) {
        case 0: return "Minor"
        case 1: return "Major"
        default: return ""
    }
}

/**
 * Helper function for readability of keys.
 * @param value - key value
 */
const whichKey = (value) => {
    switch(value) {
        case 0: return "C"
        case 1: return "C#/Db"
        case 2: return "D"
        case 3: return "D#/Eb"
        case 4: return "E"
        case 5: return "F"
        case 6: return "F#/Gb"
        case 7: return "G"
        case 8: return "G#/Ab"
        case 9: return "A"
        case 10: return "A#/Bb"
        case 11: return "B"
        default: return ""
    }
}

ModalWrapper.propTypes = {
    getIncompleteMatches: PropTypes.func,
    getAllPlaylists: PropTypes.func,
    createMatch: PropTypes.func,
    pairMatch: PropTypes.func,
    addSongToPlaylist: PropTypes.func,
    incompleteMatches: PropTypes.array,
    playlists: PropTypes.array
}

const mapStateToProps = state => ({
    incompleteMatches: state.matchReducer.incompleteMatches,
    playlists: state.playlistReducer.playlists
})

export const ConnectedModalWrapper = connect(mapStateToProps, { getIncompleteMatches, createMatch, pairMatch, getAllPlaylists, addSongToPlaylist })(ModalWrapper);