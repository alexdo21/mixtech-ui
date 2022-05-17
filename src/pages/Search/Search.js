import React from "react";
import { ModalWrapper } from "../../components"
import PropTypes from "prop-types"
import { basicResults, clearResults, basicMatches } from "../../actions"
import { connect } from "react-redux"
import "./Search.css"


function Search({clearResults, basicResults, basicMatches, results, matches}) {
    const [sname, setSname] = React.useState("")
    const [modalOpen, setModalOpen] = React.useState(false)
    const [selected, setSelected] = React.useState(null)

    React.useEffect(() => {
        return () => {
            clearResults()
        }
    }, [clearResults])

    const handleSnameChange = (event) => setSname(event.target.value)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const query = {sname: sname}
        await basicResults(query)
        await basicMatches(query)
    }
    const onOpenModal = (event) => {
        setSelected(event.target.selected)
        setModalOpen(true)
    }
    const onCloseModal = () => setModalOpen(false)

    return (
        <div id="searchContent">
            <div className="container" id="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group"> 
                        <label htmlFor="search"><h1>Search</h1></label>
                        <input type="text" className="form-control" name="sname" placeholder="Enter song name"
                        onChange={handleSnameChange}></input>
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
                        {results.map((song, i) =>
                            <tr key={i}>
                                <td><button className="btn btn-light btn-lg" selected={song} onClick={onOpenModal}>{song.name}</button></td>
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
                        {matches.map((match, i) => 
                            <tr key={i}>
                                <td>{match.song1}</td>
                                <td>{match.song2}</td>
                            </tr>  
                        )}
                    </tbody>
                </table>
            </div>
            <ModalWrapper open={modalOpen} onClose={onCloseModal} song={selected} />
        </div>
    );
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
        default: return "..."
    }
}

Search.propTypes = {
    basicResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    basicMatches: PropTypes.func.isRequired,
    results: PropTypes.array
}

const mapStateToProps = state => ({
    results: state.SearchResults.results,
    matches: state.SearchResults.matches
})


export const ConnectedSearch = connect(mapStateToProps, { basicResults, clearResults, basicMatches })(Search);