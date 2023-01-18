import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupListAsync } from '@storage/group/groupListAsync';

import { Loading } from '@components/Loading';
import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';

export function Groups() {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new');
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group });
    }

    async function loadGroups() {
        try {
            setIsLoading(true);

            const data = await groupListAsync();
            
            setGroups(data);
        } catch (error) {
            Alert.alert('Ops...', 'Não foi possível carregar as turmas.');
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        loadGroups();
    }, []));

    return (
        <Container>
            <Header />
            <Highlight
                title='Turmas'
                subtitle='Jogue com a sua turma'
            />
            {
                isLoading
                ? (<Loading />)
                : (
                    <FlatList 
                        data={groups}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <GroupCard 
                                title={item}
                                onPress={() => handleOpenGroup(item)}
                            />
                        )}
                        contentContainerStyle={groups.length === 0 && { flex: 1 }}
                        ListEmptyComponent={() => (
                            <ListEmpty
                                message='Que tal cadastrar a primeira turma?'
                            />
                        )}
                    />
                )
            }
            <Button
                title="Criar nova turma"
                onPress={handleNewGroup}
            />
        </Container>
    );
}
