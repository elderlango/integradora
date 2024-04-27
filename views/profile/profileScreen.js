import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert, ImageBackground, PanResponder,Animated } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../components/backButtonc';
import styles from './profileScreen.styles';
import SesionExpired from '../SesionExpired/sesionExpired';
import { ThemeContext } from "../../components/theme/themeManager";
import { Avatar } from 'react-native-paper';
import Menu from '../../components/menu/menu';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

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
  
        const [userData, setUserData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [menuVisible, setMenuVisible] = useState(false);

        useEffect(() => {
            const fetchProfileData = async () => {
                const userToken = await AsyncStorage.getItem('userToken');
                const userId = await AsyncStorage.getItem('userId');
                if (!userToken || !userId) {
                  Alert.alert("Error", "No se encontró el token de autenticación o el ID del usuario.");
                  setLoading(false);
                  return;
              }
        
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
            } catch (error) {
                Alert.alert("Error", error.message || "Ocurrió un error inesperado.");
            } finally {
                setLoading(false);
            }
        };

            fetchProfileData();
        }, []);

        if (loading) {
            return <ActivityIndicator size="large" color="#fff"/>;
        }

        if (!userData) {
            return <SesionExpired navigation={navigation}/> // Manejo de estado sin datos
        }

    const dark ='../../assets/images/tile_background4.png';
    const light ='../../assets/images/tile_background9.png';

  console.log(userData)
  

    return (
        <SafeAreaView style={theme === 'light' ? styles.container : styles.containerDark}>
          <ScrollView>
          <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{...(styles.backgroundImage), ...(styles.container),}}>  

            <View style={styles.headerContainer} {...panResponder.panHandlers}>
              <Text style={theme === 'light' ? styles.headerdarkTitle : styles.headerdarkTitle}>Perfil</Text>
              <BackButton navigation={navigation}/>
            </View>
            {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 

            <View style={styles.profileContainer}>
              <View style={styles.avatarImage}>
                <Avatar.Image size={130} source={require('../../assets/images/yo.jpg')} style={styles.avatar} />
                {/* <Image source={{ uri: profileImage }} style={styles.profilePic} /> require('../../assets/images/yo.jpg' )*/ }
              </View> 
              <Text style={styles.profileName}>{userData.name}</Text>
              <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Graphic')}>
                <FontAwesome name="plus" size={14} color="#F7F6FA" />
                <Text style={styles.followButtonText}>Añadir Dispositivo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{userData.role}</Text>
                <Text style={styles.statLabel}>Rol</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{userData.firstName} {userData.lastName}</Text>
                <Text style={styles.statLabel}>Usuario</Text>
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>Monitores #: {userData.sentMonitoringRequests.length}</Text>
              <Text style={styles.balanceOrders}>Pendientes: {userData.sentMonitoringRequests.filter(request => request.status === 'pending').length}</Text>
            </View>

            <View style={styles.menuContainer}>
              <MenuItem icon="bar-chart"text="Graficas" disabled={false} backgroundColor='#F7F6FA' onPress={() => navigation.navigate('Graphic')} />
              <MenuItem icon="cogs"text="Ajustar" disabled={true}  backgroundColor='#707070'onPress={() => navigation.navigate('Dashboard')} />
              <MenuItem icon="warning" text="Estado y Avisos" disabled={false} backgroundColor='#F7F6FA' onPress={() => navigation.navigate('Cards')} />
              <MenuItem icon="edit" text="Editar Perfil" disabled={false}  backgroundColor='#F7F6FA' onPress={() => navigation.navigate('EditProfile')} />
              <MenuItem icon="desktop" text="Gestionar monitores" disabled={true} backgroundColor='#707070'onPress={() => navigation.navigate('AdminDashboard')} />
              <MenuItem icon="envelope" text="Solicitudes" disabled={true} backgroundColor='#707070' onPress={() => navigation.navigate('Request')} />
            </View>

            <TouchableOpacity style={styles.logoutContainer} onPress={async () => {
                await AsyncStorage.removeItem('userToken'); navigation.navigate('HomeStack');}}
            >
              <MaterialIcons name="logout" size={24} color="#fb5b5a" />
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>

            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      );
    };
   
    const MenuItem = ({ icon, text, onPress,disabled,backgroundColor }) => (
      <TouchableOpacity style={[styles.menuItem, { backgroundColor }]} onPress={onPress} disabled={disabled}>
        <FontAwesome name={icon} size={24} color="#1c1b1b" />
        <Text style={styles.menuText}>{text}</Text>
      </TouchableOpacity>
    );    

export default ProfileScreen;