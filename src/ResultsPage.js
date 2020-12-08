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

    //AXIOS call to get movie list
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://api.tvmaze.com/schedule?country=CA&date=2020-12-07`,
            responseType: "json",
        }).then((response) => {
            this.setState({
                movieList: response.data
            });
        }).catch(err => {
            // Show message if axios error
            this.setState({
                errorMessage: err.message,
                showErrorMessage: true,
            });
        });

        console.log(this.props.location.state.selectedEvent);
        console.log(this.props.location.state.allEvents);

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
