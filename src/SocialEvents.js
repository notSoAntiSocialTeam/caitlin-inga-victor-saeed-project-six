import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// 
import firebase from './firebase';




class SocialEvents extends Component {
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


    // console.log(response.val());


    // data is an object, so we iterate through it using a for in loop to access each book name 
    for (let key in data) {

    // inside the loop, we push each book name to an array we already created inside the .on() function called newState
    newState.push({ key: key, eventDetails: data[key] });
    }

    // then, we call this.setState in order to update our component's state using the local array newState
    this.setState({
    socialEvents: newState
    });


    // console.log(this.state.socialEvents)


});
}



handleChange = (event) => {
// we're telling React to update the state of our `App` component to be 
// equal to whatever is currently the value of the input field

this.setState({
    userInput: event.target.id

});

// console.log(this.state.userInput)
}


submitForm = (event) => {
event.preventDefault();
this.setState({
    selectedEvent: this.state.userInput
})

// console.log(this.state.selectedEvent)
}

// Display data
render() {
return (
    <div className="SocialEvents">
    <form>
        {this.state.socialEvents.map((eachEvent) => {
        return (
            <div key={eachEvent.key} onChange={this.handleChange} >
            <input 
                // checked={this.state.userInput === eachEvent.key}
                type="radio" className="check" id={eachEvent.key} name="socialEventCards" value={eachEvent.key} required/>
            <label htmlFor={eachEvent.key}>
                <ul>
                <li><h2>Name: {eachEvent.eventDetails.name}</h2></li>
                <li>Party Size: {eachEvent.eventDetails.partySize}</li>
                <li>Type: {eachEvent.eventDetails.type}</li>
                <li>Date: {eachEvent.eventDetails.date}</li>
                <li>Time: {eachEvent.eventDetails.time}</li>
                </ul>
            </label>
            </div>
        )
        })}

        {/* <button onClick={this.submitForm} className="submit" type="submit">Submit</button> */}
            <Link to={{
                pathname: `/results/${this.state.userInput}`, 
                state: {
                    selectedEvent: this.state.userInput
                }
            }}>Results</Link>


    </form>
    </div>
);
}
}

export default SocialEvents;
