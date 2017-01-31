// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addEvent: ['eventname', 'eventdate'],
  editEvent: ['eventname', 'eventdate'],
  attemptSaveUpdatedEvent: ['id','eventname', 'eventdate'],
  resetEvents: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  events: []
}

/* ------------- Reducers ------------- */

//add current stated event to 'events' object
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

export const editEvent = (state = INITIAL_STATE, event) => {
  console.log('inside editEvent reducer');
  console.log(state);
  console.log('inside editEvent reducer, logging event');
  console.log(event);
  const {eventname, eventdate} = event;
  return {...state, eventname: eventname, eventdate:eventdate }
  //return {...state,event: {eventname,eventdate}}
}


export const attemptSaveUpdatedEvent = (state = INITIAL_STATE, event) => {
  console.log('inside attemptSaveUpdatedEvent reducer');
  console.log(state);
  console.log('inside attemptSaveUpdatedEvent reducer, logging event');
  console.log(event);
  const {eventname, eventdate, id} = event;
  state.events[id] = {eventname, eventdate};
  return {...state, events: [...state.events]}
    
  //return {...state,event: {eventname,eventdate}}
}

// we've successfully logged in
export const success = (state: Object, { username }: Object) =>
  state.merge({ fetching: false, error: null, username })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const resetEvents = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_EVENT]: addEvent,
  [Types.EDIT_EVENT]: editEvent,
  [Types.RESET_EVENTS]: resetEvents,
  [Types.ATTEMPT_SAVE_UPDATED_EVENT]: attemptSaveUpdatedEvent
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
