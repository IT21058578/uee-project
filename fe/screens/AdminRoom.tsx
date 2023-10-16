import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBarRoom from '../components/Rooms/TopBarRoom'; // Import your TopBarRoom component
import TopBarWithTabs from '../navigation/RoomTopNavigator'; // Import your TopBarWithTabs component

const AdminRoom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <TopBarRoom />
      </View>
      <View style={styles.box2}>
        <TopBarWithTabs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Arrange the two boxes vertically
  },
  box1: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight:110,
    elevation: 4, // Add a shadow to the boxes (optional)
  },
  box2: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4, // Add a shadow to the boxes (optional)
  },
});

export default AdminRoom;

