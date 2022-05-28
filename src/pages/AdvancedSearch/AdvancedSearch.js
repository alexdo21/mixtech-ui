import React from "react";
import { ModalWrapper } from "../../components"
import { getSongsByAudioFeatures, whichKey } from "../../services"
import { GET_SONGS_BY_AUDIO_FEATURES, CLEAR_SEARCH_RESULTS } from "../../reducers/types"
import { useSelector, useDispatch } from "react-redux";
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import "./AdvancedSearch.css"

function AdvancedSearch() {
    const [key, setKey] = React.useState(0)
    const [mode, setMode] = React.useState(1)
    const [danceability, setDanceability] = React.useState({min: 0.0, max: 1.0})
    const [energy, setEnergy] = React.useState({min: 0.0, max: 1.0})
    const [loudness, setLoudness] = React.useState({min: -60.0, max: 0.0})
    const [speechiness, setSpeechiness] = React.useState({min: 0.0, max: 1.0})
    const [acousticness, setAcousticness] = React.useState({min: 0.0, max: 1.0})
    const [instrumentalness, setInstrumentalness] = React.useState({min: 0.0, max: 1.0})
    const [liveness, setLiveness] = React.useState({min: 0.0, max: 1.0})
    const [valence, setValence] = React.useState({min: 0.0, max: 1.0})
    const [tempo, setTempo] = React.useState({min: 0.0, max: 250.0})
    const [durationMs] = React.useState({min: 1, max: 5000})
    const [isSongDetailsModalOpen, setIsSongDetailsModalOpen] = React.useState(false)
    const [selectedSong, setSelectedSong] = React.useState(null)

    const searchResults = useSelector(state => state.searchReducer.searchResults)
    const dispatch = useDispatch()

    React.useEffect(() => {
        return () => dispatch({ type: CLEAR_SEARCH_RESULTS })
    }, [dispatch])

    const handleSubmit = (event) => {
        event.preventDefault()
        const advancedSearchRequest = {
            key: key,
            mode: mode,
            danceability0: danceability.min, danceability1: danceability.max,
            energy0: energy.min, energy1: energy.max,
            loudness0: loudness.min, loudness1: loudness.max,
            speechiness0: speechiness.min, speechiness1: speechiness.max,
            acousticness0: acousticness.min, acousticness1: acousticness.max,
            instrumentalness0: instrumentalness.min, instrumentalness1: instrumentalness.max,
            liveness0: liveness.min, liveness1: liveness.max,
            valence0: valence.min, valence1: valence.max,
            tempo0: tempo.min, tempo1: tempo.max,
        }
        getSongsByAudioFeatures(advancedSearchRequest)
        .then(searchResults => dispatch({ type: GET_SONGS_BY_AUDIO_FEATURES, payload: searchResults }))
        .catch(err => console.log(err))
    }
    const handleSelectedSongToOpen = (event) => {
        setSelectedSong(event.target.selected)
        setIsSongDetailsModalOpen(true)
    }

    return (
        <div id="asearchContent">
            <div className="container" id="form">
                <form className="form" onSubmit={handleSubmit}>
                    <label><h1>Advanced Search</h1></label>
                    <div className="form-row">
                        <div className="col pcol">
                            <label className="alabel">Key</label>
                            <select className="form-control" onChange={event => setKey(event.target.value)}>
                                <option value={0}>C</option>
                                <option value={1}>C#/Db</option>
                                <option value={2}>D</option>
                                <option value={3}>D#/Eb</option>
                                <option value={4}>E</option>
                                <option value={5}>F</option>
                                <option value={6}>F#/Gb</option>
                                <option value={7}>G</option>
                                <option value={8}>G#/Ab</option>
                                <option value={9}>A</option>
                                <option value={10}>A#/Bb</option>
                                <option value={11}>B</option>
                            </select>
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Modality</label>
                            <select className="form-control" onChange={event => setMode(event.target.value)}>
                                <option value={1}>Major</option>
                                <option value={0}>Minor</option>
                            </select>
                        </div>
                    </div>  
                    <div className="form-row">
                        <div className="col pcol">
                            <label className="alabel">Danceability</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={danceability}
                            onChange={value => setDanceability(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Energy</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={energy}
                            onChange={value => setEnergy(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Loudness</label>
                            <InputRange
                            minValue={-60.0}
                            maxValue={0.0}
                            step={1.0}
                            value={loudness}
                            onChange={value => setLoudness(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col pcol">
                            <label className="alabel">Speechiness</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={speechiness}
                            onChange={value => setSpeechiness(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Acousticness</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={acousticness}
                            onChange={value => setAcousticness(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Instrumentalness</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={instrumentalness}
                            onChange={value => setInstrumentalness(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col pcol">
                            <label className="alabel">Liveness</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={liveness}
                            onChange={value => setLiveness(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Valence</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.1}
                            value={valence}
                            onChange={value => setValence(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                        <div className="col pcol">
                            <label className="alabel">Tempo</label>
                            <InputRange
                            minValue={0.0}
                            maxValue={250.0}
                            step={1}
                            value={tempo}
                            onChange={value => setTempo(value)}
                            onChangeComplete={value => console.log(value)} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
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
            <ModalWrapper open={isSongDetailsModalOpen} onClose={() => setIsSongDetailsModalOpen(false)} song={selectedSong}/>
        </div>
    );
}

export { AdvancedSearch }