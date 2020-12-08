import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class ResultsPage extends Component {
    constructor() {
        super();
        this.state = {
            // Error messages
            errorMessage: '',
            showErrorMessage: false,
            // Movie List
            movieList: [],
            // genre: ''
        }
    }

    // NOTE MOVE TO VIEW THREE
    //AXIOS call for movie list
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://api.tvmaze.com/schedule?country=CA&date=2020-12-07`,
            responseType: "json",
        }).then((response) => {
            // console.log(response.data)
            // console.log(this.props.match.params.state.userInput)
            this.setState({
                movieList: response.data
            });
            // console.log(this.state.movieList)
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
        window.location.reload(false);
    }

    // Display data
    render() {
        return (
            <Router>
                <div className="ResultsPage">

                    <h3>ResultsPage</h3>

                    {/* this.state.movieList.map( <callback function for displaying> ).filter( <filtering out to only the select genre> ) */}
                    {/* Show error message if AXIOS didn't work, button to reload the page */}
                    {this.state.showErrorMessage && <div className="blockView">
                        <div className="error">
                            <h6>Sorry... Something went wrong, not all data can be retrieved.</h6>
                            <button onClick={this.reloadPage}>Try again!</button>
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>}
                </div>
            </Router>
        );
    }
}

export default ResultsPage;
