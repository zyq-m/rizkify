import AsyncStorage from "@react-native-async-storage/async-storage";

// Store string
export const storeData = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.log(e);
	}
};

// Get string
export const getData = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		console.log(e);
	}
};

// Store object
export const storeObject = async (key: string, value: object) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		console.log(e);
	}
};

// Get object
export const getObject = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.log(e);
	}
};

export const remove = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		console.log(e);
	}
};

export const removeAll = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		console.log(e);
	}
};
