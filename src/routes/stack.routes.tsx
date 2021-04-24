import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Comfirmation } from "../pages/Comfirmation";

const StackRoutes = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <StackRoutes.Screen name={routes.welcome} component={Welcome} />
    <StackRoutes.Screen
      name={routes.userIdentification}
      component={UserIdentification}
    />
    <StackRoutes.Screen name={routes.confirmation} component={Comfirmation} />
  </StackRoutes.Navigator>
);

export const routes = {
  welcome: "Welcome",
  userIdentification: "userIdentification",
  confirmation: "confirmation",
};
