import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import { firebaseConnect } from 'react-redux-firebase';


class Chart extends Component {
    
    constructor(props){
        super(props);
        
    }


  render() {
    
    const { tests } = this.props;

    if(!tests){
      return null
    }

    let scoreRef = tests.map(a => a.testScore);

    const  userTotalScore = scoreRef.reduce((result, item) => {
      return result + item;
    }, 0);

    // let totalScore = regionData.map(a => a.accuracy);

    // const grossScore = totalScore.reduce((result, item) => {
    //   const isNumber = Number(item) || 0;  
    //   return isNumber + result;
    // }, 0);

    if(tests){
          return (   
            <div>
            <h1 className="text-center">My Progress</h1>
      
            <table className="table table-striped">
                  <thead className="thead-inverse">
                    <tr>
                      <th>Test Date</th>
                      <th>Test Score</th>
                      <th>Test Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map(test => (
                      <tr key={test.id}>
                        <td>{test.testDate}</td>
                        <td>{test.testScore}</td>
                        <td>{test.testType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h2 className="text-center">TotalScore: {userTotalScore}</h2>
              {/* <Line 
                  data={this.data}
                  width={100}
                  height={50}
                  options={{maintainAspectRation:false}}
              /> */}
              
            </div>
          )
        } else {
      return  <Spinner />
    }
  }
}


// export default compose(
//   firebaseConnect(),
//   connect((state, props) => ({
//       auth: state.firebase.auth,
//   }))
// )(Chart);


export default compose(
  firestoreConnect([{ collection: 'tests' }]),
  connect((state, props) => ({
    tests: state.firestore.ordered.tests,
    auth: state.firebase.auth
  }))
)(Chart);