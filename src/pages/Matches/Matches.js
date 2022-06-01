import React from "react";
import { GET_COMPLETE_MATCHES, GET_INCOMPLETE_MATCHES, DELETE_MATCH } from "../../reducers/types"
import { SongDetails, SpotifyPlayer } from "../../components";
import { getCompleteMatches, getIncompleteMatches, deleteMatch, addCompleteMatchToPlaylist } from "../../services"
import { useSelector, useDispatch } from "react-redux";
import "./Matches.css"

function Matches() {
    const [isSongDetailsModalOpen, setIsSongDetailsModalOpen] = React.useState(false)
    const [selectedSong, setSelectedSong] = React.useState(null)

    const completeMatches = useSelector(state => state.matchReducer.completeMatches)
    const incompleteMatches = useSelector(state => state.matchReducer.incompleteMatches)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getCompleteMatches()
        .then(completeMatches => dispatch({ type: GET_COMPLETE_MATCHES, payload: completeMatches }))
        .catch(err => console.log(err))
        getIncompleteMatches()
        .then(incompleteMatches => dispatch({ type: GET_INCOMPLETE_MATCHES, payload: incompleteMatches }))
        .catch(err => console.log(err))
    }, [dispatch])

    const handleAddToPlaylist = (event) => {

    }
    const handleDelete = (event) => {
        const matchId = event.target.value
        deleteMatch(matchId)
        .then(() => dispatch({ type: DELETE_MATCH, payload: Number(matchId) }))
        .catch(err => console.log(err))
    }
    const handleSelectedSongToOpen = (event) => {
        setSelectedSong(event.target.selected)
        setIsSongDetailsModalOpen(true)
    }

    return (
        <div id="matchesContent">
            <div id="matchesTitle">
                <h1>My Matches</h1>
            </div>
            <div className="matchesTable">
                <h4>Complete Matches</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Song 1</th>
                            <th scope="col"></th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeMatches.map((match) => 
                            <tr key={match.id}>
                                <td><SpotifyPlayer song={match.song1} /></td>
                                <td><button className="btn btn-light btn-lg" selected={match.song1} onClick={handleSelectedSongToOpen}>{match.song1.name}</button></td>
                                <td><SpotifyPlayer song={match.song2} /></td>
                                <td><button className="btn btn-light btn-lg" selected={match.song2} onClick={handleSelectedSongToOpen}>{match.song2.name}</button></td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm" value={match.id} onClick={handleAddToPlaylist}>{"\u2713"}</button>
                                    <button className="btn btn-outline-danger btn-sm" value={match.id} onClick={handleDelete}>X</button>
                                </td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <div className="matchesTable">
                <h4>Incomplete Matches</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Song 1</th>
                            <th scope="col">Song 2</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {incompleteMatches.map((match) => 
                            <tr key={match.id}>
                                <td><SpotifyPlayer song={match.song1} /></td>
                                <td><button className="btn btn-light btn-lg" selected={match.song1} onClick={handleSelectedSongToOpen}>{match.song1.name}</button></td>
                                <td>...</td>
                                <td><button className="btn btn-outline-danger btn-sm" value={match.id} onClick={handleDelete}>X</button></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <SongDetails open={isSongDetailsModalOpen} onClose={() => setIsSongDetailsModalOpen(false)} song={selectedSong} />
        </div>
    );
}

export { Matches };