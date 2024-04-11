

import React, { useState, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, PanResponder,Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './homeScreenNo.styles';
import IconSocial from '../../components/iconSocialUs';
import upperText from '../../components/upperText';
import contentContainer from '../../components/contentContainer';
import Gon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../../components/menu/menu';
import { ThemeContext } from "../../components/theme/themeManager";
import { FontAwesome } from '@expo/vector-icons';

const HomeScreenNo = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
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

  return (
    <View style={styles.container} >
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
    
      <View style={styles.header} {...panResponder.panHandlers}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Gon name="menu" size={40} color="#F7F6FA"/>
        </TouchableOpacity>
        <Text style={styles.logo}>AirGuard</Text>
      </View>

        {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 
      
      {/* Profile, Graphic, */}
      {/*  Request(?), AdminDashboard(?) */}
  
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={theme === 'light' ? contentContainer.contentContainerHome : contentContainer.contentContainerHomeDark}>
          <Text style={theme === 'light' ? upperText.title : upperText.titleDark}>Una manera facil de mejorar tu entorno</Text>
          <Text style={upperText.subtitle}>Optimización del rendimiento energético garantizada.</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.logInButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Inicia Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
              <Text style={styles.buttonTextDemo} >Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.featureCardsContainer} >
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
               onPress={ () => {navigation.navigate('Profile')}}>
                <FontAwesome name="bar-chart" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
               onPress={ () => {navigation.navigate('Graphic')}}>
                <FontAwesome name="warning" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Graficas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...(styles.featureButton), backgroundColor:'#34373E' }}
              onPress={ () => {navigation.navigate('Cards')}}>
                <FontAwesome name="edit" size={24} color={theme === 'light' ? '#F5BE2E' : '#F5BE2E'} />
                <Text style={{...(styles.featureCardTitle), color:'#F5BE2E' }}>Estado y Avisos</Text>
              </TouchableOpacity>
            </ScrollView>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.featureCardsContainer}>
              <View style={theme === 'light' ? styles.featureCard : styles.featureCardDark}>
                <Gon name="high-quality" size={50} color={theme === 'light' ? '#000' : '#fff'} />
                <Text style={theme === 'light' ? styles.featureCardTitle : styles.featureCardDarkTitle}>Alta Calidad</Text>
                <Text style={theme === 'light' ? styles.featureCardText : styles.featureCardDarkText}>Controla y analiza tus datos.</Text>
              </View>
              <View style={theme === 'light' ? styles.featureCard : styles.featureCardDark}>
                <Icon name="cogs" size={24} color={theme === 'light' ? '#000' : '#fff'} />
                <Text style={theme === 'light' ? styles.featureCardTitle : styles.featureCardDarkTitle}>Producción Personalizada</Text>
                <Text style={theme === 'light' ? styles.featureCardText : styles.featureCardDarkText}>Ajusta y analiza tus datos.</Text>
              </View>
              <View style={theme === 'light' ? styles.featureCard : styles.featureCardDark}>
                <Icon name="tools" size={24} color={theme === 'light' ? '#000' : '#fff'} />
                <Text style={theme === 'light' ? styles.featureCardTitle : styles.featureCardDarkTitle}>Técnica Profesional</Text>
                <Text style={theme === 'light' ? styles.featureCardText : styles.featureCardDarkText}>Optimiza y analiza tus datos.</Text>
              </View>
              <View style={theme === 'light' ? styles.featureCard : styles.featureCardDark}>
                <Icon name="layer-group" size={24} color={theme === 'light' ? '#000' : '#fff'} />
                <Text style={theme === 'light' ? styles.featureCardTitle : styles.featureCardDarkTitle}>Variedad de Servicios</Text>
                <Text style={theme === 'light' ? styles.featureCardText : styles.featureCardDarkText}>Explora y analiza tus datos.</Text>
              </View>
            </ScrollView>

            

                  <IconSocial />

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AirGuard. Todos los derechos reservados.</Text>
        </View>
      
      </ScrollView>
    </View>
    </ImageBackground>
    </View>
    
  );

};

export default HomeScreenNo;
