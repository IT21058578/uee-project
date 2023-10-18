import React from 'react';
import { View, Text, StyleSheet, FlatList ,ScrollView } from 'react-native';
import RoomScheduleBox from './schedule/roomScheduleBox';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import { useGetPopulatedRoomScheduleQuery } from '../Redux/API/schedules.api.slice';
import { ActivityIndicator } from 'react-native';
import { getItem } from '../utils/Genarals'
import RoutePaths from '../utils/RoutePaths';
import { useState } from 'react';
import { useEffect } from 'react';

// Function to convert time to a sortable value
function convertTimeToSortableValue(time: string): number {
  const [hourMinute, ampm] = time.split(' ');
  const [hours, minutes] = hourMinute.split(':').map((str) => parseInt(str));
  return ampm === 'PM' ? (hours % 12 + 12) * 60 + minutes : hours * 60 + minutes;
}

interface ScheduleScreenProps {
  selectedDate: Date | null;
  selectedCategory: string | null;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ selectedDate, selectedCategory }) => {

  const formattedDate = selectedDate?.toISOString().split('T')[0];

  const [user, setUser] = useState<{ _id: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getItem(RoutePaths.token);
      if (token) {
        const userData = await getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      }
    };

    fetchData();
  }, []);

  const userID = user?._id;

  const { data, isLoading, isError } = useGetPopulatedRoomScheduleQuery({userID,formattedDate});

  if (isLoading) {
    return <ActivityIndicator style={styles.contentContainer} color="#0000ff" size="large"/>;
  }

  if (isError) {
    return <ActivityIndicator style={styles.contentContainer} color="#0000ff" size="large"/>;
  }

  // Group the schedules by start time
  const groupedSchedules: { [key: string]: any[] } = {};
  
  if (data) {
    data?.content.forEach((schedule: any) => {
      const key = schedule.startTime;
      if (!groupedSchedules[key]) {
        groupedSchedules[key] = [];
      }
      groupedSchedules[key].push(schedule);
    });
  }

  // Sort the keys (start times) in ascending order considering AM and PM
  const sortedKeys = Object.keys(groupedSchedules).sort(
    (a, b) =>
      convertTimeToSortableValue(a) - convertTimeToSortableValue(b)
  );

  return (
    <View style={styles.container}>

      <View style={styles.Box}>
        <Text style={[styles.today, styles.todayPosition]}>Day Plan</Text>
        <Text style={[styles.h45Min, styles.h45MinTypo]}>09 h 45 min</Text>
      </View>

      <FlatList
        data={sortedKeys.map((key) => [key, groupedSchedules[key]]) as (string | any[])[]}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.timeSlotContainer}>
            <Text style={styles.timeSlot}>{item[0]}</Text>
            {item[1].map((schedule: any) => (
                <RoomScheduleBox {...schedule} key={schedule._id}/>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 100,
  },
  container: {
    padding: 25,
  },
  Box: {
    width: 100,
    height: 30,
    marginBottom: 30,
  },
  timeSlotContainer: {
    marginBottom: 16,
  },
  timeSlot: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft:5,
    marginBottom: 8,
    color:Colors.primary,
  },
  scheduleItem: {
    padding: 10,
    backgroundColor: '#e5e5e5',
    marginBottom: 8,
  },
  todayPosition: {
    textAlign: "left",
    color: Colors.darkText,
    left: "auto",
    position: "absolute",
  },
  h45MinTypo: {
    fontFamily: Font["poppins-regular"],
    textAlign: "left",
  },
  today: {
    fontSize: 20,
    width: "auto",
    height: 26,
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    textAlign: "left",
    color: Colors.darkText,
  },
  h45Min: {
    left: 260,
    color: "#000",
    width: 69,
    height: 19,
    fontSize: 14,
    fontFamily: Font["poppins-regular"],
    position: "absolute",
  },
});

export default ScheduleScreen;
