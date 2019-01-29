import React, {Component} from 'react';
import  {View, Text, Image, Button, ActivityIndicator} from 'react-native';
import axios from "axios";



class CamScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dog:'', cat:'', fox: '', loading: false};
        this.getanime = this.getanime.bind(this);
    }

    getanime(){
        this.setState({loading: true});
        axios.get('https://random.dog/woof.json')
            .then(function (response) {
                console.log(response.data.url);
                this.setState({dog: response.data.url});
            })
            .catch(function (error) {
                // handle error

                console.log(error);
            });
        axios.get('https://randomfox.ca/floof/')
            .then(function (response) {
                console.log(response.data.url);
                this.setState({fox: response.data.url});
            })
            .catch(function (error) {
                // handle error

                console.log(error);
            });
        axios.get('https://aws.random.cat/meow')
            .then(function (response) {
                console.log(response.data.url);
                this.setState({cat: response.data.url});

            })
            .catch(function (error) {
                // handle error

                console.log(error);
            });
        this.setState({loading: false});


    }
    componentDidMount() {
        this.getanime();
    }

    render() {
        if (this.state.loading) {
            return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator/>
            </View>);
        }
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                <Image source={{uri: this.state.dog}}/>
                <Image source={{uri: this.state.cat}}/>
                <Image source={{uri: this.state.fox}}/>

                <Button title={'update'} onPress={this.getanime}/>
            </View>
        );
    }
}
export default CamScreen;