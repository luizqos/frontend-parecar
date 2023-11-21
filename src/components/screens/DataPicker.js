import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function DataPicker({ label, onDateChange }) {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("");
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  function inverterData(data) {
    let partes = data.split(" ");
    let dataPartes = partes[0].split("/");
    let novaData =
      dataPartes[2] +
      "/" +
      dataPartes[1] +
      "/" +
      dataPartes[0] +
      " " +
      partes[1];
    return novaData;
  }

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
    onDateChange(
      inverterData(selectedStartDate),
      inverterData(selectedStartDate)
    );
  };

  function formatarDataComDias(dias) {
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    dataAtual.setDate(dataAtual.getDate() + dias);

    const dataFormatada = dataAtual.toISOString().split("T")[0];
    return dataFormatada;
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={{
          width: "100%",
          height: "10%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 10 }}>
            <View>
              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={styles.selectData}>
                  {!selectedStartDate ? label : inverterData(selectedStartDate)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => console.log("Subimit data")}
              style={styles.submitBtn}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
            </TouchableOpacity> */}
          </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="datepicker"
                  minimumDate={formatarDataComDias(0)}
                  maximumDate={formatarDataComDias(7)}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  minuteInterval={15}
                  options={{
                    backgroundColor: "#090C08",
                    textHeaderColor: "#FFA25B",
                    textDefaultColor: "#F6E7C1",
                    selectedTextColor: "#fff",
                    mainColor: "#F4722B",
                    textSecondaryColor: "#D6C7A1",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />
                {/* <DatePicker
                  onSelectedChange={(date) => setSelectedDate(date)}
                /> */}
                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  textData: {
    fontSize: 25,
    color: "#111",
  },
  selectData: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    minWidth: 100,
    height: 35,
    marginLeft: 3,
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#090C08",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
