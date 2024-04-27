import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const backButtonStyle = {
    position: 'absolute', 
    top: 25, 
    left: 15, 
    marginTop: 15,
    marginLeft: 15,
    backgroundColor:'rgba(32, 33, 36, 1)',
    padding:5,
    borderRadius:10,
    marginBottom:15,
  }

const  navBackStyle = {
    fontSize: 30, 
    color: '#F7F6FA',  
  }

  const  navBackDarkStyle = {
    fontSize: 30, 
    color: '#000',  
  }

  const backButtonDarkStyle = {
    ...backButtonStyle,
    backgroundColor:'rgba(247, 246, 250, 1)',
  }
export default StyleSheet.create({
    backButton: backButtonStyle,
    backButtonDark: backButtonDarkStyle,
    navBack: navBackStyle,
    navBackDark: navBackDarkStyle,
});

