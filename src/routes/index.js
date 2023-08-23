import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser, faHandshake } from '@fortawesome/free-regular-svg-icons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesomeIcon name="home" color={'black'} size={25} icon={ faCircleUser }/>
            ),
          }}
        />
        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: false,
            tabBarIcon: () => (
                <FontAwesomeIcon name="home" color={'black'} size={25} icon={ faHandshake }/>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Home"
                component={Tabs}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}