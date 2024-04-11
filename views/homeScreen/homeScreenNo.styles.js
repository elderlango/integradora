import { StyleSheet, Dimensions } from 'react-native';
// Calcular tamaños adaptativos basados en las dimensiones de la pantalla

const { width, height } = Dimensions.get('window');
const baseUnit = width / 375; // Suponiendo que 375 es el ancho base (iPhone X)

const adaptiveFontSize = (size) => Math.ceil(size * baseUnit);
const adaptiveHeight = (factor) => height * factor;
const adaptiveWidth = (factor) => width * factor;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Color negro con opacidad del 50%
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    top: 15,
    backgroundColor: 'transparent', // Color de fondo para el encabezado
    width: width,
  },
  logo: {
    color: '#FFFFFF', // Blanco casi puro para el texto del logo
    fontWeight: 'bold',
    fontSize: adaptiveFontSize(24), // Tamaño de fuente adaptativo
    left: 20,

  },
  closeButton: {
    position: 'absolute',
    top: 5, // Asegúrate de que no se superponga con la barra de estado
    right: 16,
    zIndex: 1001, // Debe estar por encima del menú para ser accesible
  },
  menu: {
    flex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // fondo blanco como en la imagen
    width: '70%', // ancho del menú
    paddingTop: 55, // Espacio para evitar superposición con la barra de estado
    zIndex: 1000, // Asegurar que se sobreponga
    flexDirection: 'column', // Distribuir el contenido verticalmente
    justifyContent: 'flex-start', // Alinear el contenido en la parte superior
},
  
  scrollView: {
    flexGrow: 1, // Permite que el contenido crezca para ocupar el espacio, asegurándose de que el botón inferior esté visible.
  },
  menuContent: {
    paddingVertical: 30, // Espacio vertical entre elementos del menú
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Espaciado vertical para cada elemento del menú
    paddingHorizontal: 20, // Espaciado horizontal para íconos y texto
    fontSize: 18, // Tamaño de fuente aumentado para coincidir con el ejemplo
    fontWeight: '500',
  },
  menuText: {
    fontSize: 19,
    fontWeight: 'bold', // Puedes hacerlo más grueso si es necesario
    marginLeft: 15,
    color: '#000', // Color de texto para contraste con el fondo oscuro
  },
  
  tryFreeButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#F7F6FA', 
    borderRadius: 20,
    backgroundColor: '#2A2344',
    marginVertical: 10, // Espacio vertical entre el botón y otros elementos
},
  tryFreeText: {
    textAlign: 'center',
    color: '#F7F6FA', 
    fontSize: 16,
    fontWeight: '500',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: width - adaptiveWidth(0.1), // Margen horizontal basado en el porcentaje de la pantalla
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  

  buttonText: {
    color: '#FFFFFF', 
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonTextDemo: {
    color: 'gray', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  logInButton: {
    backgroundColor: '#625F68', 
    // backgroundColor: '#6A969D', 
    paddingVertical: adaptiveHeight(0.015),
    paddingHorizontal: adaptiveWidth(0.05),
    borderRadius: 20,
    marginRight: 10,
  },

  registerButton: {
    borderColor: '#625F68',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 5,
    marginLeft: 10,
  },

  featureCardsContainer: {
    //paddingVertical: 20,
    paddingBottom: 25,
    paddingHorizontal: 10,
    //width: width, 
  },

  featureCard: {
    width: adaptiveWidth(0.4), // 40% del ancho de pantalla
    height: adaptiveHeight(0.2), // 20% del alto de pantalla
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F7F6FA', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  featureCardDark: {
    width: adaptiveWidth(0.4), // 40% del ancho de pantalla
    height: adaptiveHeight(0.2), // 20% del alto de pantalla
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F7F6FA', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#202124', 
  },

  featureCardTitle: {
    textAlign: 'center',
    fontSize: adaptiveFontSize(18), // Tamaño de fuente adaptativo
    fontWeight: 'bold',
    color: '#000', // Color del título de las tarjetas de características
    marginTop: 8,
  },

  featureCardDarkTitle: {
    textAlign: 'center',
    fontSize: adaptiveFontSize(18), // Tamaño de fuente adaptativo
    fontWeight: 'bold',
    color: '#F7F6FA', // Color del título de las tarjetas de características
    marginTop: 8,
  },

  featureCardText: {
    fontSize: adaptiveFontSize(14),
    color: '#625F68', // Color del texto en las tarjetas de características
    textAlign: 'center',
  },

  featureCardDarkText: {
    fontSize: adaptiveFontSize(14),
    color: '#625F68', // Color del texto en las tarjetas de características
    textAlign: 'center',
  },

  brandsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow for wrapping
    justifyContent: 'flex-start', // Align items to the start to handle odd numbers of profiles
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10, // Add horizontal padding for spacing from the screen edges
    backgroundColor: 'rgba(0,0,0,.75)', 
    paddingTop: 1,
    margin: 15,
    borderRadius: 35,
  },
  titleText: {
    fontWeight: 'bold', // Make the font bold
    fontSize: 24, // Increase font size
    color: '#F7F6FA', // Set the text color
    width: '100%', // Ensure the title takes the full width
    textAlign: 'center', // Center the title text
    marginBottom: 20, // Add space below the title
  },
  profileItem: {
    alignItems: 'center', // Center the image and text vertically
    justifyContent: 'center', // Center the content horizontally
    width: '30%', // Adjust the width to slightly less than one-third
    marginVertical: 10, 
    marginHorizontal: '1.5%', // Add horizontal margin to create space between items  
  },  
  profileImage: {
    width: '100%', // The image will fill the width of profileItem
    aspectRatio: 1, // Maintain the square aspect ratio
    borderRadius: 83 / 2, // Adjust this value if needed to keep the image round
    height: '%25',
    alignSelf: 'center',  
  },
  profileText: {
    marginTop: 5, // Add space between the image and text
    fontSize: 15, // Set the font size for the text
    color: '#F7F6FA', // Set the text color
    // Add any additional styling you want for the text
  },

  featureIcon: {
    color: '#F7F6FA',
    width: 30,
    height: 30, // Púrpura vibrante para los iconos
  },
  featureText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#F7F6FA', // Azul profundo para el texto de las características
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: width,
    backgroundColor: '#000', // Puedes ajustar el color de fondo según la paleta
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fefefe', // Color del texto que contrasta con el fondo
    fontSize: adaptiveFontSize(14),
  },

  featureButton: {
    width: adaptiveWidth(0.3), // 40% del ancho de pantalla
    height: adaptiveHeight(0.15), // 20% del alto de pantalla
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5BE2E', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Añadir estilos para otros componentes...
});
