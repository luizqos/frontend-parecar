import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Usuario from "../pages/Usuario";
import CadastroUsuario from "../pages/CadastroUsuario";
import EsqueciSenha from "../pages/EsqueciSenha";
import Reserva from "../pages/Reserva";

import BottonNew from "../components/buttons/ButtonNew";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "grey",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 12, fontFamily: "Montserrat_700Bold" },
        tabBarItemStyle: {
          width: 100,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#FFBE00",
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Reservas"
        component={Reserva}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Conta"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Financeiro"
        component={Cadastro}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            color: "transparent",
          },
          tabBarIcon: ({ color, size }) => (
            <BottonNew color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Veiculos"
        component={Cadastro}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-back" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Meus Dados"
        component={Usuario}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
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
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenha}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
