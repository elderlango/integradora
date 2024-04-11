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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const currentRoute = navigationState.routes[navigationState.index];
    setActiveScreen(currentRoute.name);
  }, [navigationState]);



    useEffect(() => {
        const fetchProfileData = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');
  
          const endpoint = `http://${global.ipDireccion}:3000/api/admins/${userId}`;

          try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`, 
                },
            });

            if (response.ok) {
                const json = await response.json();
                setUserData(json);
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Error al obtener datos del perfil.");
            }

            if (userData) {
              navigation.navigate('Login');
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

        fetchProfileData();
    }, [navigation]);

  return (
    <>
    {userData.role === 'admin' ? (
      <>
        <TouchableOpacity onPress={() => { navigation.navigate('HomeStack'); setActiveScreen('HomeStack'); }} 
            style={activeScreen === 'HomeStack' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="home" style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>admin</Text>
            </TouchableOpacity>
      </>
    ) : (
      <>
        {/* Render only the "Inicio de Sesión" menu item for user */}
        <TouchableOpacity onPress={() => { navigation.navigate('HomeStack'); setActiveScreen('HomeStack'); }} 
            style={activeScreen === 'HomeStack' ? MenuStyle.activeMenuItem: MenuStyle.menuItem}>
              <Icon name="home" style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeIcon : MenuStyle.menuIcon),
                ...(theme === 'light' ? MenuStyle.menuIcon : MenuStyle.menuIconDark),
              }}/>
              <Text style={{
                ...(activeScreen === 'HomeStack' ? MenuStyle.activeText : MenuStyle.menuText),
                ...(theme === 'light' ? MenuStyle.menuText : MenuStyle.menuTextDark),
              }}>usuario</Text>
            </TouchableOpacity>
      </>
    )}
    </>
  );
};

export default Menu;
