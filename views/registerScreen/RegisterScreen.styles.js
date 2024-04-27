// styles/SignUpScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../../styles/globalStyles'; // Asegúrate de que la ruta es correcta


const { width, height } = Dimensions.get('window');


// styles/SignUpScreenStyles.js
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:  width * 1,

},

headerContainer: {
  paddingTop: Platform.OS === 'android' ? 20 : 0, // Additional padding for Android
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom:20,
},
headerTitle: {
  flex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 30,
  color: '#F7F6FA',
  marginLeft:50
},


backgroundImage: {
  flex: 1,
  width: null,
  height: null,
},

contentContainer: {
  marginTop:90,
  marginBottom:40,
  backgroundColor: '#F7F6FA',
  borderRadius: 25,
  paddingVertical: 40,
  paddingHorizontal: 20,
  width:  width * 0.9,
  alignItems: 'center',
},



     /* imageContainer: {
        ...globalStyles.defaultFont,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
        position: 'relative', // Agrega esto para permitir el posicionamiento absoluto
    },*/
    

      
  

  /*header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },*/

  /*checkboxLabel: {
    marginLeft: 8,
  },*/

  
      /*
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },*/

    /*
    #D8CCB2
    #CCBD9E
    #495168
    #2A2344
    #260729
*/

    /*
    cancelButton: {
      borderWidth: 3,
      borderColor: 'rgba(24,171,234,0.8)',
      padding: 15,
      borderRadius: 20,
      marginHorizontal: 15,
    },

    confirmButton: {
      backgroundColor: 'rgba(24,171,234,0.8)',
      padding: 15,
      borderRadius: 20,
      marginHorizontal: 15,
    },
    */

    /*ralewayItalic1: {
      fontFamily: 'Gilroy-Light',
      fontSize: 40,
      color: '#F7F6FA',
    },*/
  });
  

  