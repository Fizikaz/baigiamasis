// testas turi id, kuris siejamas su useriu

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Results extends Component {

    columns = [{
        dataField: 'testId',
        text: 'Region'
      }, {
        dataField: 'testSubmittedValues',
        text: 'Submitted Answer'
      }, {
        dataField: 'isPlaying',
        text: 'Correct Answer'
      }];
  

  render() {
   const { userTests = [] } = this.props;

   this.databaseEntry = userTests[Object.keys(userTests)[0]];

   console.log(this.databaseEntry);

    return (
      <div>
        <BootstrapTable keyField='testId' data={ userTests } columns={ this.columns } />
      </div>
    )
  }
}

  export default compose(
    firestoreConnect([{ collection: 'tests' }]),
    connect((state, props) => ({
      userTests: state.firestore.ordered.tests,
      auth: state.firebase.auth
    }))
  )(Results);