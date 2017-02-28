import React, { Component } from 'react';
import { Navigator } from 'react-native';

import PokemonList from '@routes/PokemonList';

/**
 * Class representing the Index of the app.
 */
class Root extends Component {

  /**
   * Method used on Navigator to provide the context to render a scene.
   * @param route Object that contains information about a scene.
   * @param navigator Component to handle the transition between the screen.
   * @returns {XML} The layout that will be rendered.
   */
  static renderScene(route, navigator) {
    return (
      <route.component route={route} navigator={navigator} {...route.passProps} />
    );
  }

  /**
   * Required method that returns what will be rendered to JSX.
   * @returns {XML} The layout that will be rendered.
   */
  render() {
    // The first screen that the app will show is the Login.
    const initialRoute = {
      component: PokemonList,
    };

    return (
      // This component will handle the transition between the screen.
      <Navigator
        style={{ flex: 1 }}
        initialRoute={initialRoute}
        renderScene={Root.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }

}

export default Root;
