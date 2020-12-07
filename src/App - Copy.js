import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';
import firebase from './firebase';
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




// {/* STRETCH: Homepage */ }

// {/* COMPONENT ONE: SocialEvents */ }
// {/* contains social event cards, title, INSTRUCTIONS */ }

// {/* COMPONENT TWO: Search; Schedule; ScheduleSelection; ScheduleFilter; Filter */ }
// {/* contains: Calendar and SelectGenre components */ }
// {/* submit button */ }

// {/* COMPONENT THREE: ResultsPage */ }
// {/* contains: social event component, filtered tv shows component (AXIOS), pick again button */ }







class App extends Component {
  constructor() {
    super();
    this.state = {
      socialEvents: [],
      userInput: ''
    }
  }


  componentDidMount() {

    // Variable that holds a reference to our database
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {

      // Here we're creating a variable to store the new state we want to introduce to our app
      const newState = [];

      // Here we store the response from our query to Firebase inside of a variable called data
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();

      console.log(response.val());

      // data is an object, so we iterate through it using a for in loop to access each book name 
      for (let key in data) {

        // inside the loop, we push each book name to an array we already created inside the .on() function called newState
        newState.push({ key: key, eventDetails: data[key] });
      }

      // then, we call this.setState in order to update our component's state using the local array newState
      this.setState({
        socialEvents: newState
      });

      console.log(this.state.socialEvents)

    });
  }

  handleChange = (event) => {
    // we're telling React to update the state of our `App` component to be 
    // equal to whatever is currently the value of the input field
    this.setState({
      userInput: event.target.value
    });
    console.log(this.state.userInput)
  }


  submitForm = (event) => {
    event.preventDefault();
    this.setState({
      selectedEvent: this.state.userInput
    })
    console.log(this.state.selectedEvent)
  }

  // Display data
  render() {
    return (
      <div className="App">

        <form>
          {this.state.socialEvents.map((eachEvent) => {
            return (
              <div key={eachEvent.key}>
                <input onChange={(event) => this.handleChange(event)} 
                  // checked={this.state.selectedOption === "option3"}
                type="radio" className="check" id={eachEvent.key} name="socialEventCards" value={eachEvent.key } required/>
                <label htmlFor={eachEvent.key}>
                  <ul>
                    <li>Name: {eachEvent.eventDetails.name}</li>
                    <li>Party Size: {eachEvent.eventDetails.partySize}</li>
                    <li>Type: {eachEvent.eventDetails.type}</li>
                  </ul>
                </label>
              </div>
            )
          })}
          <button onClick={this.submitForm} className="submit" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default App;
