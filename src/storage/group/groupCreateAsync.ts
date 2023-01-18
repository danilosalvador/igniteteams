import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { GROUP_COLLECTION } from '@storage/storageConfig';

import { groupListAsync } from './groupListAsync';

export async function groupCreateAsync(groupName: string) : Promise<void> {
    try {
        if (groupName.trim().length === 0) {
            throw new AppError('Informe nome da turma.');
        }

        const list = await groupListAsync();

        const exists = list.includes(groupName);

        if (exists) {
            throw new AppError('Já existe uma turma com esse nome.');
        }

        const storage = JSON.stringify([...list, groupName]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
