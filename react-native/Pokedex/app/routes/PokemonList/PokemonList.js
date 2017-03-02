import React, { Component } from 'react';
import { Navigator, Dimensions, InteractionManager, View, ListView, Image, Text, TouchableOpacity, Alert } from 'react-native';

import Data from '@assets/data';
import images from '@assets/images';
import NavigationBar from '@components/NavigationBar';
import Pokemon from '@components/Pokemon';
import PokemonDetail from '@routes/PokemonDetail';
import styles from '@routes/PokemonList/styles';

import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info';

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
      pokemon: null,
      isToShowPokemonInSameScreen: false,
    };
  }

  componentDidMount() {
    // This will guarantee that the code will run later,
    // without delaying active animations.
    InteractionManager.runAfterInteractions(() => {
      this.readPokemonsFromJson();
    });

    Orientation.getOrientation((error, orientation) => {
      const isLandscape = orientation === 'LANDSCAPE';

      this.organizeScreen(DeviceInfo.isTablet() && isLandscape);
    });

    Orientation.addOrientationListener(orientation => {
      const isLandscape = orientation === 'LANDSCAPE';

      this.organizeScreen(DeviceInfo.isTablet() && isLandscape);
    });
  }

  onRowClick(id) {
    this.readPokemonByIdFromJson(id).then((pokemon) => {
      if(this.state.isToShowPokemonInSameScreen) {
        this.setState({ pokemon });
      } else {
        this.openPokemonDetail(pokemon);
      }
    });
  }

  organizeScreen(isTabletAndLandscape) {
    if(isTabletAndLandscape) {
      this.setState({
        isToShowPokemonInSameScreen: true,
      });
    } else {
      this.setState({
        isToShowPokemonInSameScreen: false,
      });
    }
  }

  openPokemonDetail(pokemon) {
    this.props.navigator.push({
      component: PokemonDetail,
      sceneConfig: {
        ...Navigator.SceneConfigs.VerticalUpSwipeJump,
        // Disable swipe back in Analytic Pages.
        gestures: {},
      },
      pokemon,
    });
  }

  async readPokemonsFromJson() {
    try {
      const pokemonList = await Data.pokemonList;

      pokemonList.sort((a, b) => a.name > b.name ? 1 : -1);

      this.setState({ pokemonList });
    } catch (error) {
      PokemonList.showAlert(error.message);
    }
  }

  async readPokemonByIdFromJson(id) {
    try {
      const pokemons = await Data.pokemons;

      return await pokemons.find((p) => p.id === id);
    } catch (error) {
      Pokemon.showAlert(error.message);
    }
  }

  render() {
    const dataSource = this.state.ds.cloneWithRows(this.state.pokemonList);

    const source = (id) => {
      return images[`pokemon${id}`];
    };

    const Row = (props) => (
      <TouchableOpacity onPress={() => this.onRowClick(props.id)}>
        <View style={styles.container}>
          <Image source={source(props.id)} style={styles.image} />
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.genus}>{props.genus}</Text>
        </View>
      </TouchableOpacity>
    );

    const view = this.state.isToShowPokemonInSameScreen ?
      (
        <View style={styles.horizontalContainer}>
          <View>
            <ListView
              dataSource={dataSource}
              renderRow={(rowData) => <Row {...rowData} />}
              enableEmptySections
              initialListSize={1}
              removeClippedSubviews
              style={{width: 300}}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.pokemonDetail}>
            <Pokemon pokemon={this.state.pokemon} />
          </View>
        </View>
      ) :
      (
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => <Row {...rowData} />}
          enableEmptySections
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialListSize={1}
          scrollRenderAheadDistance={10}
          removeClippedSubviews
        />
      );

    return (
      <View>
        <NavigationBar
          title="Pokedex"
        />

        {view}
      </View>
    );
  }

}

export default PokemonList;
