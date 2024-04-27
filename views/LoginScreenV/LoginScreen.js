// views/LoginScreen.js
import React, { useState,useContext,useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform,ImageBackground,PanResponder,Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../LoginScreenV/LoginScreen.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/input';
import Button from '../../components/button';
import UpperText from '../../components/upperText';
import ScrollViewStyle from '../../components/scrollView';
import BackButton from '../../components/backButtonc';
import ContentContainer from '../../components/contentContainer';
import IconSocial from '../../components/iconSocial';
import { ThemeContext } from "../../components/theme/themeManager";
import Menu from '../../components/menu/menu';

const LoginScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === 'light' ? ['#8EC5FC', '#495168'] : ['#3c3f48', '#061235'];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const togglePasswordVisibility = () => setPasswordVisibility(!passwordVisibility);
    const [isSubmitting, setIsSubmitting] = useState(false);

      //para el active css de los inputs
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFocus = (index) => {
    setActiveIndex(index);
  };

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
      };
      
      const isValidPassword = (password) => {
        // Ejemplo: Validar que la contraseña tenga al menos 8 caracteres
        return password.length >= 8;
      };

    const handleLogin = async () => {
        const endpoint = `http://${global.ipDireccion}:3000/api/login`; // Endpoint unificado para login
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
  
            if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
                const json = await response.json();
                console.log('Login exitoso:', json);
                await AsyncStorage.setItem('userToken', json.token);
                await AsyncStorage.setItem('userRole', json.role);
                await AsyncStorage.setItem('userId', json.userId.toString()); // Asegúrate de que es una cadena
                
                // Navega a la pantalla correspondiente basada en el rol
                if (json.role === 'admin') {
                    navigation.navigate('Profile'); // Asume que tienes una pantalla de dashboard para admin
                } else {
                    navigation.navigate('UserDashboard'); // Asume que tienes una pantalla para usuarios
                }
            } else {
                const errorMessage = await response.text();
                Alert.alert('Error', errorMessage || 'Ocurrió un error al intentar iniciar sesión');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo completar la solicitud. Por favor, verifica tu conexión y vuelve a intentarlo.');
        }

        if (!isValidEmail(email) || !isValidPassword(password)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico y contraseña válidos.');
            return;
          }
    };

    const dark ='../../assets/images/tile_background4.png';
    const light ='../../assets/images/tile_background9.png';

    const [menuVisible, setMenuVisible] = useState(false);
  
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
                  <ScrollView contentContainerStyle={ScrollViewStyle.scrollView}  stickyHeaderIndices={[1]}  >
                  <View style={styles.container}>
        <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{ ...(styles.backgroundImage),...(styles.container),}}>          
          <View style={styles.headerContainer} {...panResponder.panHandlers}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Login</Text>
            </View>
            <BackButton navigation={navigation}/>
          </View>
            {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 

            <View style={theme === 'light' ? ContentContainer.contentContainer : ContentContainer.contentContainerDark}>
              <Text style={theme === 'light' ? UpperText.title : UpperText.titleDark}>!Bienvenido de vuelta!</Text>
              <Text style={UpperText.subtitle}>Entre para acceder a su cuenta</Text>

              <View>
                  <Text  style={theme === 'light' ? Input.fieldAbove : Input.fieldAboveDark}>Email</Text>
                  <TextInput
                    style={{
                      ...(activeIndex === 1 ? Input.inputActive : Input.input),
                    }}
                    onFocus={() => handleFocus(1)}
                    //value="nuevoemail@admin.com"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
              </View>

                    <View>
                <Text  style={theme === 'light' ? Input.fieldAbove : Input.fieldAboveDark}>Contraseña</Text>
                <TextInput
                  style={{
                    ...(activeIndex === 2 ? Input.inputActive : Input.input),
                  }}
                  onFocus={() => handleFocus(2)}
                  value={password}
                //  value="NuevaContraseña1234"
                  onChangeText={setPassword}
                  placeholder="Contraseña"
                  secureTextEntry={passwordVisibility}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={{
                      ...(Input.iconInput),
                      top:40
                    }}
                  >
                      <Icon name={passwordVisibility ? "visibility-off" : "visibility"} size={30} color="#6e6e6e" />
                  </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={Button.buttonPrimary} onPress={handleLogin} disabled={isSubmitting}>
                        <Text style={Button.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    {isSubmitting && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text>Cargando...</Text>
                    </View>
                    )}
                    
                    <Text style={styles.signupButton}>¿Olvidaste tu contraseña?</Text>
                </View>

                <View style={styles.containerline}>
                    <View style={styles.line} />
                    <Text style={styles.text}>O continuar con</Text>
                    <View style={styles.line} />
                </View>

                        <IconSocial />
                    

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupButton}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
      </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

/* 
{
   "email": "nuevoemail@admin.com",
   "password": "NuevaContraseña1234"
}

*/



