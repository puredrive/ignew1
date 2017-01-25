// @flow

import React from 'react'
import { ScrollView, View, Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CountdownActions from '../Redux/CountdownRedux'
import { Images, Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'
import moment from 'moment';


// Styles
import Styles from './Styles/CountdownFormStyle'

// I18n
import I18n from 'react-native-i18n'

class CountdownForm extends React.Component {

  handleChangeEventname = (text) => {
    this.setState({ eventname: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  constructor(props) {
    super(props)
    this.state = {
      eventname: '',
      events: [],
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  render() {
    const { eventname, password } = this.state
    const { fetching } = this.props;
    const editable = !fetching;
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly;
    return (
      <View style={Styles.form}>
        <View style={Styles.row}>
          <Text style={Styles.rowLabel}>{I18n.t('eventname')}</Text>
          <TextInput
            ref='eventname'
            style={textInputStyle}
            value={eventname}
            editable={editable}
            keyboardType='default'
            //returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.handleChangeEventname}
            underlineColorAndroid='transparent'
            // onSubmitEditing={() => this.refs.password.focus()}
            placeholder={I18n.t('eventname')} />
        </View>
        <View style={Styles.row}>
          <Text style={Styles.rowLabel}>{I18n.t('eventdate')}</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.eventdate}
            mode="date"
            placeholder={I18n.t('eventdate')}
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="9999-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(eventdate) => { this.setState({ eventdate }) } }
            />
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  console.log('== IMPORTANT ==');
  console.log(state);
  console.log('== IMPORTANT END ==');
  return {
    events: state.countdown.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptAddEvent: (eventname, eventdate) => {
      console.log('dispatching addEvent!');
      dispatch(CountdownActions.addEvent(eventname, eventdate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownForm)
