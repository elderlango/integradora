// HeaderStyles.js
import { StyleSheet, Platform } from 'react-native';

const headerTitleStyle = {
  flex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 20,
  paddingVertical: 15,
}

const headerdarkTitleStyle = {
  ...headerTitleStyle,
  color:'#F7F6FA'
 }

const iconStyle = {
  position: 'absolute', 
  top: -65, 
  left: -30, 
  fontSize: 50,
  color: '#EE8924',
  //backgroundColor: 'white',
    marginLeft: 220,
  zIndex: 1001, 
  borderRadius:60,
  padding:-10
}

const iconOutlineStyle = {
  ...iconStyle,
  color: 'white',
  //backgroundColor: 'white',
}

const iconOutlineDarkStyle = {
  ...iconOutlineStyle,
  color: 'white',
  //backgroundColor: 'white',
}

const iconDarkStyle = {
  ...iconStyle,
  fontSize: 1,
  color: 'red',
  marginLeft: 10,
  marginBottom: 5,
}

const infoStyle = {
  fontFamily: 'Poppins-SemiBold',
  fontSize: 25,
  color: '#262422',
  textAlign: 'left',
  marginLeft: 10,
  marginBottom: 10,
  textAlign: 'center',
}

const infoLilStyle = {
  ...infoStyle,
  fontSize: 16,
  color: '#ABABAB',
}

const infoDarkStyle = {
  ...infoStyle,
  color: '#F7F6FA',
}


const iconInputStyle = {
  fontSize: 30,
  color: '#6e6e6e',
}

const iconActiveStyle = {
  ...iconInputStyle,
  color: '#EE8924',
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FA',
  },

  containerDark: {
    flex: 1,
    backgroundColor: '#202124',
  },

  profileContainer: {
    alignItems: 'center',
  },
      avatar: {
        alignSelf: 'center',
        margin: 10,
      },

      avatarImage: {
        alignSelf: 'center',
        margin: 10,
        borderRadius: 90,
        borderColor: '#425376',
        //borderWidth:3,
      },

      input: {
        marginBottom: 10,
      },
      button: {
        marginTop: 20,
      },
      errorText: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
        marginBottom: 5,
      },

    
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Additional padding for Android
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: headerTitleStyle,
  headerdarkTitle: headerdarkTitleStyle,
  icon:iconStyle,
  iconDark:iconDarkStyle,
  iconOutline:iconOutlineStyle,
  iconOutlineDark:iconOutlineDarkStyle,
  infoStyle:infoStyle,
  infolilStyle:infoLilStyle,
  infoDarkStyle:infoDarkStyle,
  iconInput:iconInputStyle,
  iconActive:iconActiveStyle,
  backButton: {
    paddingLeft: 10,
  },
});
