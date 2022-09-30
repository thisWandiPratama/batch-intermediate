import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../serivce/token/token';


class Splah extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        this.getDataToken()
    }

    getDataToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            this.props.navigation.replace('Home')
          }
          else{
            this.props.navigation.replace('Login')
          }
        } catch(e) {
            this.props.navigation.replace('Login')
        }

        // setTimeout(() => {
        //     this.props.navigation.replace('Login')
        // }, 2000);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{
                        uri: 'https://i.ibb.co/dL63qgp/destination.png',
                    }}
                    style={styles.logo}
                />
                <ActivityIndicator size={'large'} color={'#261B47'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 85,
        width: 184,
        resizeMode: "contain"
    },
});

export default Splah;