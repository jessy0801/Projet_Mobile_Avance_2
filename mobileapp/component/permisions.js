import {PermissionsAndroid} from "react-native";

export default class Permisions {
    constructor() {

        this.requestGpsPermission = this.requestGpsPermission.bind(this);
        this.requestGyroPermission = this.requestGyroPermission.bind(this);
    }



    async requestGyroPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
                {
                    'title': 'FUUU1',
                    'message': '2' +
                        'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Gyro permission accepted")
            } else {
                console.log("Gyro permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
}