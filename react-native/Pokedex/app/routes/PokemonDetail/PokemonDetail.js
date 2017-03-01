import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Device from 'react-native-device-info';

import images from '@assets/images';
import styles from '@routes/PokemonDetail/styles';
import NavigationBar from '@components/NavigationBar';
import Icon from '@components/Icon';
import Pokemon from '@components/Pokemon';

class PokemonDetail extends Component {

  onPressBack() {
    this.props.navigator.pop();
  }

  render() {
    const arrow = Device.getSystemName() === 'iOS' ?
      images.arrowLeftIos : images.arrowLeftAndroid;

    const leftButtonConfig = (
      <View style={styles.navBarButtonContainer}>
        <TouchableOpacity onPress={() => this.onPressBack()}>
          <Icon image={arrow} />
        </TouchableOpacity>
      </View>
    );

    return(
      <View>
        <NavigationBar leftButtonConfig={leftButtonConfig} />
        <Pokemon pokemon={this.props.route.pokemon} />
      </View>
    );
  }

}

export default PokemonDetail;
