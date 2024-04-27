import React, { useState, useRef, useEffect,useContext,  } from 'react';
import { ScrollView, TouchableOpacity, Alert, View, Text, ActivityIndicator,TextInput,SafeAreaView,ImageBackground, PanResponder,Animated } from 'react-native';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './editProfileScreen.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackButton from '../../components/backButtonc';
import { ThemeContext } from "../../components/theme/themeManager";
import SesionExpired from '../SesionExpired/sesionExpired';
import Input from '../../components/input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../../components/menu/menu';

// Esquema de validación actualizado
const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Un nombre es requerido'),
  lastName: Yup.string().required('Un apellido es requerido'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  birthdate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser en el futuro').required('Requerido'),
});

const EditProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
          const formattedBirthDate = json.birthDate ? json.birthDate.split('T')[0] : '';
          
          setUserData({
            ...json,
            birthdate: formattedBirthDate // Asegúrate de que el campo en tu estado se llame igual que el campo en Formik
          });
          
          console.log(json)
          setProfileImage(json.profilePicture || '../../assets/images/yo.jpg');
          
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

const handleChoosePhoto = () => {
  launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: false }, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      // Assuming you have a state setter named `setProfileImage`
      setProfileImage(response.assets[0].uri);
    }
  });
};


  const handleSubmitForm = async (values) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    const endpoint = `http://${global.ipDireccion}:3000/api/admins/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Perfil actualizado correctamente.");
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al actualizar el perfil.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Ocurrió un error inesperado al actualizar.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff"/>;
  }

  if (!userData) {
    return <SesionExpired navigation={navigation}/> ;
  }

  //para el active css de los inputs

  const handleFocus = (index) => {
    setActiveIndex(index);
  };

  const { theme } = useContext(ThemeContext);
  const dark ='../../assets/images/tile_background4.png';
  const light ='../../assets/images/tile_background9.png';
  
  


  return (
    <SafeAreaView style={theme === 'light' ? styles.container : styles.containerDark}>
      <ScrollView>
      <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{
              ...(styles.backgroundImage),
              ...(styles.container),
            }}>  
      <View style={styles.headerContainer} {...panResponder.panHandlers}>
        <Text style={theme === 'light' ? styles.headerdarkTitle : styles.headerdarkTitle}>Editar Perfil</Text>
      </View>
      <BackButton navigation={navigation}/>
      {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 

      <View style={styles.profileContainer}>
      <Formik
        initialValues={{
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          birthdate: userData.birthdate || '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmitForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarImage}>
              <Avatar.Image size={130} source={require('../../assets/images/yo.jpg')} style={styles.avatar} />
              {/* <Image source={{ uri: profileImage }} style={styles.profilePic} /> require('../../assets/images/yo.jpg' )*/ }
          </View> 

              <TouchableOpacity onPress={handleChoosePhoto}>
                <MaterialCommunityIcons name="pencil-circle" style={theme === 'light' ? styles.icon : styles.icon}/>
                <MaterialCommunityIcons name="pencil-circle-outline" style={theme === 'light' ? styles.iconOutline : styles.iconOutline}/>
              </TouchableOpacity>
              <TouchableOpacity style={Button.editProfile} onPress={handleChoosePhoto}>
                <Text style={Button.editProfileText}>Cambiar Foto</Text>
              </TouchableOpacity>
          </View>

          <Text style={theme === 'light' ? styles.infoDarkStyle : styles.infoDarkStyle}>{userData.age} años</Text>
          <Text style={styles.infolilStyle}>Correo: {userData.email}</Text>
            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveDark : Input.fieldAboveDark}>Tu Nombre</Text>
              <View
               style={{
                ...(touched.firstName && errors.firstName ? Input.errorInputEdit : null),
                ...(activeIndex === 1 ? Input.inputEditActive : Input.inputEdit),
                ...(values.firstName && !errors.firstName ? Input.inputEditCorrecto : null),
                }}>
                  <TouchableOpacity style={Input.iconInputEdit} >
                  <Icon name={"person"} 
                  style={{
                    ...(activeIndex === 1 ? styles.iconActive : styles.iconInput),
                    }}/>
                </TouchableOpacity>
                <TextInput
                  style={{
                    ...(Input.inputEditInside),
                    color:'#ABABAB'
                  }}
                  onFocus={() => handleFocus(1)}
                  onBlur={ handleBlur('firstName')}    
                  placeholder="Nombre"
                  onChangeText={handleChange('firstName')}
                  value={values.firstName}              
                />
                 </View>
              {touched.firstName && errors.firstName && <Text style={Input.errorEditText}>{errors.firstName}</Text>}
            </View>

            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveDark : Input.fieldAboveDark}>Tus Apellidos</Text>
              <View
               style={{
                ...(touched.lastName && errors.lastName ? Input.errorInputEdit : null),
                ...(activeIndex === 2 ? Input.inputEditActive : Input.inputEdit),
                ...(values.lastName && !errors.lastName ? Input.inputEditCorrecto : null),
              }}>
                 <TouchableOpacity style={Input.iconInputEdit} >
                  <Icon name={"people"} style={{
                    ...(activeIndex === 2 ? styles.iconActive : styles.iconInput),
                    }} />
                </TouchableOpacity>
              <TextInput
                 style={{
                  ...(Input.inputEditInside),
                  color:'#ABABAB'
                }}
                onFocus={() => handleFocus(2)}
                onBlur={ handleBlur('lastName')}    
                placeholder="Apellidos"
                onChangeText={handleChange('lastName')}
                value={values.lastName}              
                />
                </View>
              {touched.lastName && errors.lastName && <Text style={Input.errorEditText}>{errors.lastName}</Text>}
            </View>

            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveDark : Input.fieldAboveDark}>Tu Correo</Text>
              <View
               style={{
                ...(touched.email && errors.email ? Input.errorInputEdit : null),
                ...(activeIndex === 3 ? Input.inputEditActive : Input.inputEdit),
                ...(values.email && !errors.email ? Input.inputEditCorrecto : null),
              }}>
                <TouchableOpacity style={Input.iconInputEdit} >
                  <Icon name={"email"} style={{
                    ...(activeIndex === 3 ? styles.iconActive : styles.iconInput),
                    }} />
                </TouchableOpacity>
              <TextInput
               style={{
                ...(Input.inputEditInside),
                color:'#ABABAB'
                }}
                onFocus={() => handleFocus(3)}
                onBlur={ handleBlur('email')}    
                placeholder="Email"
                onChangeText={handleChange('email')}
                value={values.email}              
                />
                </View>
              {touched.email && errors.email && <Text style={Input.errorEditText}>{errors.email}</Text>}
            </View>
            
            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveDark : Input.fieldAboveDark}>Fecha Nacimiento (AAAA-MM-DD)</Text>
              <View style={{
                    ...(touched.birthdate && errors.birthdate ? Input.errorInputEdit : null),
                    ...(activeIndex === 4 ? Input.inputEditActive : Input.inputEdit),
                    ...(values.birthdate && !errors.birthdate ? Input.inputEditCorrecto : null),
                  }}>
                <TouchableOpacity style={Input.iconInputEdit} >
                  <Icon name={"cake"} style={{
                    ...(activeIndex === 4 ? styles.iconActive : styles.iconInput),
                    }} />
                </TouchableOpacity>
                <TextInput
                  style={{
                    ...(Input.inputEditInside),
                    color:'#ABABAB'
                  }}
                  onFocus={() => handleFocus(4)}
                  onBlur={ handleBlur('birthdate')}    
                  placeholder="Fecha de Nacimiento"
                  onChangeText={handleChange('birthdate')}
                  value={values.birthdate}      
                                keyboardType="numeric"
                />
            </View>
              {touched.birthdate && errors.birthdate && <Text style={Input.errorEditText}>{errors.birthdate}</Text>}
            </View>

            <TouchableOpacity style={Button.editProfile} onPress={handleSubmit}>
                        <Text style={Button.editProfileText}>Entrar</Text>
                    </TouchableOpacity>
          </>
        )}
      </Formik></View>
      </ImageBackground>
    </ScrollView>
    </SafeAreaView>
  );
};


export default EditProfileScreen;
