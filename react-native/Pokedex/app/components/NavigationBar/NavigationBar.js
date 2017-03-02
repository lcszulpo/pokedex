import React, { Component } from 'react';
import { Platform, View, StatusBar } from 'react-native';

import ReactNativeNavigationBar from 'react-native-navbar';

import styles from '@components/NavigationBar/styles';

/**
 * Class that represents the NavigationBar of the app.
 */
class NavigationBar extends Component {

  render() {
    const title = this.props.title ? this.props.title : '';

    const titleTintColor =
      this.props.titleTintColor ? this.props.titleTintColor : '#FFFFFF';

    const statusBarStyle =
      this.props.statusBarStyle ? this.props.statusBarStyle : 'light-content';

    const statusBarTintColor =
      this.props.statusBarTintColor ? this.props.statusBarTintColor : '#C62828';

    const navigationBarTintColor =
      this.props.navigationBarTintColor ? this.props.navigationBarTintColor : '#EF5350';

    // Methods that will make configuration of the left and right buttons.
    const leftButtonConfig = this.props.leftButtonConfig;
    const rightButtonConfig = this.props.rightButtonConfig;

    // It is possible to have multiple StatusBar components mounted at the same time.
    // The props will be merged in the order the StatusBar components were mounted.
    // In 15/02/2017 i tried to color the StatusBar in android with the react-native-navbar
    // component, without success. Then, i have added a StatusBar in the top for myself and
    // the color has changed with success.
    return (
      <View>
        <StatusBar
          backgroundColor={statusBarTintColor}
        />
        <ReactNativeNavigationBar
          title={{ title, tintColor: titleTintColor, style: styles.title }}
          statusBar={{ style: statusBarStyle, tintColor: statusBarTintColor }}
          tintColor={navigationBarTintColor}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
        />
      </View>
    );
  }

}

export default NavigationBar;
