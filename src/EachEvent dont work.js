import { Component } from 'react';

class EachEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        }
    }

    // On Form change, choose selected option
    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
        console.log(this.state.selectedOption)
    }

    // Show each event
    render() {
        const { keyId, eventName, eventSize, eventType } = this.props;
        return (
            <div>
                <input onChange={() => this.onValueChange} type="radio" className="check" id={keyId} name="socialEventCards" value={keyId} required />
                <label htmlFor={keyId}>
                    <ul>
                        <li>Name: {eventName}</li>
                        <li>Party Size: {eventSize}</li>
                        <li>Type: {eventType}</li>
                    </ul>
                </label>
            </div>
        )
    }
}

export default EachEvent;