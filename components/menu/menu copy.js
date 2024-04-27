import React, { useState, useContext ,useEffect} from 'react';
import { Alert, PanResponder,Animated  } from 'react-native';
import MenuUser from './menuUser';
import MenuAdmin from './menuAdmin';

import { ThemeContext } from "../theme/themeManager";
import { useNavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation, style, onClose }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState('');
  const navigationState = useNavigationState(state => state);
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {userData && userData.role === 'admin' ? (
        <>
      <MenuAdmin navigation={navigation} />
        </>
      ) : (
        <>
      <MenuUser navigation={navigation} />
        </>
      )}
    </>
  );
};

export default Menu;
