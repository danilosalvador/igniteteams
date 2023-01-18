import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlayerDTO } from '@dto/PlayerDTO';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

export async function playerListAsync(group: string): Promise<PlayerDTO[]> {
    try {
        const key = `${PLAYER_COLLECTION}-${group}`;
        const storage = await AsyncStorage.getItem(key);

        const list: PlayerDTO[] = storage ? JSON.parse(storage) : []; 

        return list;
    } catch (error) {
        throw error;
    }
}