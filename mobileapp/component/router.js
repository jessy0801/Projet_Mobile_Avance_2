import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import SettingsScreen from './screen/setting'
import HomeScreen from './screen/home'
import MapScreen from './screen/map'
import BtnsScreen from './screen/btns'
import TabIcon from './tabicon'



const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <TabIcon {...props} /*badgeCount={3}*/ />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;

    if (routeName === 'Homer') {
        iconName = `md-home`;
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Imgs') {
        iconName = `md-reverse-camera`;
    } else if (routeName === 'Btns') {
        iconName = `md-happy`;
    } else if (routeName === 'Settings') {
        iconName = `md-cog`;
    }
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator({

        Homer: HomeScreen,
        Imgs: MapScreen,
        Btns: BtnsScreen,
        Settings: SettingsScreen,

    },{

        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
        }),

        tabBarOptions: {
            activeTintColor: 'darkblue',
            inactiveTintColor: 'gray',
            style: {backgroundColor: 'lightblue'}
        },
    }
);

export default createAppContainer(TabNavigator);