import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import Home from '../screen/Home';
import Cart from '../screen/Cart';
import Profile from '../screen/Profile';
import Images from '../theme/Images';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    activeIcon: {
        tintColor: '#facc15',
    },
    inactiveIcon: {
        tintColor: '#000',
    },
});

const HomeIcon = ({ focused }) => (
    <Image
        source={Images.Home}
        className="w-6 h-6"
        style={focused ? styles.activeIcon : styles.inactiveIcon}
    />
);

const CartIcon = ({ focused }) => (
    <Image
        source={Images.Cart}
        className="w-6 h-6"
        resizeMode="contain"
        style={focused ? styles.activeIcon : styles.inactiveIcon}
    />
);

const ProfileIcon = ({ focused }) => (
    <Image
        source={Images.Profile}
        className="w-6 h-6"
        style={focused ? styles.activeIcon : styles.inactiveIcon}
    />
);

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#facc15',
                tabBarInactiveTintColor: '#000',

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: HomeIcon,
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: CartIcon,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ProfileIcon,
                }}
            />
        </Tab.Navigator>
    );
}