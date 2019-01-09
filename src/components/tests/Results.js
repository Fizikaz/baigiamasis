// testas turi id, kuris siejamas su useriu

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

class Results extends Component {

    state = {
      userTestId: null
    }

    columns = [{
        dataField: 'regionId',
        text: 'Region'
      }, {
        dataField: 'submittedValue',
        text: 'Submitted Answer'
      }, {
        dataField: 'testValue',
        text: 'Correct Answer'
      },{
        dataField: 'accuracy',
        text: 'Accuracy'
      }];

    //   onSubmit = (e) => {
    //     e.preventDefault();
    
    //     const newSong = this.state;
    
    //     const { firestore } = this.props;

    //     firestore.update({ testScore:  });
    // };

      writeTotalScore = (totalScore) => {  
      //const { firestore } = this.props;

       var updateRef = firebase.firestore().collection("tests").doc(this.props.match.params.id);
        
       updateRef.update({
         testScore: totalScore
       })
  }


  // onSubmit = (e) => {
  //   e.preventDefault();

  //   const { title, description, author } = this.state;

  //   const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
  //   updateRef.set({
  //     title,
  //     description,
  //     author
  //   }).then((docRef) => {
  //     this.setState({
  //       key: '',
  //       title: '',
  //       description: '',
  //       author: ''
  //     });
  //     this.props.history.push("/show/"+this.props.match.params.id)
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // }


  render() {
  
    const test = this.props.test;

    if(!test){
      return null
    }
    
     const regionData = test.testValues.map((value, index) => {
        let a = {};
        if (!value.eqValue){
          value.eqValue= 0;
        }
        a.testValue = value.eqValue;
        a.regionId = index + 1;

        a.submittedValue = test.testSubmittedValues[index];
        a.accuracy = '';

        if (!a.submittedValue || !a.submittedValue.eqValue){
          a.accuracy = 'Test not taken';
          a.submittedValue = 0;
          return a;
        }
        a.submittedValue = a.submittedValue.eqValue;

        a.accuracy = Math.round((a.testValue - Math.abs(a.testValue - a.submittedValue)) / a.testValue * 100);

        return a;
   });
   

    let totalScore = regionData.map(a => a.accuracy);

    const grossScore = totalScore.reduce((result, item) => {
      const isNumber = Number(item) || 0;  
      return isNumber + result;
    }, 0);

      this.writeTotalScore(grossScore);
  

    return (
      <div>
        <BootstrapTable keyField='regionId' data={ regionData } columns={ this.columns } />
        <button type="submit" className="btn btn-lg btn-success m-2">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">Back To Dashboard</Link>
        </button>

        <h3>
          Your Total Score Is: {grossScore}
          </h3>
      </div>
    )
  }
}

  export default compose(
    firestoreConnect(props => [
        { collection: 'tests', storeAs: 'test', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      test: ordered.test && ordered.test[0]
    }),
    )
  )(Results);