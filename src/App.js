import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SocialEvents from './SocialEvents.js';
import ResultsPage from './ResultsPage.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './sass/App.scss';


/* PSEUDOCODE
  - Firebase --> VIEW ONE
    - explain to the user what the app does
    - read from the database and display six cards on screen
      - two rows of three
      - details for database
        - name (Date Night)
        - Type (Food & Drink)
        - PartySize (2)
        - Time
        - Date
    - ask the user to select one of the event cards
    - onChange save the selected card to state
    - onSubmit/onClick pass state through props to the method that displays that event to VIEW TWO
      - the date will be used for the axios call
      
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


// {/* STRETCH: Homepage --> TALK TO CLIENT */ }

// {/* COMPONENT ONE: SocialEvents */ }
// {/* contains social event cards, title, INSTRUCTIONS */ }

// {/* COMPONENT TWO: ResultsPage */ }
// {/* contains: social event component, genre selection, filtered tv shows component (AXIOS), pick again button */ }



class App extends Component {

  // Display data
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Header} />
          <Route exact path="/" component={SocialEvents} />
          <Route path="/results/:key" component={ResultsPage} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}
export default App;
