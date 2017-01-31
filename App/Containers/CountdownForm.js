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
    //this.setState({ eventname: text })
    this.props.attemptEditEvent(text, this.props.eventdate);
  }

  // handleChangePassword = (text) => {
  //   this.setState({ password: text })
  // }

  constructor(props) {
    super(props)
    console.log('At countdownForm constructor - props');
    console.log(props);
    console.log('At countdownForm constructor - state');
    console.log(this.state);

    // this.state = {
    //   events: [],
    //   visibleHeight: Metrics.screenHeight,
    //   topLogo: { width: Metrics.screenWidth }
    // }

    this.isAttempting = false
  }

  render() {
    const { eventname, eventdate } = this.props;
    console.log("CountdownForm Render() = ");
    console.log('State');
    console.log(this.state);
    console.log('Props');
    console.log(this.props);
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
            date={eventdate}
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
            onDateChange={(changedeventdate) => { this.props.attemptEditEvent(this.props.eventname, changedeventdate) } }
            />
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  console.log('== in CountdownForm mapStateToProps ==');
  console.log(state);
  return {
    eventname: state.countdown.eventname,
    eventdate: state.countdown.eventdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptEditEvent: (eventname, eventdate) => {
      console.log('dispatching editEvent in CountdownForm!');
      dispatch(CountdownActions.editEvent(eventname, eventdate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownForm)
