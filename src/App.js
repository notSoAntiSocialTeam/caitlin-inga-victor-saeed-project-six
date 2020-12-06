import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

/* PSEUDOCODE
  - Firebase --> VIEW ONE
    - explain to the user what the app does
    - read from the database and display six cards on screen
      - two rows of three
      - details for database
        - name (Date Night)
        - Type (Food & Drink)
        - PartySize (2)
    - ask the user to select one of the event cards
    - onChange save the selected card to state
    - onSubmit/onClick pass state through props to the method that displays that event to VIEW THREE

  - VIEW TWO
    - React-Calendar
      - ask the user to select a date using the React-Calendar
      - onClick/onChange? (on the calendar) for when the user chooses a date, but has not made up their mind
        - save the selected day/date to the state
          - format the date into an object?
    - user picks a genre from a pre-defined list
      - onChange save selected genre to state
    - submit/click handler will trigger:
      - the passing of the date to axios
      - passing the genre as a prop
    
      
  - VIEW THREE
    - Axios
      - endpoint?:  http://api.tvmaze.com/schedule?country=:countrycode&date=:date
        - country: CA
          - param in axios call (hardcoded)
          - US has more data; use this instead? HelpCue
        - date: YEAR-MO-DA (variable)
      - make the API call based on the above parameters
      - save that response to our state array object
    - map through array and render TV shows on the screen and apply filter to narrow down by genre
    - allow the user to start over via button that will send them back to VIEW ONE

    - REVIEW does time zone matter?
    - retrieve from API:
      - airdate --> YEAR-MO-DA
      - airstamp?
        - NOTE airstamp is UTC
      - airtime --> 24hr clock
        - NOTE airtime is AST
      - id
      - image
      - show
        - genres
          - NOTE check if the array is empty
        - image
          - NOTE check if the object is empty
          - check if first image property is empty/null
        - language --> English only
        - name
        - official site --> STRETCH
        - rating? --> some are null
        - runtime --> STRETCH
        - schedule
          - days (array)
          - time --> if airtime is null? error handling?
        - status
          - NOTE check for "Running" status
        - summary --> STRETCH

        - NOTE find alt text!
          - use name (for now)
            - show name + episode name/number


    Good job Team! :)
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Error messages
      errorMessage: '',
      showErrorMessage: false,
      // Movie List
      movieList: [],
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
    window.location.reload(false);
  }

  // Display data
  render() {
    return (
      <Router>
        <div className="App">

        {/* STRETCH: Homepage */}

        {/* COMPONENT ONE: SocialEvents */}
        {/* contains social event cards, title, INSTRUCTIONS */}

        {/* COMPONENT TWO: Search; Schedule; ScheduleSelection; ScheduleFilter; Filter */}
        {/* contains: Calendar and SelectGenre components */}
          {/* submit button */}

        {/* COMPONENT THREE: ResultsPage */}
        {/* contains: social event component, filtered tv shows component (AXIOS), pick again button */}

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
export default App;
