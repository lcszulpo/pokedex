import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Root from '@routes/Root';

/**
 * Class representing the root of the app in Android.
 */
export default class Pokedex extends Component {

  /**
   * Required method that returns what will be rendered to JSX.
   * @returns {XML} The layout that will be rendered.
   */
  render() {
    return (
      <Root />
    );
  }

}

AppRegistry.registerComponent('Pokedex', () => Pokedex);
