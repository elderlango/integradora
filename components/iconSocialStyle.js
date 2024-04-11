import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

  const boxStyle = {
    height: 60,
    width: width * 0.9, 
    marginBottom: 100,
  }

  const groupStyle = {
    height: 60,
    position: "fixed",
    top: 0,
    left: 0,
    width: 401,
  }
  
  const facebookStyle = {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 65,
    position: "absolute",
    left: 260,
    width: 90,
  }

  const appleStyle = {
    ...facebookStyle,
    left: 130,
  }

  const googleStyle = {
    ...facebookStyle,
    left: 0,
  }

  const imgStyle = {
    height: 33,
    position: "absolute",
    top: 16,
    left: 31,
    width: 33,
  }

export default StyleSheet.create({
  box: boxStyle,
  group: groupStyle,
  facebook: facebookStyle,
  img: imgStyle,
  apple: appleStyle,
  google: googleStyle,

});