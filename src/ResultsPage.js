import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const genreOptions = [
    {value: 'action', label: 'Action'},
    {value: 'adult', label: 'Adult'},
    {value: 'adventure', label: 'Adventure'},
    {value: 'anime', label: 'Anime' },
    { value: 'children', label: 'Children' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'crime', label: 'Crime' },
    { value: 'DIY', label: 'DIY' },
    { value: 'drama', label: 'Drama' },
    { value: 'espionage', label: 'Espionage'},
    { value: 'family', label: 'Family' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'food', label: 'Food' },
    { value: 'history', label: 'History' },
    { value: 'horror', label: 'Horror' },
    { value: 'legal', label: 'Legal' },
    { value: 'medical', label: 'Medical' },
    { value: 'music', label: 'Music' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'nature', label: 'Nature' },
    { value: 'romance', label: 'Romance' },
    { value: 'science-fiction', label: 'Science-Fiction' },
    { value: 'sports', label: 'Sports' },
    { value: 'supernatual', label: 'Supernatural' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'travel', label: 'Travel' },
    { value: 'war', label: 'War' },
    { value: 'western', label: 'Western' }
]

class ResultsPage extends Component {
    constructor() {
        super();
        this.state = {
            // Error messages
            errorMessage: '',
            showErrorMessage: false,
            // Movie List
            movieList: [],
            // genre
            selectedGenre: null
        }
    }

    // AXIOS call for movie list
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://api.tvmaze.com/schedule?country=CA&date=2020-12-07`,
            responseType: "json",
        }).then((response) => {
            // console.log(response.data)
            this.setState({
                movieList: response.data
            });
            console.log(this.state.movieList)
        }).catch(err => {
            // Show message if axios error
            this.setState({
                errorMessage: err.message,
                showErrorMessage: true,
            });
        });
    }

    // Reload page button if AXIOS error
    reloadPage = () => {
        // REVIEW why is reload crossed out?
        window.location.reload(false);
    }

    // Select Genre option change handler 
    handleChange = selectedGenre => {
        this.setState({ selectedGenre });
        console.log(`Option selected:`, selectedGenre);
    };

    // Display data
    render() {

        // destructure props
        // const { whateverThePropIsCalled } = this.props

        const dummyData = {
            name: "After Work Office Party",
            partySize: 20,
            type: "Food & Drink",
            date: "2020-12-23",
            time: "16:00"
        }


        // destructuring 
        const { selectedGenre } = this.state;

        return (
            <section className="resultsPage">
                {/* PSEUDOCODE
                    - section for the chosen event
                    - dropdown (genre)
                    - tv show results
                    - submit button
                */}

                {/* use the selected event from props and display it on the page */}
                <section className="missedEvent">
                    <h2>What You're Missing...</h2>
                    <h3>{dummyData.name}</h3>
                    <p>{dummyData.partySize}</p>
                    <p>{dummyData.type}</p>
                    <p>{dummyData.date}</p>
                    <p>{dummyData.time}</p>
                </section>

                {/* select genre */}
                <h2>Pick You're Genre:</h2>
                <Select
                    value={selectedGenre}
                    onChange={this.handleChange}
                    options={genreOptions}
                />

                {/* display tv show results on page */}
                {/* TODO filter through tv shows */}
                <h2>What You're Doing Instead</h2>
                <ul>
                    {
                        this.state.movieList.map((movie) => {
                            return (
                                <li key={movie.id}>
                                    <h3>{movie.show.name}</h3>
                                    <img src={movie.image} alt="A TV Show"/>
                                    <p>{movie.airtime}</p>
                                </li>
                            )
                        })
                    }
                </ul>

                {/* start over button */}
                <button>Start Over</button>

                {/* this.state.movieList.map( <callback function for displaying> ).filter( <filtering out to only the select genre> ) */}

                {/* 
                - VIEW TWO
                - Axios
                - endpoint?:  http://api.tvmaze.com/schedule?country=:countrycode&date=:date
                    - country: CA
                    - param in axios call (hardcoded)
                    - pick six days that have information
                    - date: YEAR-MO-DA (variable)
                - make the API call based on the above parameters
                - save that response to our state array object
                - display all tv shows onto the page for that date
                - pick genre
                - user picks a genre from a pre-defined list
                    - dropdown menu
                - onChange save selected genre to state
                - submit/click handler will trigger:
                    - filter through the axios call that is saved in state to find the tv shows that match the chosen genre
                    - save the matching shows in a separate array in state
                - map through array and render TV shows on the screen and apply filter to narrow down by genre
                - allow the user to start over via button that will send them back to VIEW ONE
                */}



                {/* Show error message if AXIOS didn't work, button to reload the page */}
                {
                this.state.showErrorMessage && <div className="blockView">
                    <div className="error">
                        <h6>Sorry... Something went wrong, not all data can be retrieved.</h6>
                        <button onClick={this.reloadPage}>Try again!</button>
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                }
            </section>
        );
    }
}

export default ResultsPage;
