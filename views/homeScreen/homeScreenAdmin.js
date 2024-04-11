

import React, { useState, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, PanResponder,Animated } from 'react-native';
import styles from './homeScreenNo.styles';
import contentContainer from '../../components/contentContainer';
import Gon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../../components/menu/menu';
import { ThemeContext } from "../../components/theme/themeManager";
import { FontAwesome } from '@expo/vector-icons';
import upperText from '../../components/upperText';

const HomeScreenAdmin = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const menuPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        menuPosition.setValue({ x: gesture.dx, y: 0 });
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

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
    
      <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Gon name="menu" size={40} color="#F7F6FA"/>
        </TouchableOpacity>
        <Text style={styles.logo}>AirGuard</Text>
      </View>

      {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 
      
        <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={theme === 'light' ? contentContainer.contentContainerHome : contentContainer.contentContainerHomeDark}>
          <Text style={theme === 'light' ? upperText.title : upperText.titleDark}>Admin</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.logInButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Inicia Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
              <Text style={styles.buttonTextDemo} >Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.featureCardsContainer}>
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
               onPress={ () => {navigation.navigate('Graphic')}}>
                <FontAwesome name="bar-chart" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
               onPress={ () => {navigation.navigate('Cards')}}>
                <FontAwesome name="warning" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Graficas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
              onPress={ () => {navigation.navigate('EditProfile')}}>
                <FontAwesome name="edit" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Estado y Avisos</Text>
              </TouchableOpacity>
            </ScrollView>
            

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AirGuard. Todos los derechos reservados.</Text>
        </View>
      
      </ScrollView>
    </View>
    </ImageBackground>
    </View>
    
  );

};

export default HomeScreenAdmin;
