import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseImageURL = "https://image.tmdb.org/t/p/w500"

 export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 export const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/;
    return passwordRegex.test(password);
  };

  export const saveData = async (key: string, value: boolean) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("Data saved!");
    } catch (e) {
      console.error("Failed to save data.", e);
    }
  };
  
  export const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Failed to fetch data.", e);
    }
  };

  export const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Data removed!");
    } catch (e) {
      console.error("Failed to remove data.", e);
    }
  };

  