

import React, { useState, useContext, useRef,useEffect } from 'react';
import { PanResponder,Animated } from 'react-native';
import HomeAdmin from './homeScreenAdmin';
import HomeUser from './homeScreenUser';
import { ThemeContext } from "../../components/theme/themeManager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './homeScreenNo.styles';

const HomeScreenNo = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        menuPosition.setValue({ x: gesture.dx, y: gesture.dy });
      },
      
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > 50) {
          setMenuVisible(true);
        } else {
          setMenuVisible(false);
        }
        Animated.spring(menuPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

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
        <HomeAdmin navigation={navigation}/>
      </>
    ) : (
      <>
        <HomeUser navigation={navigation}/>
      </>
    )}
  </>
    
  );

};

export default HomeScreenNo;
