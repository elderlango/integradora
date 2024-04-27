import { StyleSheet, Dimensions,Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define algunos tamaños base que puedes ajustar según tus necesidades
const basePadding = width * 0.04;
const headerHeight = height * 0.07;
const fontSizeResponsive = width * 0.045; // Aproximadamente 20 para width de 360
const adaptiveWidth = (factor) => width * factor;
const adaptiveHeight = (factor) => height * factor;


export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F6FA',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },

    safeArea: {
      flex: 1,
      backgroundColor: '#F7F6FA', // Un fondo claro para la aplicación
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





    
    categoriesContainer: {
      flexDirection: 'row',
      paddingBottom: 100,
      paddingHorizontal: 10,
    },
    categoryButton: {
      width: adaptiveWidth(0.35), // 40% del ancho de pantalla
      height: adaptiveHeight(0.17), // 20% del alto de pantalla
      margin: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#2A282F', 
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth:20,
      borderBottomColor:'transparent'
    },

    categoryButtonSelected: {
      backgroundColor: '#fff', 
    },

    categoryIcon: {
      marginTop:10,
      marginLeft:0,
      shadowOffset: {
        width: 1,
        height: 26,
      },
      shadowOpacity: 1.0,
      shadowRadius: 32.00, 
      elevation: 48,
    },

    categoryIconSelected: {
      shadowColor:'#F7F6FA',
    },

    categoryButtonText: {
      color: '#A8A6AC',
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom:5,
    },

    categoryButtonTextSelected: {
      color: '#F7F6FA',
    },

/*
    'Inter-Medium'
    'Inter-SemiBold'
    'Inter-Regular'
*/

    cardContainer: {
      borderRadius: 10, 
      padding: 15, 
      marginVertical: 10,
      marginHorizontal: 12,
      borderWidth:0,
      borderLeftWidth:40,
      marginBottom:10
    },
    
    cardTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18, // Hacer el título más grande para destacar
      color: '#2A282F', // Color oscuro para mayor contraste
      marginBottom: 5,
    },
    
    cardValue: {
      fontSize: 16,
      color: '#A8A6AC', // Color más suave para el cuerpo del texto
      marginBottom: 10, // Más espacio antes del timestamp
      fontFamily: 'Inter-Regular',
    },
    
    cardTimestamp: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: '#F7F6FA', 
      marginBottom: 10, 
      backgroundColor: '#2A282F', 
      padding:7,
      borderRadius:4,
      paddingHorizontal:15
    },
    
    cardActionButton: {
      backgroundColor: '#D9514C',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignSelf: 'flex-start', 
      marginTop: 10, 
    },
    
    cardActionButtonText: {
      fontFamily: 'Inter-SemiBold',
      color: '#F7F6FA',
      fontSize: 16, 
    },
  });
