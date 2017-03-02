import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 13,
  },
  image: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Pokemon',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 3,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Pokemon',
  },
});

export default styles;
