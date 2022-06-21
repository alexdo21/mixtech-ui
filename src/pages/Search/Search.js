import React from "react";
import { SongDetails, SpotifyPlayer } from "../../components"
import { getSongsByQuery, getCompleteMatchesBySongName, whichKey, whichMode } from "../../services"
import { GET_SONGS_BY_QUERY, CLEAR_SEARCH_RESULTS, GET_COMPLETE_MATCHES_BY_SONG_NAME } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import "./Search.css"


function Search() {
    const [query, setQuery] = React.useState("")
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
        getSongsByQuery(query)
        .then(searchResults => dispatch({ type: GET_SONGS_BY_QUERY, payload: searchResults }))
        .catch(err => console.log(err))
        getCompleteMatchesBySongName(query)
        .then(searchMatches => dispatch({ type: GET_COMPLETE_MATCHES_BY_SONG_NAME, payload: searchMatches }) )
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
                        <input type="text" className="form-control" name="songName" placeholder="Search for song"
                        onChange={(event) => setQuery(event.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
            <div className="container" id="results">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Song</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Key</th>
                            <th scope="col">Tempo (BPM)</th>
                            <th scope="col">Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((song) =>
                            <tr key={song.spotifyId}>
                                <td><SpotifyPlayer song={song} /></td>
                                <td><button className="btn btn-light btn-lg" selected={song} onClick={handleSelectedSongToOpen}>{song.name}</button></td>
                                <td>{song.artistName}</td>
                                <td>{whichKey(song.key)} {whichMode(song.mode)}</td>
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
                            <th scope="col"></th>
                            <th scope="col">Song 1</th>
                            <th scope="col"></th>
                            <th scope="col">Song 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchMatches.map((match) => 
                            <tr key={match.id}>
                                <td><SpotifyPlayer song={match.song1} /></td>
                                <td><button className="btn btn-light btn-lg" selected={match.song1} onClick={handleSelectedSongToOpen}>{match.song1.name}</button></td>
                                <td><SpotifyPlayer song={match.song2} /></td>
                                <td><button className="btn btn-light btn-lg" selected={match.song2} onClick={handleSelectedSongToOpen}>{match.song2.name}</button></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <SongDetails open={isSongDetailsModalOpen} onClose={() => setIsSongDetailsModalOpen(false)} song={selectedSong} addMatchesModal={true} addPlaylistsModal={true} />
        </div>
    );
}

export { Search };