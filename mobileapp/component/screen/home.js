import React from "react";
import {Text, View, Image, StyleSheet, TextInput, Button, ImageBackground, ActivityIndicator} from "react-native";
import {getFu} from '../apis';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state= { text: '', resp: '', loading: false};
        this.getFuck = this.getFuck.bind(this)
    }
    getFuck() {
        this.setState({loading: true});
        getFu(this.state.text).then(res => {
            this.setState({resp: res, loading: false});
            console.log(res)
        })
            .catch(error => {
                console.log(error)
            });
    }
    render() {
        if (this.state.loading) {
            return (<ImageBackground source={require('../img/e74604adab025d0fb6a909551c9bae7f.jpg')} style={styles.backgroundImage}>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:'white'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={'Enter a tool'}
                />
                <Button title={'Can use this tool ?'} onPress={this.getFuck}/>
                <ActivityIndicator/>
            </ImageBackground>);
        }


        if (this.state.resp !== '') {
            return (
                <ImageBackground source={require('../img/e74604adab025d0fb6a909551c9bae7f.jpg')} style={styles.backgroundImage}>

                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:'white'}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={'Enter a tool'}
                    />
                    <Button title={'Can use this tool ?'} onPress={this.getFuck}/>
                    <Text style={{backgroundColor: 'white'}}>{this.state.resp}</Text>
                </ImageBackground>
            )
        }
        return (
            <ImageBackground source={require('../img/e74604adab025d0fb6a909551c9bae7f.jpg')} style={styles.backgroundImage}>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:'white'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={'Enter a tool'}
                />
                <Button title={'Can use this tool ?'} onPress={this.getFuck}/>
            </ImageBackground>
        )
        /*return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundImage:}}>
                <Text>Home!</Text>
            </View>
        );*/
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});

export default HomeScreen;