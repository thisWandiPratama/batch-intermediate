import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackRoute from './src/route';

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <StackRoute />
            </NavigationContainer>
        );
    }
}

export default App;
