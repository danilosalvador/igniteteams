import styled, { css } from 'styled-components/native';

import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
    flex: 1;

    ${({ theme }) => css`
        color: ${theme.COLORS.WHITE};
        background-color: ${theme.COLORS.GRAY_700};
        font-size: ${theme.FONT_SIZE.MD}px;
    `}
    
    border-radius: 6px;
    padding: 20px;

    min-height: 56px;
    max-height: 56px;
`;