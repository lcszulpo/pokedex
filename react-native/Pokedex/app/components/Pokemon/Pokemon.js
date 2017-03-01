import React, { Component } from 'react';
import { InteractionManager, View, Image, Text, Alert } from 'react-native';

import images from '@assets/images';
import styles from '@components/Pokemon/styles';

class Pokemon extends Component {

  render() {
    const source = (id) => { return images[`pokemon${this.props.pokemon.id}`]; };

    const name = this.props.pokemon ? this.props.pokemon.name.toUpperCase() : '';

    const view = this.props.pokemon ?
      (<View style={styles.container}>
        <Image style={styles.image} source={source(this.props.id)} />
        <Text style={styles.title}>
          {name}
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Height:
          </Text>
          <Text style={styles.text}>
            {this.props.pokemon.height}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Weight:
          </Text>
          <Text style={styles.text}>
            {this.props.pokemon.weight}
          </Text>
        </View>
      </View>) :
      (<View />);


    return view;
  }

}

export default Pokemon;
