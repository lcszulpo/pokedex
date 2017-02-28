import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    flex: 1,
  },
  genus: {
    flex: 1,
    textAlign: 'right',
  }
});

export default styles;
