import React, { useState, useContext ,useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuStyle from './menuStyle';
import Gon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../theme/themeManager";
import { useNavigationState } from '@react-navigation/native';
import ThemeToggle from "../switchTheme";

const Menu = ({ navigation, style, onClose  }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState('');
  const navigationState = useNavigationState(state => state);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const currentRoute = navigationState.routes[navigationState.index];
    setActiveScreen(currentRoute.name);
  }, [navigationState]);

  return (
      <View style={MenuStyle.overlay}  onPressIn={() => setMenuVisible(!menuVisible)}>
        <View style={theme === 'light' ? MenuStyle.menu : MenuStyle.menuDark}>
          <View style={MenuStyle.menuHeader}>
            <TouchableOpacity style={MenuStyle.closeButton} onPress={() => { setMenuVisible(false); onClose && onClose(false); }}>
              <Gon name="menu" size={40} color="#F5BE2E" />
            </TouchableOpacity>
          </View>
          
        <ScrollView contentContainerStyle={MenuStyle.menuContent}>
          <View style={MenuStyle.menuContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('HomeStack'); setActiveScreen('HomeStack'); }} 
            style={activeScreen === 'HomeStack' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="home" style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Login'); setActiveScreen('Login'); }} 
            style={activeScreen === 'Login' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="user-circle" style={{
                ...(activeScreen === 'Login' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'Login' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Inicio de Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Register'); setActiveScreen('Register'); }} 
            style={activeScreen === 'Register' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="envelope-open-text" style={{
                ...(activeScreen === 'Register' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'Register' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Registro</Text>
            </TouchableOpacity>

        {/*<TouchableOpacity onPress={() => { navigation.navigate('Register'); setActiveScreen('Register'); }} style={MenuStyle.menuItem}>
              <Icon name="cogs" style={activeScreen === 'Register' ? MenuStyle.activeIcon : MenuStyle.menuText} />
              <Text style={activeScreen === 'Register' ? MenuStyle.activeText : MenuStyle.menuText}>Opciones</Text>
            </TouchableOpacity>*/}

        <TouchableOpacity onPress={() => { navigation.navigate('Nosotros'); setActiveScreen('Nosotros'); }} 
        style={activeScreen === 'Nosotros' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Gon name="people" 
              style={{
                ...(activeScreen === 'Nosotros' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'Nosotros' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Nosotros</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Profile'); setActiveScreen('Profile'); }} 
        style={activeScreen === 'Profile' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="user-circle" style={{
                ...(activeScreen === 'Profile' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'Profile' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Graphic'); setActiveScreen('Cards'); }} 
        style={activeScreen === 'Cards' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="hotel" style={{
                ...(activeScreen === 'Cards' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'Cards' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>Graphic</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ MenuStyle.menuItem}>
              <ThemeToggle />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>

        </View>
  );
};

export default Menu;
