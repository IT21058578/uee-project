import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import store from "./Redux/store";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <Provider store={store}>
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
    </Provider>
  );
}
