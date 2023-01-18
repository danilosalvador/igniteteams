import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupListAsync() : Promise<string[]> {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

        const list: string[] = storage ? JSON.parse(storage) : [];

        return list;
    } catch (error) {
        throw error;
    }
}
