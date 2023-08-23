import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#000',
      tabBarLabelStyle: { fontSize: 14, fontFamily: 'Montserrat_400Regular'},
      tabBarItemStyle: { width: 100 },
      tabBarStyle: { position: 'absolute', backgroundColor: '#FFBE00' },
    }}
    >
      <Tab.Screen
        name="Conta"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-circle" color={'black'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Financeiro"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="cash" color={'black'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Inicio"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="map-marker-radius-outline" color={'black'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Veiculos"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="car-back" color={'black'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="cog-outline" color={'black'} size={30} />
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}