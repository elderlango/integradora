import React,{ useContext, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Alert,ScrollView,
  PanResponder,Animated } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from '@react-native-community/datetimepicker';
import styles from './RegisterScreen.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/input';
import Button from '../../components/button';
import UpperText from '../../components/upperText';
import ScrollViewStyle from '../../components/scrollView';
import BackButton from '../../components/backButtonc';
import ContentContainer from '../../components/contentContainer';
import { ThemeContext } from "../../components/theme/themeManager";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Menu from '../../components/menu/menu';

// Esquema de validación con Yup
const registerSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña es requerida'),
  repassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Este campo es obligatorio'),
  firstName: Yup.string().required('Nombre es requerido'),
  lastName: Yup.string().required('Apellido es requerido'),
  birthDate: Yup.date()
    .max(new Date(), "No puedes seleccionar una fecha futura")
    .required("La fecha de nacimiento es requerida"),
});

const RegisterScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const [menuVisible, setMenuVisible] = useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => setPasswordVisibility(!passwordVisibility);
  const [repasswordVisibility, setRePasswordVisibility] = useState(true);
  const toggleRePasswordVisibility = () => setRePasswordVisibility(!repasswordVisibility);

  const opacity = useRef(new Animated.Value(0)).current;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    animateOpacity(1);
  };

  const hideDatePicker = () => {
    animateOpacity(0);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    hideDatePicker();
  };

  const animateOpacity = (toValue) => {
    Animated.timing(opacity, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (toValue === 0) {
        setDatePickerVisibility(false);
      }
    });
  };

  //para el active css de los inputs

  const handleFocus = (index) => {
    setActiveIndex(index);
  };

  const dark ='../../assets/images/tile_background4.png';
  const light ='../../assets/images/tile_background9.png';

  
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

  const handleSubmito = async (values) => {
    const endpoint = isAdmin ? `http://${global.ipDireccion}:3000/api/admins/register` : `http://${global.ipDireccion}:3000/api/users/register`;

      console.log("Inicio del onSubmit"); // Paso 6: Asegurarse que esta parte del código se ejecuta
      setLoading(true);
      const userData = {
        ...values,
        birthDate: date.toISOString(),
        isAdmin,
      };
      
      if (values.password !== values.repassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
      console.log("Valores a enviar:", userData); 

      try {
        console.log("Intentando enviar datos al servidor..."); 
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        
        const json = await response.json();
        if (response.ok) {
          Alert.alert('Éxito', 'Usuario registrado correctamente', [
            { text: "OK", onPress: () => {
              setDate(new Date()); // Reiniciar la fecha también si es parte del formulario
              setIsAdmin(false); // Reiniciar cualquier otro estado que no esté manejado directamente por Formik
              // Aquí puedes agregar navegación u otras acciones de limpieza
            }}
          ]);
        } else {
          Alert.alert('Error', json.message || 'No se pudo registrar el usuario');
        }
        
      } catch (error) {
        console.error("Error al enviar datos:", error);
        Alert.alert('Error', 'No se pudo conectar al servidor');
      } finally {
        console.log("Finalizando onSubmit");
      }
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}> 
      <ScrollView contentContainerStyle={ScrollViewStyle.scrollView}  stickyHeaderIndices={[1]}>
        <View style={styles.container}>
        <ImageBackground source={theme === 'light' ? require(light) : require(dark)} 
             style={{...(styles.backgroundImage),...(styles.container),}}>  
          <View style={styles.headerContainer} {...panResponder.panHandlers}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Registro</Text>
            </View>
            <BackButton navigation={navigation}/>
          </View>
    <BackButton navigation={navigation}/>

    {menuVisible && (<Menu navigation={navigation} style={menuPosition.getLayout()}  onClose={(isVisible) => setMenuVisible(isVisible)}/>)} 

       {/* <Text style={styles.title}>Air Guard</Text>
        <Text style={styles.subtitle}>¿Listo para dar el paso?</Text> */}
        <View style={theme === 'light' ? ContentContainer.contentContainerRegister : ContentContainer.contentContainerRegisterDark}>
        <Formik
          initialValues={{ email: '', password: '',repassword: '', firstName: '', lastName: '', birthDate: new Date() }}
          validationSchema={registerSchema}          
          onSubmit={handleSubmito}
          >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <>
              <Text style={theme === 'light' ? UpperText.title : UpperText.titleDark}>Crear Cuenta</Text>
              <Text style={UpperText.subtitle}>Crea una cuenta para transformar todos tu entornos</Text>
             
            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveEdit : Input.fieldAboveEditDark}>Correo</Text>
              <TextInput
                style={{
                  ...(touched.email && errors.email ? Input.errorInput : null),
                  ...(activeIndex === 1 ? Input.inputActive : Input.input),
                  ...(values.email && !errors.email ? Input.correctoInput : null),
                }}
                onFocus={() => handleFocus(1)}
                onBlur={
                  handleBlur('email')
                }    
                placeholder="Email"
                onChangeText={handleChange('email')}
                value={values.email}
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={Input.errorText}>{errors.email}</Text>}
            </View>

              <View>
                <Text  style={theme === 'light' ? Input.fieldAboveEdit : Input.fieldAboveEditDark}>Contraseña</Text>
                <TextInput
                  style={{
                    ...(touched.password && errors.password ? Input.errorInput : null),
                    ...(activeIndex === 2 ? Input.inputActive : Input.input),
                    ...(values.password && !errors.password ? Input.correctoInput : null),
                  }}
                  onFocus={() => handleFocus(2)}
                  onBlur={
                    handleBlur('password')
                  }                                
                  value={values.password}
                  placeholder="Contraseña"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange('password')}/>
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={Input.iconInput} >
                      <Icon name={passwordVisibility ? "visibility-off" : "visibility"} size={30} color="#6e6e6e" />
                  </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && <Text style={Input.errorText}>{errors.password}</Text>}

                    <View>
                      <Text  style={theme === 'light' ? Input.fieldAboveEdit : Input.fieldAboveEditDark}>Repetir Contraseña</Text>
                      <TextInput
                    style={{
                      ...(touched.repassword && errors.repassword ? Input.errorInput : null),
                      ...(activeIndex === 3 ? Input.inputActive : Input.input),
                      ...(values.repassword && !errors.repassword ? Input.correctoInput : null),
                        }}
                        onFocus={() => handleFocus(3)}
                        onBlur={handleBlur('repassword')}
                        value={values.repassword}
                        placeholder="Reintroduce la contraseña"
                        secureTextEntry={repasswordVisibility}
                        onChangeText={handleChange('repassword')}
                      />
                      <TouchableOpacity onPress={toggleRePasswordVisibility} style={Input.iconInput}>
                        <Icon name={repasswordVisibility ? "visibility-off" : "visibility"} size={30} color="#6e6e6e" />
                      </TouchableOpacity>
                    </View>
                    {touched.repassword && errors.repassword && <Text style={Input.errorText}>{errors.repassword}</Text>}


            <View>
              <Text  style={theme === 'light' ? Input.fieldAboveEdit : Input.fieldAboveEditDark}>Nombre</Text>
              <TextInput
                style={{
                  ...(touched.firstName && errors.firstName ? Input.errorInput : null),
                  ...(activeIndex === 4 ? Input.inputActive : Input.input),
                  ...(values.firstName && !errors.firstName ? Input.correctoInput : null),
                }}
                  onFocus={() => handleFocus(4)}
                  onBlur={
                    handleBlur('firstName')
                   
                  }   
                placeholder="Nombre"
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                /*onPress={() => setActiveIndex(2)}*/
              />
              {touched.firstName && errors.firstName && <Text style={Input.errorText}>{errors.firstName}</Text>}
            </View>

            <View>
             <Text  style={theme === 'light' ? Input.fieldAboveEdit : Input.fieldAboveEditDark}>Apellidos</Text>
              <TextInput
                 style={{
                  ...(touched.lastName && errors.lastName ? Input.errorInput : null),
                  ...(activeIndex === 5 ? Input.inputActive : Input.input),
                  ...(values.lastName && !errors.lastName ? Input.correctoInput : null),
                }}
                onFocus={() => handleFocus(5)}
                onBlur={
                  handleBlur('lastName')
                } 
                /*
                
                onBlur={() => {
                  handleBlur('lastName');
                  handleFocus(-1);
                }}   */ 
                placeholder="Apellidos"
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && <Text style={Input.errorText}>{errors.lastName}</Text>}
            </View>

            <TouchableOpacity onPress={showDatePicker} disabled={loading} style={Button.datePicker}>
                 <Text style={Button.buttonText}>Fecha de nacimiento</Text>
              </TouchableOpacity>
              {isDatePickerVisible && (
                <Animated.View style={[{ opacity }, isDatePickerVisible ? styles.visibleDatePicker : styles.hiddenDatePicker]}>
                  <DatePicker value={date} mode="date" display="default" onChange={onChangeDate}/>
                </Animated.View>
              )}

                  <View style={Input.checkBoxInput}>
                      <Text >Admin</Text>
                    <BouncyCheckbox size={25} fillColor="#495168" unfillColor="#FFFFFF"   innerIconStyle={{ borderWidth: 2 }}
                        onPress={() => {setIsAdmin(!isAdmin);}} style={Button.checkboxAdmin}
                      />
                    </View>

              <TouchableOpacity onPress={() => handleSubmito(values)} disabled={loading} style={Button.buttonPrimary}>
                 <Text style={Button.buttonText}>{loading ? "Cargando..." : "REGISTRAR"}</Text>
              </TouchableOpacity>
            </>
          )}
         </Formik>
        </View>
      </ImageBackground>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>    
  );
};

export default RegisterScreen;
