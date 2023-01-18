import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export type FilterStyleProps = {
    isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
    ${({ theme, isActive }) => isActive && css`
        border: 1px solid ${theme.COLORS.GREEN_700};
    `};

    margin-right: 12px;
    border-radius: 4px;

    width: 70px;
    height: 38px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    text-transform:  uppercase;

    ${({ theme }) => css`
        color: ${theme.COLORS.WHITE};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `}
`;
