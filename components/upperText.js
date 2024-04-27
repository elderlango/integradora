import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const titleStyle = {
    ...globalStyles.defaultFont,
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    alignSelf: 'center', 
  }

  const titleDarkStyle = {
    ...titleStyle,
    color: '#F7F6FA',

  }
  const subtitleStyle = {
    ...globalStyles.defaultFont,
    fontSize: 20,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  }
  
  
export default StyleSheet.create({
    title: titleStyle,
    titleDark: titleDarkStyle,

  subtitle: subtitleStyle,
});

