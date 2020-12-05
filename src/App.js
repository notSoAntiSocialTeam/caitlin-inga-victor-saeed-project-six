import { Component } from 'react';
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
        - date: YEAR-MO-DA (variable)
      - make the API call based on the above parameters
      - save that response to our state array object
    - map through array and render TV shows on the screen and apply filter to narrow down by genre
    - allow the user to start over via button that will send them back to VIEW ONE

    Good job Team! :)
*/

class App extends Component {
  render() {
    return (
      <div className="App">
  
      </div>
    );
  }
}

export default App;
