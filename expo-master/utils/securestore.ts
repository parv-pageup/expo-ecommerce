import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    console.log("No values stored under that key.");
  }
}

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export { getValueFor, save };
