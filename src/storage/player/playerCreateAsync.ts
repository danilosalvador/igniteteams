import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';
import { PlayerDTO } from '@dto/PlayerDTO';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { playerListAsync } from './playerListAsync';

export async function playerCreateAsync(player: PlayerDTO, group: string): Promise<void> {
    try {
        if (player.name.trim().length === 0) {
            throw new AppError('Digite um nome para o jogador.');
        }

        const list = await playerListAsync(group);

        const exists = list.filter(item => item.name === player.name);

        if (exists.length > 0) {
            throw new AppError(`Esse jogador já está inserido no time ${exists[0].team}`);
        }

        const storage = JSON.stringify([...list, player]);
        const key = `${PLAYER_COLLECTION}-${group}`;

        await AsyncStorage.setItem(key, storage);
    } catch (error) {
        throw error;
    }
}
