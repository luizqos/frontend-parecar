import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DataPicker = ({ label, onDateChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onDateChange(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectData}
        onPress={() => {
          showDatePicker();
        }}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minuteInterval={15}
        minimumDate={new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectData: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 2,
    width: "50%",
    height: 35,
    marginLeft: 3,
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DataPicker;
