import React from "react";
import { ModalWrapper } from "../../components"
import { getSongsBySongName, getAllMatchesBySongName, whichKey } from "../../services"
import { GET_SONGS_BY_SONG_NAME, CLEAR_SEARCH_RESULTS, GET_ALL_MATCHES_BY_SONG_NAME } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import "./Search.css"


function Search() {
    const [songName, setSongName] = React.useState("")
    const [isSongDetailsModalOpen, setIsSongDetailsModalOpen] = React.useState(false)
    const [selectedSong, setSelectedSong] = React.useState(null)

    const searchResults = useSelector(state => state.searchReducer.searchResults)
    const searchMatches = useSelector(state => state.matchReducer.searchMatches)
    const dispatch = useDispatch()

    React.useEffect(() => {
        return () => dispatch({ type: CLEAR_SEARCH_RESULTS })
    }, [dispatch])

    const handleSearchSong = (event) => {
        event.preventDefault()
        getSongsBySongName(songName)
        .then(searchResults => dispatch({ type: GET_SONGS_BY_SONG_NAME, payload: searchResults }))
        .catch(err => console.log(err))
        getAllMatchesBySongName(songName)
        .then(searchMatches => dispatch({ type: GET_ALL_MATCHES_BY_SONG_NAME, payload: searchMatches }) )
        .catch(err => console.log(err))
    }
    const handleSelectedSongToOpen = (event) => {
        setSelectedSong(event.target.selected)
        setIsSongDetailsModalOpen(true)
    }
    
    return (
        <div id="searchContent">
            <div className="container" id="form">
                <form onSubmit={handleSearchSong}>
                    <div className="form-group"> 
                        <label htmlFor="search"><h1>Search</h1></label>
                        <input type="text" className="form-control" name="songName" placeholder="Enter song name"
                        onChange={(event) => setSongName(event.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
            <div className="container" id="results">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Song</th>
                            <th scope="col">Key</th>
                            <th scope="col">Tempo (BPM)</th>
                            <th scope="col">Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((song, i) =>
                            <tr key={i}>
                                <td><button className="btn btn-light btn-lg" selected={song} onClick={handleSelectedSongToOpen}>{song.name}</button></td>
                                <td>{whichKey(song.key)}</td>
                                <td>{song.tempo}</td>
                                <td>{song.popularity}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="container" id="matchResults">
                <h4>Complete Matches</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Song 1</th>
                            <th scope="col">Song 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchMatches.map((match, i) => 
                            <tr key={i}>
                                <td>{match.songName1}</td>
                                <td>{match.songName2}</td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <ModalWrapper open={isSongDetailsModalOpen} onClose={() => setIsSongDetailsModalOpen(false)} song={selectedSong} />
        </div>
    );
}

export { Search };