import { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';


class SocialEvents extends Component {
    constructor() {
        super();
        this.state = {
            socialEvents: [],
            userInput: '',
            randomEvent: '',
            
            // keep track of the variable on the new event form
            newEventName: '',
            newEventPartySize: '',
            newEventType: '',
            newEventDate: '',
            newEventTime: ''
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
            const lengthOfArray = newState.length;
            const randomIndex = Math.floor(Math.random() * lengthOfArray);
            const randomizedEvent = newState[randomIndex].key;

            this.setState({
                socialEvents: newState,
                randomEvent: randomizedEvent
            });
        });
    }


    // update the state of the component to be equal to input field
    handleChange = (event) => {
        this.setState({
            userInput: event.target.id
        });
    }

    handleChangeNewEvent = (event) => {
        const value = event.target.value;

        this.setState({
            [event.target.id]: value
        });
        // in the example:
            // store event.target.value in a constant
            // setState by:
                // target each propery by the input's name and set it to the value stored in the constant
                    // [event.target.name]: constantName
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const dbRef = firebase.database().ref();

        const newEntryObj = {
            name: this.state.newEventName,
            partySize: this.state.newEventPartySize,
            type: this.state.newEventType,
            date: this.state.newEventDate,
            time: this.state.newEventTime
        };
        
        dbRef.push(newEntryObj);
    }

    // Display data
    render() {
        return (
            <section className="socialEvents wrapper">
                <h2>Are you in lockdown?! 🔐 Tired of going out? <span className="headerBlock">Would you rather stay home and watch TV?! 📺 </span></h2>
                <p>Pick the event you would rather miss 😢, and we will show you what you can watch instead! 😇 Can't find the event you're looking for? 🤔 Create a new event.</p>
                <form>
                    {/* Map through the array and display each event on the page */}
                    {this.state.socialEvents.map((eachEvent) => {
                        return (
                            // On change run the function to update the state
                            <fieldset key={eachEvent.key} onChange={this.handleChange} >
                                <input type="radio" className="check" id={eachEvent.key} name="socialEventCards" value={eachEvent.key} required/>
                                <label htmlFor={eachEvent.key}>
                                    <ul className="eachEvent">
                                        <li><h2>{eachEvent.eventDetails.name}</h2></li>
                                        <li>Party Size: {eachEvent.eventDetails.partySize}</li>
                                        <li>Type: {eachEvent.eventDetails.type}</li>
                                        <li>Date: {eachEvent.eventDetails.date}</li>
                                        <li>Time: {eachEvent.eventDetails.time}</li>
                                    </ul>
                                </label>
                            </fieldset>
                        )
                    })}
                </form>
                <h2>Add Your Own Event!</h2>
                <form className="newEventForm" onSubmit={this.handleSubmit}>
                    {/* // On change run the function to update the state */}
                    <fieldset>
                        <label htmlFor="newEventName">Name: </label>
                        <input type="text" className="inputFormUser" id="newEventName" name="inputForm" value={this.state.newEventName} placeholder="John Doe" required onChange={this.handleChangeNewEvent}/>
                        <label htmlFor="newEventPartySize">Party Size: </label>
                        <input type="number" className="inputFormUser" id="newEventPartySize" name="inputForm" value={this.state.newEventPartySize} placeholder="25" required onChange={this.handleChangeNewEvent}/>
                        <label htmlFor="newEventType">Type: </label>
                        <input type="text" className="inputFormUser" id="newEventType" name="inputForm" value={this.state.newEventType}
                        placeholder="Soirée" required onChange={this.handleChangeNewEvent}/>
                        <label htmlFor="newEventDate">Date: </label>
                        <input type="date" className="inputFormUser" id="newEventDate" name="inputForm" value={this.state.newEventDate} required onChange={this.handleChangeNewEvent}/>
                        <label htmlFor="newEventTime">Time: </label>
                        <input type="time" className="inputFormUser" id="newEventTime" name="inputForm" value={this.state.newEventTime} required onChange={this.handleChangeNewEvent}/>
                        <button type="submit">Create New Event</button>
                    </fieldset>
                </form>
                        
                {/* Link to Results Page */}
                {/* Pass selected value and all firebase values to Results */}
                {/* Add IF statement to force user to select one option */}
                <div className="toResults">
                    {this.state.userInput ? 
                        <Link to={{
                            pathname: `/results/${this.state.userInput}`, 
                            state: {
                                selectedEvent: this.state.userInput, 
                                allEvents: this.state.socialEvents
                            }
                        }}>Show me the Shows!</Link>
                        : <div><p>Please select your event!</p></div>
                    }
                    <Link to={{
                        pathname: `/results/${this.state.randomEvent}`,
                        state: {
                            selectedEvent: this.state.randomEvent,
                            allEvents: this.state.socialEvents
                        }
                    }}>Random Show</Link>
                </div>
            </section>
        );
    }
}

export default SocialEvents;
