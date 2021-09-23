import React, { Component } from 'react';

export class ViewWorkout extends Component {

  render() {
    const { state } = this.props.location
    const workoutInfo = Object.entries(state)

    console.log(state)
    return (
        <div>
            {workoutInfo.map((element) => <p> {element.join(" ")} </p> )}
        </div>
      );
  }
}

export default ViewWorkout;