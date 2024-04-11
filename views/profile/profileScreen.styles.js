import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

// Get device screen dimensions
const { width, height } = Dimensions.get('window');
const adaptiveWidth = (factor) => width * factor;
const adaptiveHeight = (factor) => height * factor;

// Based on iPhone 6 scale
const scale = width / 375;

// Function to normalize size depending on the screen size
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const headerTitleStyle = {
  flex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 30,
  paddingVertical: 5,
}

const headerdarkTitleStyle = {
  ...headerTitleStyle,
  color:'#F7F6FA'
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FA',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#202124',
  },

  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Additional padding for Android
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: headerTitleStyle,
  headerdarkTitle: headerdarkTitleStyle,
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
  },

  avatarImage: {
    alignSelf: 'center',
    margin: 10,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth:4,
  },

  avatar: {
    alignSelf: 'center',
  },
  
  profileContainer: {
    alignItems: 'center',
    marginTop: normalize(20),
  },
  profilePic: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(50),
  },
  profileName: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginTop: normalize(10),
  },

  followButton: {
    flexDirection: 'row',
    backgroundColor: '#fb5b5a',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonText: {
    color: '#F7F6FA',
    fontSize: normalize(16),
    marginLeft: normalize(5),
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: normalize(20),
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: '#EE8924',
  },
  statLabel: {
    fontSize: normalize(16),
    color: '#F7F6FA',
  },

  balanceContainer: {
    backgroundColor: '#F7F6FA',
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    borderRadius: normalize(10),
    marginTop: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
  balanceOrders: {
    fontSize: normalize(20),
    color: '#707070',
  },

  menuContainer: {
    marginTop: normalize(20),
    alignItems: 'center',

  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    backgroundColor:'#F7F6FA',
    marginTop: normalize(20),
    width: adaptiveWidth(0.9), 
    height: adaptiveHeight(0.08), 
    borderRadius:14
  },
  menuText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: normalize(18),
    marginLeft: normalize(20),
    color:'#1c1b1b',
  },

  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    marginTop: normalize(20),
    width: adaptiveWidth(0.3), 
    height: adaptiveHeight(0.08), 
    backgroundColor:'#F7F6FA',
    borderRadius:14,
    marginLeft:240,
    marginBottom:20
  },
  logoutText: {
    fontSize: normalize(18),
    color: '#fb5b5a',
    marginLeft: normalize(20),

  },
});

export default styles;
