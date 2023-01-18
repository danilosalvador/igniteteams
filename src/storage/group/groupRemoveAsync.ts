import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupListAsync } from './groupListAsync';

export async function groupRemoveAsync(group: string): Promise<void> {
    try {
        const list = await groupListAsync()
        const filtered = list.filter(item => item !== group);

        const storage = JSON.stringify(filtered);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

        const key = `${PLAYER_COLLECTION}-${group}`;
        await AsyncStorage.removeItem(key);
    } catch (error) {
        throw error;
    }
}
