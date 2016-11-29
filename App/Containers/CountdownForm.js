// @flow

import React from 'react'
import { ScrollView, View, Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'


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

  handlePressLogin = () => {
    const {eventname, date} = this.state;
    console.log('in handlepresslogin');
    console.log(eventname);
    console.log(date);
    var newEventObj = {eventname, date};
    console.log(newEventObj);
//use action to send data to be updated into list and update asyncstorage
  }

  constructor(props) {
    super(props)
    this.state = {
      eventname: '',
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
                date={this.state.date}
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
                onDateChange={(date) => { this.setState({ date: date }) } }
                />
            </View>

            {/*  <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                placeholder={I18n.t('password')} />
            </View>*/}

            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownForm)
