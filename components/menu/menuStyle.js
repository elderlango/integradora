import { StyleSheet, Dimensions } from 'react-native';
// Calcular tamaños adaptativos basados en las dimensiones de la pantalla

const { width, height } = Dimensions.get('window');
const baseUnit = width / 375; // Suponiendo que 375 es el ancho base (iPhone X)

const adaptiveFontSize = (size) => Math.ceil(size * baseUnit);
const adaptiveHeight = (factor) => height * factor;
const adaptiveWidth = (factor) => width * factor;

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Color negro con opacidad del 50%
  width: '100%', // ancho del menú
  zIndex: 1001, 
}

const closeButtonStyle = {
  position: 'absolute',
  top: 0,
  right: 20,
  zIndex: 1001, 
}

const menuStyle = {
  position: 'absolute',
  left:0,
  top: 0,
  bottom: 0,
  backgroundColor: '#F7F6FA', 
  width: '70%',
  paddingTop: 55, // Espacio para evitar superposición con la barra de estado
  zIndex: 1000, // Asegurar que se sobreponga
  flexDirection: 'column', // Distribuir el contenido verticalmente
  
}

const menuDarkStyle = {
  ...menuStyle,
  backgroundColor: '#202124', // fondo blanco como en la imagen
}


const menuContentStyle = {
  paddingVertical: 30, // Espacio vertical entre elementos del menú
  top: 0,

}


const menuItemStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15, // Espaciado vertical para cada elemento del menú
  paddingHorizontal: 20, // Espaciado horizontal para íconos y texto
  fontSize: 18, // Tamaño de fuente aumentado para coincidir con el ejemplo
  fontWeight: '500',
  backgroundColor:'transparent',
}

const menuTextStyle = {
  fontSize: 25,
  fontWeight: 'bold', 
  marginLeft: 10,
  color: '#4B4455', 
}

const menuTextDarkStyle = {
  ...menuTextStyle,
  color: '#F7F6FA', 
}

const menuIconStyle = {
  fontSize: 25,
  marginLeft: 10,
  color: '#4B4455', 
}

const menuIconDarkStyle = {
  ...menuIconStyle,
  color: '#F7F6FA', 
}

/*const tryFreeButtonStyle = {
  alignItems: 'center',
  paddingVertical: 10,
  borderWidth: 2,
  borderColor: '#F7F6FA', 
  borderRadius: 20,
  backgroundColor: '#2A2344',
  marginVertical: 10, // Espacio vertical entre el botón y otros elementos
}

const tryFreeTextStyle = {
  textAlign: 'center',
  color: '#F7F6FA', 
  fontSize: 16,
  fontWeight: '500',
}*/

const activeIconStyle = {
  ...menuIconStyle,
  color: '#F7F6FA', 
}
const activeTextStyle = {
  ...menuTextStyle,
  color: '#F7F6FA', 
}

const activeMenuItemtyle = {
  ...menuItemStyle,
  backgroundColor: '#F5BE2E', 
}

export default StyleSheet.create({
  overlay: overlayStyle,
  closeButton: closeButtonStyle,
  menu: menuStyle,
  menuDark: menuDarkStyle,
  menuContent: menuContentStyle,
  menuItem: menuItemStyle,
  menuText: menuTextStyle,
  menuTextDark: menuTextDarkStyle,
  menuIcon: menuIconStyle,
  menuIconDark:menuIconDarkStyle,
  activeIcon: activeIconStyle,
  activeText: activeTextStyle,
  activeMenuItem: activeMenuItemtyle,
});
