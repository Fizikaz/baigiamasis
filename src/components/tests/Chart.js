import React, { Component } from 'react';
import Line from 'react-chartjs-2';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


class Chart extends Component {
    
    constructor(props){
        super(props);
        
    }

  render() {
    //const { userScore } = this.props;

    return (
      <div>
        <Line 
            data={this.data}
            width={100}
            height={50}
            options={{maintainAspectRation:false}}
        />
        You have this score
      </div>
    )
  }
}


export default compose(
  firebaseConnect(),
  connect((state, props) => ({
      auth: state.firebase.auth,
      data: state.firestore.ordered.users,
  }))
)(Chart);