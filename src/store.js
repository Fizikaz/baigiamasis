import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
//@todo
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
    apiKey: "AIzaSyDBaRcXBcPsPYcCq1FfMRUspe8u2AtzkPk",
    authDomain: "testaiklausai.firebaseapp.com",
    databaseURL: "https://testaiklausai.firebaseio.com",
    projectId: "testaiklausai",
    storageBucket: "testaiklausai.appspot.com",
    messagingSenderId: "968497496530"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) 
)(createStore);

// Add firebase to reducers 
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Crate initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
    rootReducer, 
    initialState, 
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;