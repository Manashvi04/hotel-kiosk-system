import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import CheckInScreen from "../screens/CheckInScreen";
import CheckInOptionScreen from "../screens/CheckInOptionScreen";
import AvailableRoomScreen from "../screens/AvailableRoomScreen";

import GuestInformationScreen from "../screens/GuestInformationScreen";
import IdVerificationScreen from "../screens/IdVerificationScreen";
import ReservationSummaryScreen from "../screens/ReservationSummaryScreen";
import BookingVerificationScreen from "../screens/BookingVerificationScreen";

import PaymentScreen from "../screens/PaymentScreen";
import PaymentFailedScreen from "../screens/PaymentFailedScreen";
import CardPaymentScreen from "../screens/CardPaymentScreen";
import UpiPaymentScreen from "../screens/UpiPaymentScreen";
import WalletPaymentScreen from "../screens/WalletPaymentScreen";
import CashPaymentScreen from "../screens/CashPaymentScreen";
import PayLaterScreen from "../screens/PayLaterScreen";

import ConfirmationScreen from "../screens/ConfirmationScreen";
import KeyCardScreen from "../screens/KeyCardScreen";
import ReceiptScreen from "../screens/ReceiptScreen";

import CheckOutScreen from "../screens/CheckOutScreen";
import CheckOutSummaryScreen from "../screens/CheckOutSummaryScreen";
import CheckOutCompleteScreen from "../screens/CheckOutCompleteScreen";
import FeedbackScreen from "../screens/FeedbackScreen";

import RoomExtensionScreen from "../screens/RoomExtensionScreen";
import ExtensionCompleteScreen from "../screens/ExtensionCompleteScreen";

import VisitorManagementScreen from "../screens/VisitorManagementScreen";
import VisitorRegistrationScreen from "../screens/VisitorRegistrationScreen";
import VisitorPassScreen from "../screens/VisitorPassScreen";
import VisitorHistoryScreen from "../screens/VisitorHistoryScreen";
import PreRegisteredScreen from "../screens/PreRegisteredScreen";
import VisitorExitScreen from "../screens/VisitorExitScreen";

import NeedHelpScreen from "../screens/NeedHelpScreen";

import SupportScreen from "../screens/SupportScreens";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckInOption"
          component={CheckInOptionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestInformation"
          component={GuestInformationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="IdVerification"
          component={IdVerificationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AvailableRoom"
          component={AvailableRoomScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BookingVerification"
          component={BookingVerificationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ReservationSummary"
          component={ReservationSummaryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailedScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CardPayment"
          component={CardPaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpiPayment"
          component={UpiPaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WalletPayment"
          component={WalletPaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CashPayment"
          component={CashPaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PayLater"
          component={PayLaterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Receipt"
          component={ReceiptScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="KeyCard"
          component={KeyCardScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckOut"
          component={CheckOutScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckOutSummary"
          component={CheckOutSummaryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckOutComplete"
          component={CheckOutCompleteScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RoomExtension"
          component={RoomExtensionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ExtensionComplete"
          component={ExtensionCompleteScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VisitorManagement"
          component={VisitorManagementScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VisitorRegistration"
          component={VisitorRegistrationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PreRegistered"
          component={PreRegisteredScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VisitorPass"
          component={VisitorPassScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VisitorExit"
          component={VisitorExitScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VisitorHistory"
          component={VisitorHistoryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NeedHelp"
          component={NeedHelpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
