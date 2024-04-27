// styles/LoginScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
 

    headerContainer: {
        paddingTop: Platform.OS === 'android' ? 20 : 0, // Additional padding for Android
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',  
      },
      headerTitle: {
        flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
      color: '#F7F6FA',
      marginLeft:50
      },
  
    
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#F7F6FA',
        marginHorizontal: 10,
        position: 'relative',
        borderRadius: 1,
    },

    text: {
        fontSize: 16,
        color: '#F7F6FA',
    },


    forgotPassword: {
        color: '#F7F6FA',
        marginTop: 15,
    },
    or: {
      color: '#F7F6FA',
      fontSize: 16,
      marginTop: 30,
      marginBottom: 30,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
},
socialButton: {
  backgroundColor: '#F7F6FA',
  padding: 5,
  borderRadius: 20,
  //width: '45%',
  justifyContent: 'center',
  alignItems: 'center',
    },

      
    containerline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    
    signupContainer: {
        position: 'absolute', // Posicionamiento absoluto para colocarlo en la parte inferior
        bottom: 20, // Espacio desde la parte inferior
        width: '100%', // El contenedor se extiende al ancho completo
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
    },
    signupText: {
      color: '#F7F6FA',
      fontSize: 16,
  },
  signupButton: {
      color: '#fb5b5a',
      fontWeight: 'bold',
      marginLeft: 5, // Espacio entre el texto "Don't have an account?" y "Sign up"
  },

});
