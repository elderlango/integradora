import React, { useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import BackButton from '../../components/backButtonc';
import { ThemeContext } from "../../components/theme/themeManager";
import sesionExpiredStyle from './sesionExpiredStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SesionExpired = ({ navigation }) => {   
  const { theme } = useContext(ThemeContext);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <ActivityIndicator size="large" color="#000"/>;
    }


  const dark ='../../assets/images/tile_background4.png';
  const light ='../../assets/images/tile_background9.png';

      return (
            <View style={{
              ...(sesionExpiredStyle.backgroundImage),
              ...(sesionExpiredStyle.container),
            }}>
              <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{
              ...(sesionExpiredStyle.backgroundImage),
              ...(sesionExpiredStyle.container),
            }}>  
                <BackButton navigation={navigation}/>
                <Text style={theme === 'light' ? sesionExpiredStyle.sesionExpired : sesionExpiredStyle.sesionExpiredDark}>
                    No se pudieron obtener los datos del usuario. Porfavor 
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}> Intenta nuevamente </Text> o 
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}> inicia sesion</Text> 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={sesionExpiredStyle.registerButton}>
              <Text style={sesionExpiredStyle.buttonTextDemo} >Inicia Sesión</Text>
            </TouchableOpacity>
            </ImageBackground>

            </View>
      );
    };

export default SesionExpired;