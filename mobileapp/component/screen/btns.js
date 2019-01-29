import React from "react";
import {Text, View, Button, PermissionsAndroid, FlatList, ListItem} from "react-native";
import {getPlace, getWeather} from '../apis';

import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
} from "react-native-sensors";

import Permision from '../permisions'

import Sound from 'react-native-sound';

const sound = new Sound('http://soundbible.com/mp3/Glass_Break-stephan_schutze-958181291.mp3', null, (error) => {
    if (error) {
        console.log('Sound fail to access');
    }

});


export default class BtnsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getGyro = this.getGyro.bind(this);
        this.fall = 19;
        this.state = {
            latitude: '',
            longitude: '',
            error: '',
            x: 0, y: 0, z: 0,
            places:''
        };

        setUpdateIntervalForType(SensorTypes.accelerometer, 200); // defaults to 100ms
        const subscription = accelerometer.subscribe(({x, y, z, timestamp}) =>
            this.setState({ x: Number((x).toFixed(0)), y: Number((y).toFixed(0)), z: Number((z).toFixed(0)) })

        )
    }

    componentWillUpdate() {
        if (this.state.x > this.fall || this.state.x > this.fall || this.state.y > this.fall) {
            sound.play();

        }
    }

    async requestGpsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'FUUU1',
                    'message': '2' +
                        'so you can fine locate.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("GPS permission accepted")
            } else {
                console.log("Gps permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    handleClick() {

        (async () => {
            this.requestGpsPermission();
        })();
        this.setState({isoading: true})
        //this.setState({coordinate: navigator.geolocation.getCurrentPosition()});
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                getPlace(position.coords.latitude, position.coords.longitude).then(res => {
                    this.setState({ places: res.data.results });
                })
                    .catch(error => {
                        console.log(error)
                    });
                getWeather(position.coords.latitude, position.coords.longitude).then(res => {

                    this.setState({ weather: res.data.weather[0].description });
                })
                    .catch(error => {
                        console.log(error)
                    });




                //this.state.places =this.setState({ places: this.state.places.cloneWithRows(test.getPlaces(position.coords.latitude, position.coords.longitude)) });
                console.log('placegeted');

            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 50000, maximumAge: 5000},
        );


    }


    getGyro() {

        (async () => {
            Permision.requestGyroPermission();
        })();

        //this.setState({coordinate: navigator.geolocation.getCurrentPosition()});
    }


    render() {
        const {navigate} = this.props.navigation;
        if (this.state.places !== '' && this.state.weather !== '') {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Home!</Text>
                    <Button title={'GPS info'} onPress={this.handleClick}/>
                    <Text>Lat : {this.state.latitude}</Text>
                    <Text>Lat : {this.state.longitude}</Text>
                    <Text>Place : {this.state.places[0].formatted}</Text>
                    <Text>Weather : {this.state.weather}</Text>
                    <Text>{this.state.error}</Text>
                    <Button title={'get gyro'} onPress={this.getGyro}/>
                    <Text>x : {this.state.x}</Text>
                    <Text>y : {this.state.y}</Text>
                    <Text>z : {this.state.z}</Text>

                   {/* <FlatList
                        extraData={this.state.places}
                        data={this.state.places}
                        renderItem={({item}) => <ListItem title={item.formatted} />}
                    />*/}

                </View>
            );
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Home!</Text>
                <Button title={'GPS info'} onPress={this.handleClick}/>
                <Text>Lat : {this.state.latitude}</Text>
                <Text>Lat : {this.state.longitude}</Text>
                <Text>{this.state.error}</Text>
                <Button title={'get gyro'} onPress={this.getGyro}/>
                <Text>x : {this.state.x}</Text>
                <Text>y : {this.state.y}</Text>
                <Text>z : {this.state.z}</Text>
            </View>
        );

    }
};
