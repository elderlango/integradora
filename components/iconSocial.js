import React from "react";
import { View, Image, Dimensions,TouchableOpacity } from "react-native";
import styles from './iconSocialStyle';

const Box = () => {
    return (
      <View style={styles.box}>
        <View style={styles.group}>
          <View>
            <View>
              <TouchableOpacity style={styles.facebook} onPress={() => console.log("Facebook presionado")}>
                <Image style={styles.img} source={require("../assets/images/facebook.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.apple} onPress={() => console.log("Apple presionado")}>
                <Image style={styles.img} source={require("../assets/images/apple.webp")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.google} onPress={() => console.log("Google presionado")}>
                <Image style={styles.img} source={require("../assets/images/google.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  export default Box