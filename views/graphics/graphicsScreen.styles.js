import { StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'react-native';


// Obtén las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');
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
    fontSize: 25,
    color: '#F7F6FA',
    marginLeft:70
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





  chartContainer: {
  
    padding:15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#202124',
    marginBottom:50,
    borderBottomWidth:50,
    borderRadius:30
  },
  chartStyle: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});