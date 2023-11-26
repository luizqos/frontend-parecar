import AsyncStorage from "@react-native-async-storage/async-storage";
const getStored = async (data) => {
  try {
    const DataString = await AsyncStorage.getItem(data);
    if (DataString) {
      const storedData = JSON.parse(DataString);
      return storedData;
    } else {
      console.log("Nenhum dado encontrado no AsyncStorage.");
    }
  } catch (error) {
    console.error("Erro ao recuperar dados do AsyncStorage:", error);
  }
};
export default getStored;
