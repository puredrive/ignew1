// @flow

import React from 'react'
import { ScrollView, View, Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CountdownForm from './CountdownForm'
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

class CountdownEdit extends React.Component {

  handleChangeEventname = (text) => {
    this.setState({ eventname: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handlePressLogin = () => {
    const {eventname, eventdate} = this.state;
    console.log('in handlepresslogin');
    console.log(eventname);
    console.log(eventdate);
    var newEventObj = { eventname, eventdate: moment(eventdate) };
    console.log(newEventObj);
    //use action to send data to be updated into list and update asyncstorage
    this.props.attemptAddEvent(eventname, eventdate);
    NavigationActions.pop();
  }

  constructor(props) {
    super(props)
    console.log("In CountdownEdit!");
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
      <ScrollView style={Styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
          <CountdownForm/>

              <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('update')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  console.log('== IMPORTANT in countdowncreate ==');
  console.log(state.countdown);
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

export default connect(mapStateToProps, mapDispatchToProps)(CountdownEdit)
