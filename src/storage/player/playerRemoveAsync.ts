import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { playerListAsync } from './playerListAsync';

export async function playerRemoveAsync(playerName: string, group: string) : Promise<void> {
    try {
        const list = await playerListAsync(group);
        const filtered = list.filter(item => item.name !== playerName);

        const storage = JSON.stringify(filtered);
        const key = `${PLAYER_COLLECTION}-${group}`;

        await AsyncStorage.setItem(key, storage);
    } catch (error) {
        throw error;
    }
}
