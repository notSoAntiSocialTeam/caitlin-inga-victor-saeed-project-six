import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import image from "./noImage.jpg";

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
            // Do AXIOS call to get all the tv shows from Canada
            axios({
                method: "GET",
                // Replace the date with the event's date
                url: `http://api.tvmaze.com/schedule?date=${this.state.socialEvent.date}`,
                responseType: "json",
                params: {
                    country: "CA"
                }
            }).then((response) => {

                console.log("CA TV Response Data", response.data);
                const canadianTV = response.data

                // axios call to get tv shows from the US
                axios({
                    method: "GET",
                    // Replace the date with the event's date
                    url: `http://api.tvmaze.com/schedule?date=${this.state.socialEvent.date}`,
                    responseType: "json",
                    params: {
                        country: "US"
                    }
                }).then((results) => {
                    console.log("CA TV Response Data #2", canadianTV);
                    console.log(results.data);
                    // add the American TV shows to the end of the canadianTV array
                    const northAmericanTV = [...canadianTV, ...results.data];
                    console.log("North American TV", northAmericanTV);
                    this.setState({
                        movieList: northAmericanTV,
                        movieDisplay: northAmericanTV
                    }, () => {
                        // Run the function to get all available genres on a particular day
                            this.getActiveGenresArray();
                    })
                    console.log(this.state.movieList);
                })
            }).catch(err => {
                // Show message if axios error
                this.setState({
                    errorMessage: err.message,
                    showErrorMessage: true,
                });
            });
        })
    }

    // Change the displayed data based on the genre chosen
    componentDidUpdate(prevProp, prevState) {
        if (prevState.selectedGenre !== this.state.selectedGenre) {
            // Show all movies if all genres selected, show only one genre if one genre is selected
            if (this.state.selectedGenre.value !== this.state.defaultGenres) {
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

    // Display data
    render() {
        // destructuring 
        const { selectedGenre, socialEvent, availableGenres } = this.state;

        return (
            <div>
                {/* Show eror message if Axios call fails */ }
                {
                    this.state.showErrorMessage && <div className="blockView">
                        <div className="error">
                            <h6>Sorry... Something went wrong, not all data can be retrieved.</h6>
                            <button onClick={this.reloadPage}>Try again!</button>
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                }
                <main className="resultsPage wrapper">
                    {/* use the selected event from props and display it on the page */}
                    <section className="missedEvent">
                        <h2>What You're Missing...</h2>
                        <div>
                            <h3>{socialEvent.name}</h3>
                            <p>Party of {socialEvent.partySize}</p>
                            <p>{socialEvent.type}</p>
                            <p>{socialEvent.date}</p>
                            <p>{socialEvent.time}</p>
                        </div>
                    </section>

                    {/* select genre */}
                    <div className="selectGenre">
                        <h2>Pick Your Genre:</h2>
                        <Select
                            value={selectedGenre}
                            onChange={this.handleChange}
                            options={availableGenres}
                            className="genreDropdown"
                            theme={theme => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                                ...theme.colors,
                                primary25: '#d479ff',
                                primary: '#3a1879',
                            }
                            })}
                        />
                        <Link to="/">Start Over</Link>
                    </div>

                    {/* display tv show results on page */}
                    {/* TODO filter through tv shows */}
                    <h2>What You're Doing Instead</h2>
                    <ul className="tvShows">
                        {
                            this.state.movieDisplay.map((movie) => {
                                // Const for Official site link
                                const showUrl = movie.show.officialSite;
                                return (
                                    <li key={movie.id}>
                                        <div className="movieData"> 
                                            <img src={movie.show.image !== null ? movie.show.image.medium : image} alt={movie.show.image  !==null ? movie.show.name : "No Image available"}/>
                                            <h3>{movie.show.name}</h3>
                                            <p>Episode: {movie.name}</p>
                                            <p>Airtime: {movie.airtime}</p>
                                            <p>{movie.show.network != null ? movie.show.network.country.name : 'Country Unvailable' }</p>
                                        </div>
                                        <div className="link">
                                        {
                                                showUrl ? <Link to={{ pathname: `${showUrl}` }} target="_blank" >Go To Official Site</Link> : <p className="notSelected">No Link Available</p>
                                        }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* Start over button */}
                    <Link to="/">Start Over</Link>
                </main>
            </div>
        );
    }
}

export default ResultsPage;
