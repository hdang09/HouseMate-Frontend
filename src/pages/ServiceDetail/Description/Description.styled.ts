import styled from 'styled-components';
import { ServiceDetailTabItem } from '@/pages/ServiceDetail/ServiceDetail.styled';
import { theme } from '@/themes';

export const DescWrapper = styled.section`
    ${ServiceDetailTabItem}

    & div.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.31;
    }
`;
