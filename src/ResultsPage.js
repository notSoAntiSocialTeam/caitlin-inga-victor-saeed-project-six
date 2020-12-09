import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

class ResultsPage extends Component {
    constructor() {
        super();
        this.state = {
            // Error messages
            errorMessage: '',
            showErrorMessage: false,
            // Movie List
            movieList: [],
            // Array that displays only the movies of genre selected
            movieDisplay: [],
            // Social Event 
            socialEvent: {},
            // genre
            defaultGenres: "All Genres",
            selectedGenre: {
                value: "All Genres",
                label: "All Genres"
            },
            availableGenres: null,
        }
    }

    //AXIOS call to get movie list
    componentDidMount() {
        // destructure and filter our selected social event object and update setState
        const { selectedEvent, allEvents } = this.props.location.state;
        const filteredEvent = allEvents.filter((socialEvent) => {
            return socialEvent.key === selectedEvent
        })
        this.setState({
            socialEvent: filteredEvent[0].eventDetails
        }, () => {
                // Do AXIOS call to get all the movies
                    axios({
                        method: "GET",
                        // Replace the date with the event's date
                        url: `http://api.tvmaze.com/schedule?country=US&date=${this.state.socialEvent.date}`,
                        responseType: "json",
                    }).then((response) => {
                        this.setState({
                            movieList: response.data, 
                            movieDisplay:response.data
                        }, () => {
                            // Run the function to get all available genres on a particular day
                            this.getActiveGenresArray();
                        });
                        console.log(this.state.movieList);
                    }).catch(err => {
                        // Show message if axios error
                        this.setState({
                            errorMessage: err.message,
                            showErrorMessage: true,
                        });
                    });
                })
    }

    // Reload page button if AXIOS error
    reloadPage = () => {
        // REVIEW why is reload crossed out?
        window.location.reload(false);
    }

    // Handle change if selected genre changes 
    handleChange = (selectedGenre) => {
        this.setState({ selectedGenre });
    };

    // Get all genres which are available on the chosen date
    getActiveGenresArray = () => {
        let copyArray = [];
        const showList = this.state.movieList;
        showList.forEach( (show) => {
        copyArray.push(...show.show.genres);
        });
        // uses Set remove duplicate values from the array.
        // maps through the "leaned" array and formats each value into objects for the dropdown.
        // returns the mapped array and re-assigns it to copyArray. 
        copyArray = [...new Set(copyArray)].sort().map( (genre) => {
            return {
                value: genre,
                label: genre
            };
        })
        copyArray.unshift({
            value: this.state.defaultGenres,
            label: this.state.defaultGenres
        });
        this.setState({ 
            availableGenres: copyArray
        });
    }

    // Change the displayed data based on the genre chosen
    componentDidUpdate(prevProp, prevState) {
        if(prevState.selectedGenre !== this.state.selectedGenre) {
            // Show all movies if all genres selected, show only one genre if one genre is selected
            if(this.state.selectedGenre.value !== this.state.defaultGenres) {
                const filteredMovies = this.state.movieList.filter((movie) => {
                    const genreAvailArray = movie.show.genres.includes(this.state.selectedGenre.value)
                    return genreAvailArray;
                });
                this.setState({
                    movieDisplay: filteredMovies
                })
            } else {
                this.setState({
                    movieDisplay: this.state.movieList
                })
            }
        }
    }

    // Display data
    render() {
        // destructuring 
        const { selectedGenre, socialEvent, availableGenres } = this.state;

        return (
            <section className="resultsPage">
                {/* use the selected event from props and display it on the page */}
                <section className="missedEvent">
                    <h2>What You're Missing...</h2>
                    <h3>{socialEvent.name}</h3>
                    <p>{socialEvent.partySize}</p>
                    <p>{socialEvent.type}</p>
                    <p>{socialEvent.date}</p>
                    <p>{socialEvent.time}</p>
                </section>

                {/* select genre */}
                <h2>Pick You're Genre:</h2>
                <Select
                    value={selectedGenre}
                    onChange={this.handleChange}
                    options={availableGenres}
                />

                {/* display tv show results on page */}
                {/* TODO filter through tv shows */}
                <h2>What You're Doing Instead</h2>
                <ul>
                    {
                        this.state.movieDisplay.map((movie) => {
                            return (
                                <li key={movie.id}>
                                    <h3>{movie.show.name}</h3>
                                    <img src={movie.show.image !==null ? movie.show.image.medium : ''} alt="A TV Show"/>
                                    <p>{movie.airtime}</p>
                                    
                                    {/* Time zone - delete */}
                                    <p>{movie.show.network != null ? movie.show.network.country.timezone:'' }</p>

                                </li>
                            )
                        })
                    }
                </ul>

                {/* Start over button */}
                <Link to="/">Start Over</Link>

                {/* Show eror message if Axios call fails */}
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
