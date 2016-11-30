// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addEvent: ['eventname', 'eventdate']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  events: []
}

/* ------------- Reducers ------------- */


export const addEvent = (state = INITIAL_STATE, event) => {
  console.log('inside AddEvent reducer');
  console.log(state);
  console.log('inside AddEvent reducer, logging event');
  console.log(event);
  const {eventname, eventdate} = event;
  var toAdd = { eventname, eventdate };
  console.log(toAdd);
  return {...state, events: [...state.events, toAdd] }
}


// we've successfully logged in
export const success = (state: Object, { username }: Object) =>
  state.merge({ fetching: false, error: null, username })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_EVENT]: addEvent
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
