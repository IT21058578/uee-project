import { useEffect } from "react";
import  Toast from 'react-native-toast-message';
import "react-toastify/dist/ReactToastify.css";
import { setItem } from "../utils/Genarals";
import { useNavigation } from "@react-navigation/native";
import RoutePaths from "../utils/RoutePaths";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setUser } from "../Redux/slices/userSlice";

export const HandleResult = ({ result }: { result: any }) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

  useEffect(() => {
    if (result.isError) {
      // Handle error response
      Toast.show({
        type: 'error',
        text1: result.error.message || 'An error occurred.',
      });
    } else if (result.isSuccess) {
      // Handle success response
      const responseData = result.data;

      if (responseData.tokens && responseData.user) {
        // Assuming responseData.tokens.accessToken contains the access token
        setItem(RoutePaths.token, responseData.tokens.accessToken);

        // Assuming responseData.user contains the user data
          setItem("user", responseData.user);
          dispatch(setUser(responseData.user));

        // Redirect to the appropriate route based on user data
          navigation.navigate("Home");

      } else {
        // Handle invalid response data
        Toast.show({
            type: 'error',
            text1: 'Invalid response data.',
          });
      }

      Toast.show({
        type: 'success',
        text1: responseData.message || 'Login successful.',
      });
    }
  }, [result]);

  return null; 
};
