import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/HomeScreen';
import EditTask from '../screens/EditTask';
import Colors from '../constants/Colors';
import AdminRoomDetail from '../screens/AdminRoomSliders/AdminRoomDetail';
import AdminRoomSchedule from '../screens/AdminRoomSliders/AdminRoomSchedule';
import AdminUserManage from '../screens/AdminRoomSliders/AdminUserManagment';
import AdminCreatedTasks from '../screens/AdminRoomSliders/AdminTaskManagment';

const Tab = createMaterialTopTabNavigator();

interface CustomTabBarButtonProps {
  label: string;
  onPress: () => void;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
      <Text style={styles.tabBarButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const TopBarWithTabs: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator style={styles.container}
        
        tabBar={(props) => (
          <View style={styles.tabBar}>
            <CustomTabBarButton
              label="Details"
              onPress={() => navigation.navigate('Screen1')}
            />
            <CustomTabBarButton
              label="Members"
              onPress={() => navigation.navigate('Screen2')}
            />
            <CustomTabBarButton
              label="Schedule"
              onPress={() => navigation.navigate('Screen3')}
            />
            <CustomTabBarButton
              label="Tasks"
              onPress={() => navigation.navigate('Screen4')}
            />
          </View>
        )}
      >
        <Tab.Screen name="Screen1" component={AdminRoomDetail} />
        <Tab.Screen name="Screen2" component={AdminUserManage} />
        <Tab.Screen name="Screen3" component={AdminRoomSchedule} />
        <Tab.Screen name="Screen4" component={AdminCreatedTasks} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    top:0,
  },
  tabBar: {
    flexDirection: 'row',
    color: Colors.purpleLight,
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // Set the background color of the tab bar
    paddingHorizontal:12,
    paddingLeft:15,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: Colors.purpletext, // Set the background color of each tab button
    borderRadius: 10, // Set the border radius for rounded corners
  },
  tabBarButtonText: {
    fontWeight: 'bold',
  },
});

export default TopBarWithTabs;
