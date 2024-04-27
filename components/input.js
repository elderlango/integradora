import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const inputStyle = {
  ...globalStyles.defaultFont,
  backgroundColor: '#dfe3f5',
  borderRadius: 10,
  color: '#616161',
  fontSize: 16,
  fontWeight: '500',
  letterSpacing: 0,
  lineHeight: 1,
  marginBottom: 10,
  paddingVertical: 20,
  paddingHorizontal: 20,
  position: 'relative',
  width:  width * 0.8,
  borderBottomWidth: 10,  
  borderBottomColor: 'transparent', 
};

const iconInputStyle = {
  position: 'absolute',
  right: 0,
  top:35,
  padding:20,
  zIndex: 1000, 
}

const checkBoxInputStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#dfe3f5',
  borderRadius: 10,
  margin: 10,
  padding: 10,
  zIndex: 1000, 

}

const errorInputStyle = {
  borderColor: '#f23f3f',
  borderWidth: 2,
  borderBottomWidth: 10,
}

const errorTextStyle={
  fontSize: 14,
  color: '#fb5b5a',
  marginBottom: 10,
  textAlign: 'center',
  alignSelf: 'center', 
}

const correctoInputStyle = {
  ...inputStyle, 
  borderBottomColor: '#6a9d82', 
}

const inputActiveStyle={
  ...inputStyle, 
  borderBottomColor: '#24A6E4', 
}

const fieldAboveStyle = {
  fontFamily: 'Poppins-SemiBold',
  fontSize: 18,
 // color: '#888888',
  color: '#262422',
  textAlign: 'left',
  marginLeft: 10,
  marginBottom: 5,
}

const fieldAboveEditStyle = {
  ...fieldAboveStyle,
  fontFamily: 'Gilroy-SemiBold',
  marginBottom: 10,
}

const fieldAboveEditDarkStyle = {
  ...fieldAboveEditStyle,
  color: '#F7F6FA',
}


const fieldAboveDarkStyle = {
  ...fieldAboveStyle,
  color: '#F7F6FA',
}

const inputEditStyle = {
  ...globalStyles.defaultFont,
  backgroundColor: 'transparent',
  borderRadius: 20,
  fontSize: 16,
  letterSpacing: 0,
  marginBottom: 30,
  paddingVertical: 20,
  paddingHorizontal: 20,
  marginLeft:7,
  position: 'relative',
  width:  width * .90,
  borderWidth: 1.3,  
  borderColor: '#f23f3f', 
  
};

const inputEditCorrectoStyle = {
  ...inputEditStyle,
  borderColor: '#ABABAB', 
};

const inputEditActiveStyle = {
  ...inputEditStyle,
  borderColor: '#24A6E4', 
};

const errorInputEditStyle = {
  ...inputEditStyle,
  borderColor: '#f23f3f',
  borderBottomWidth:3,
  borderLeftWidth:3,
  borderTopWidth:3,
  borderRightWidth:3,
}

const iconInputEditStyle = {
  position: 'absolute',
  left: 25,
  top:17
}

const inputEditInsideStyle = {
  ...globalStyles.defaultFont,
  fontSize: 16,
marginLeft:50
};

const errorEditTextStyle={
  ...errorTextStyle,
  marginTop: -10,
}

export default StyleSheet.create({
  input: inputStyle,
  errorText: errorTextStyle,
  errorInput: errorInputStyle,
  inputActive: inputActiveStyle,
  correctoInput: correctoInputStyle,
  iconInput: iconInputStyle,
  fieldAbove: fieldAboveStyle,
  fieldAboveDark: fieldAboveDarkStyle,
  checkBoxInput: checkBoxInputStyle,
  inputEdit: inputEditStyle,
  inputEditCorrecto: inputEditCorrectoStyle,
  inputEditActive : inputEditActiveStyle,
  errorInputEdit : errorInputEditStyle,
  iconInputEdit : iconInputEditStyle,
  inputEditInside: inputEditInsideStyle,
  errorEditText:errorEditTextStyle,
  fieldAboveEdit:fieldAboveEditStyle,
  fieldAboveEditDark:fieldAboveEditDarkStyle,
});
