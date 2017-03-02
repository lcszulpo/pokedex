import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    fontFamily: 'Pokemon',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  pokemonDetail: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    flex: 1,
    fontFamily: 'Pokemon',
  },
  genus: {
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
    fontFamily: 'Pokemon',
  },
  line: {
    backgroundColor: '#c5c5c5',
    width: 1,
    margin: 5,
  }
});

export default styles;
