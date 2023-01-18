import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    flex: 1;

    background-color: ${({ theme }) => theme.COLORS.GRAY_600};

    padding: 24px;
`;

export const Form = styled.View`
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};

    flex-direction: row;
    justify-content: center;

    border-radius: 6px;
`;

export const HeaderTeamList = styled.View`
    width: 100%;

    margin: 24px 0;

    flex-direction: row;
    align-items: center;
`;

export const NumberOfPlayers = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.WHITE};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `}
`;
