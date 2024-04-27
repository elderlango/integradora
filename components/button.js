import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const buttonPrimaryStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width:  width * 0.8,
    backgroundColor: '#495168',
    borderRadius: 10,
    padding: 15,
    fontWeight: 'bold',
    marginVertical: 10,

    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 3,  
  }

 const datePickerStyle = {
    ...buttonPrimaryStyle,
    width:  width * 0.7,
    backgroundColor: '#EE8924', 
  }

  const buttonTextStyle = {
    ...globalStyles.defaultFont,
    fontSize: 18,
    textAlign: 'center',
    color: '#F7F6FA',
    fontWeight: 'bold',
  }

  const checkboxContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    transform: [{ scaleX: 2 }, { scaleY: 2}]
  }

  const editProfileStyle = {
    ...buttonPrimaryStyle,
    width:  width * 0.90,
    marginBottom:20,
    marginLeft:7,
    backgroundColor: 'transparent', 
    borderColor: '#EE8924', 
    borderWidth:1.5,
    padding: 20,
    borderRadius:15,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,  
  }

  const editProfileTextStyle = {
    ...buttonTextStyle,
    color: '#EE8924',
  }
  
  const checkboxAdminStyle = {
    marginLeft:15,

  }

export default StyleSheet.create({
    buttonPrimary: buttonPrimaryStyle,
    datePicker: datePickerStyle,
    buttonText: buttonTextStyle,
    checkboxContainer: checkboxContainerStyle,
    editProfile:editProfileStyle,
    editProfileText:editProfileTextStyle,
    checkboxAdmin:checkboxAdminStyle
});

