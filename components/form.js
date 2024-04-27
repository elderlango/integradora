import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const formContainerStyle = {
    alignItems: 'center',
    backgroundColor: '#F7F6FA',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9, // El formulario ocupa el 90% del ancho de la pantalla
    maxWidth: 500, // Max width for larger devices
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
  }

export default StyleSheet.create({
    formContainer: formContainerStyle,
});

