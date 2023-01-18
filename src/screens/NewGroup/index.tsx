import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';
import { groupCreateAsync } from '@storage/group/groupCreateAsync';

export function NewGroup() {
    const [group, setGroup] = useState(''); 
    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            await groupCreateAsync(group);
            
            navigation.navigate('players', { group });
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Ops...', error.message);
            } else {
                Alert.alert('Ops...', 'Não foi possível criar uma nova turma.');
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlight
                    title="Nova Turma"
                    subtitle="Crie a turma para adicionar as pessoas."
                />
                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroup}/>
                <Button
                    style={{ marginTop: 24}}
                    title="Criar"
                    onPress={handleNewGroup}/>
            </Content>
        </Container>
    );
}
