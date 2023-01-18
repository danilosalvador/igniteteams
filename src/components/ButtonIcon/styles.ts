import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
    type: ButtonIconTypeStyleProps;
}

export const Container = styled(TouchableOpacity)`
    width: 56px;
    height: 56px;

    align-items: center;
    justify-content: center;

    margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_500 : theme.COLORS.RED_DARK,
    size: 24,
}))``;