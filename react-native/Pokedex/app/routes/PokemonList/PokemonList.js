import React, { Component } from 'react';
import { InteractionManager, View, ListView, Image, Text, Alert } from 'react-native';

import Data from '@assets/data';
import NavigationBar from '@components/NavigationBar';
import styles from '@routes/PokemonList/styles';
import images from '@assets/images';

class PokemonList extends Component {

  /**
   * Display a alert to user.
   * @param message The message that will be displayed.
   */
  static showAlert(message) {
    Alert.alert('Atenção', message, [{ text: 'Ok' }]);
  }

  constructor() {
    super();
    this.state = {
      pokemonList: [],
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentDidMount() {
    // This will guarantee that the code will run later,
    // without delaying active animations.
    InteractionManager.runAfterInteractions(() => {
      this.readPokemonsFromJson();
    });
  }

  async readPokemonsFromJson() {
    try {
      const pokemonList = await Data.pokemonList;

      this.setState({ pokemonList });
    } catch (error) {
      PokemonList.showAlert(error.message);
    }
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.pokemonList);

    const source = (id) => {
      return require([`../../assets/images/pokemon_${id}`]);
    };

    const Row = (props) => (
      <View style={styles.container}>
        <Image source={source(props.id)} style={styles.image} />
        {/*<Image source={require('../../assets/images/pokemon_1.png')} style={styles.image} />*/}
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.genus}>{props.genus}</Text>
      </View>
    );

    return (
      <View>
        <NavigationBar
          title="Pokedex"
        />

        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => <Row {...rowData} />}
          enableEmptySections
          initialListSize={1}
          scrollRenderAheadDistance={10}
          removeClippedSubviews
        />
      </View>
    );
  }

}

export default PokemonList;
