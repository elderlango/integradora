import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const sesionExpiredStyle = {
  ...globalStyles.defaultFont,
  position: 'absolute', 
  top: 150, 
  left: 10, 
  marginTop: 15,
  color: '#F7F6FA',  
  backgroundColor:'#fb5b5a',  
  borderRadius:10,
  padding:20,
  fontSize: 20,
  }

const  sesionExpiredDarkStyle = {
    ...sesionExpiredStyle,
    color: '#000',  
  }

  
export default StyleSheet.create({
    sesionExpired: sesionExpiredStyle,
    sesionExpiredDark: sesionExpiredDarkStyle,
    buttonTextDemo: {
    color: '#F7F6FA', 
    fontSize: 30,
    fontWeight: 'bold',
  },
  
  registerButton: {
  borderColor: '#F7F6FA',
  paddingVertical: 20,
  paddingHorizontal: 30,
  borderRadius: 20,
  borderWidth: 5,
  marginLeft: 60,
  marginTop: 350,
  width:250
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F6FA',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
});

