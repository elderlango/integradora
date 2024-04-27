import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');


const contentContainerStyle = {
    marginTop:50,
    marginBottom:50,
    backgroundColor: '#F7F6FA',
    borderRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width:  width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
  }
  
  const contentContainerDarkStyle = {
 ...contentContainerStyle,
    backgroundColor: '#202124',
    // backgroundColor: '#121212',
  }

  const contentContainerRegisterStyle = {
    ...contentContainerStyle,
    marginTop:30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width:  width * 1,
    marginBottom:-20,
  }

  const contentContainerHomeStyle = {
    ...contentContainerStyle,
    marginTop:30,
  }

  const contentContainerHomeDarkStyle = {
    ...contentContainerHomeStyle,
    backgroundColor: '#202124',
  }

  const contentContainerRegisterDarkStyle = {
    ...contentContainerRegisterStyle,
    backgroundColor: '#202124',
  }


export default StyleSheet.create({
    contentContainer: contentContainerStyle,
    contentContainerDark: contentContainerDarkStyle,
    contentContainerRegister: contentContainerRegisterStyle,
    contentContainerRegisterDark: contentContainerRegisterDarkStyle,
    contentContainerHome :contentContainerHomeStyle,
    contentContainerHomeDark :contentContainerHomeDarkStyle,

});

