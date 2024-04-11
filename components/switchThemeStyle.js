import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const switchStyle = {
  backgroundColor: '#dfe3f5',
  borderRadius: 10,
  padding: 20,
  width:  width * 0.67,
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginLeft:-15,
  marginTop:160,
};

const switchDarkStyle = {
    ...switchStyle,
    backgroundColor: '#1e1e1f',
    color: 'blue',

  };

  const textStyle = {
    color: '#000',
    fontSize: 20,
    marginTop:10,
    marginLeft:10,
    marginRight:10

  };
  
  const textDarkStyle = {
    ...textStyle,
      color: '#fff' ,
    };
  
  const iconStyle = {
    color: '#F5BE2E',
    fontSize: 40,
    marginTop: 0,
  };
  
  const iconDarkStyle = {
    ...iconStyle,
    fontSize: 30,
    color: '#fff',
    marginTop: 7,
  };

export default StyleSheet.create({
  switchdark: switchDarkStyle,
  switchlight: switchStyle,
  textdark: textDarkStyle,
  textlight: textStyle,
  icondark: iconDarkStyle,
  iconlight: iconStyle,

  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }], 
  },
  trackColor: {
    true: 'white', 
    false: '#202124', 
  },
  thumbColor: '#F5BE2E', // Custom color for the thumb
});
