import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator.js';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}




// import "./global.css"
// import { Text, View } from "react-native"
// import { verifyInstallation } from "nativewind"

// const App = () => {
//   verifyInstallation()

//   return (
//     <View className="flex-1 items-center justify-center bg-blue-500">
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App