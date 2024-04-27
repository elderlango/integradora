import { StyleSheet, Dimensions } from 'react-native';
// Calcular tamaños adaptativos basados en las dimensiones de la pantalla

const { width, height } = Dimensions.get('window');
const baseUnit = width / 375; // Suponiendo que 375 es el ancho base (iPhone X)

const adaptiveFontSize = (size) => Math.ceil(size * baseUnit);
const adaptiveHeight = (factor) => height * factor;
const adaptiveWidth = (factor) => width * factor;

const brandsSectionStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap', // Allow for wrapping
  justifyContent: 'flex-start', // Align items to the start to handle odd numbers of profiles
  alignItems: 'center',
  paddingVertical: 30,
  paddingHorizontal: 20, // Add horizontal padding for spacing from the screen edges
  paddingTop: 1,
  margin: 15,
  borderRadius: 35,
  backgroundColor: '#F7F6FA',
}

const brandsSectionDarkStyle = {
  ...brandsSectionStyle,
     backgroundColor: '#202124',
   }

const titleTextStyle= {
    fontWeight: 'bold', 
    fontSize: 24, 
    color: '#000', 
    width: '100%', 
    textAlign: 'center', 
    marginBottom: 20, 
  }

  const titleTextDarkStyle= {
    ...titleTextStyle,
    color: '#FFFFFF', 
  }
  
  const profileTextStyle ={
    marginTop: 5,
    fontSize: 15, 
    color: '#000', 
  }
  
  const profileTextDarkStyle= {
    ...profileTextStyle,
    color: '#FFFFFF', 
  }
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    top: 15,
    backgroundColor: 'transparent', 
    width: width,
  },
  logo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: adaptiveFontSize(24), // Tamaño de fuente adaptativo
    left: 20,
  },


  brandsSection:brandsSectionStyle,
  brandsSectionDark:brandsSectionDarkStyle,
  titleText:titleTextStyle,
  titleTextDark:titleTextDarkStyle,
  profileText:profileTextDarkStyle,
  profileTextDark:profileTextDarkStyle,

  profileItem: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '30%',
    marginVertical: 10, 
    marginHorizontal: '1.5%',
  },  
  profileImage: {
    width: '100%', // The image will fill the width of profileItem
    aspectRatio: 1, // Maintain the square aspect ratio
    borderRadius: 83 / 2, // Adjust this value if needed to keep the image round
    height: '%25',
    alignSelf: 'center',  
  },
  profileText: {
    marginTop: 5,
    fontSize: 15, 
    color: '#000', 
  },

  footer: {
    marginTop:95,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: width,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fefefe', 
    fontSize: adaptiveFontSize(14),
  },
});
