import React from "react";
import { View, Image, Dimensions,TouchableOpacity } from "react-native";
import styles from './iconSociaUsStyle';
import Icon from 'react-native-vector-icons/FontAwesome';


const Box = () => {
    return (
      <View style={styles.grupo}>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Facebook presionado")}>
                <Icon name="twitter"  style={styles.img}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Apple presionado")}>
                <Icon name="telegram"  style={styles.img}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Google presionado")}>
                <Icon name="facebook-square"  style={styles.img}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Google presionado")}>
                <Icon name="reddit" style={styles.img}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Google presionado")}>
                <Icon name="instagram" style={styles.img}  />
              </TouchableOpacity>
      </View>
    );
  };

  export default Box