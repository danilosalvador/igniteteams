import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Loading } from '@components/Loading';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { PlayerDTO } from '@dto/PlayerDTO';
import { groupRemoveAsync } from '@storage/group/groupRemoveAsync';
import { playerCreateAsync } from '@storage/player/playerCreateAsync';
import { playerListByTeamAsync } from '@storage/player/playerListByTeamAsync';
import { playerRemoveAsync } from '@storage/player/playerRemoveAsync';

import { Container, Form, HeaderTeamList, NumberOfPlayers } from './styles';

type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState<PlayerDTO[]>([]);
    const [teams, setTeams] = useState(['Time A', 'Time B']);
    const [teamSelected, setTeamSelected] = useState('Time A');
    
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const navigation = useNavigation();

    const playerNameInputRef = useRef<TextInput>(null);

    async function handleAdd() {
        try {
            const player: PlayerDTO = {
                name: playerName,
                team: teamSelected,
            }

            await playerCreateAsync(player, group);

            //Retira o focus do TextInput
            playerNameInputRef.current?.blur();
            //Fecha o teclado (opcional, o blur já realiza essa função)
            //Keyboard.dismiss();

            setPlayerName('');
            loadPlayers();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Ops...', error.message);
            } else {
                Alert.alert('Ops...', 'Não foi possível salvar o nome do jogador.');
                console.log(error);
            }
        }
    }

    async function handleRemove(player: string) {
        try {
            await playerRemoveAsync(player, group);
            
            loadPlayers();
        } catch (error) {
            Alert.alert('Ops...', 'Não foi possível remover o jogador.');
            console.log(error);
        }
    }

    function handleRemoveGroup() {
        Alert.alert(
            'Remover turma?',
            `Confirmar a exclusão da turma ${group}?`,
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', style: 'destructive', onPress: () => removeGroup()}
            ]);
    }

    async function loadPlayers() {
        try {
            setIsLoading(true);

            const list = await playerListByTeamAsync(group, teamSelected);

            setPlayers(list);
        } catch (error) {
            Alert.alert('ops...', 'Não foi possível carregar a lista de jogadores');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeGroup() {
        try {
            await groupRemoveAsync(group);

            navigation.navigate('groups');
        } catch (error) {
            Alert.alert('Ops...', 'Não foi possível remover a turma');
            console.log(error);
        }
    }

    useEffect(() => {
        loadPlayers();
    }, [teamSelected]);

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input
                    placeholder="Nome do jogador"
                    autoCorrect={false}
                    inputRef={playerNameInputRef}
                    value={playerName}
                    onChangeText={setPlayerName}
                    returnKeyType='done'
                    onSubmitEditing={handleAdd}
                />
                <ButtonIcon 
                    icon="add-circle-outline"
                    onPress={handleAdd}
                />
            </Form>

            <HeaderTeamList>
                <FlatList
                    data={teams}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === teamSelected}
                            onPress={() => setTeamSelected(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderTeamList>

            {   
                isLoading
                ? (<Loading />)
                : (
                    <FlatList
                        data={players}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => { handleRemove(item.name); }}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <ListEmpty
                                message="Não há jogadores cadastrados"
                            />
                        }
                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            players.length === 0 && { flex: 1 },
                        ]}
                    />
                )
            }

            <Button
                title="Remover Turma"
                type="SECUNDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    );
}
