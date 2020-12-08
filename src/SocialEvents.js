import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from './firebase';


class SocialEvents extends Component {
    constructor() {
        super();
        this.state = {
            socialEvents: [],
            userInput: ''
        }
    }

    // Get data from Firebase
    componentDidMount() {
        // Variable that holds a reference to our database
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {
            // store the new state we want to introduce to our app
            const newState = [];
            // response from our query to Firebase inside of a variable .val() 
            const data = response.val();
            // data is an object, so we iterate through it using a for in loop to access each book name 
            for (let key in data) {
                // inside the loop, we push each book name to an array we already created inside the .on() function called newState
                newState.push({ key: key, eventDetails: data[key] });
            }
            // then, we call this.setState in order to update our component's state using the local array newState
            this.setState({
                socialEvents: newState
            });
        });
    }


    // update the state of the component to be equal to input field
    handleChange = (event) => {
        this.setState({
            userInput: event.target.id
        });
    }

    // Display data
    render() {
        return (
            <div className="SocialEvents">
                <form>
                    {/* Map through the array and display each event on the page */}
                    {this.state.socialEvents.map((eachEvent) => {
                        return (
                            // On change run the function to update the state
                            <fieldset key={eachEvent.key} onChange={this.handleChange} >
                                <input type="radio" className="check" id={eachEvent.key} name="socialEventCards" value={eachEvent.key} required/>
                                <label htmlFor={eachEvent.key}>
                                    <ul>
                                        <li><h2>Name: {eachEvent.eventDetails.name}</h2></li>
                                        <li>Party Size: {eachEvent.eventDetails.partySize}</li>
                                        <li>Type: {eachEvent.eventDetails.type}</li>
                                        <li>Date: {eachEvent.eventDetails.date}</li>
                                        <li>Time: {eachEvent.eventDetails.time}</li>
                                    </ul>
                                </label>
                            </fieldset>
                        )
                    })}
                    {/* Link to Results Page */}
                    {/* Pass selected value and all firebase values to Results */}
                    {/* Add IF statemet to force user to select one option */}
                    {this.state.userInput ? 
                        <Link to={{
                            pathname: `/results/${this.state.userInput}`, 
                            state: {
                                selectedEvent: this.state.userInput, 
                                allEvents: this.state.socialEvents
                            }
                        }}>Results</Link>
                        : <div><p>Results</p><p>Please select your event!</p></div>
                    }
                </form>
            </div>
        );
    }
}

export default SocialEvents;
