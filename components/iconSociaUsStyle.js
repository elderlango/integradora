import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

  const facebookStyle = {
    backgroundColor: "transparent",
    borderRadius: 90,
    borderColor: 'gray',
    //borderColor: '#425376',
    borderWidth:3,
    height: 60,
    width: 60,
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  }

  const grupoStyle = {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: 'space-around',
    width: '100%',
  }

  const imgStyle = {
    position: "relative",
    alignSelf: 'center', 
    top: 9,
    color:'#F7F6FA',
    fontSize: 35,
  }

export default StyleSheet.create({
  facebook: facebookStyle,
  img: imgStyle,
  grupo: grupoStyle,
});