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
        text: 'Test ID'
      }, {
        dataField: 'testScore',
        text: 'Your Score'
      }];

  render() {

   const { userTests = []} = this.props;


    return (


    

      <div>
        <BootstrapTable keyField='testId' data={ userTests } columns={ this.columns } />
      </div>
    )
  }
}


// export default compose(
//     firestoreConnect(props => [
//         { collection: 'tests', storeAs: 'test', doc: props.match.params.id }
//     ]),
//     connect(({ firestore: { ordered } }, props) => ({
//       tests: ordered.test && ordered.test[0]
//     }))
//   )(Results);


  export default compose(
    firestoreConnect([{ collection: 'tests' }]),
    connect((state, props) => ({
      userTests: state.firestore.ordered.tests,
      auth: state.firebase.auth
    }))
  )(Results);