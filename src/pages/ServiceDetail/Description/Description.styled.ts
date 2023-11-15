import styled from 'styled-components';
import { ServiceDetailTabItem } from '@/pages/ServiceDetail/ServiceDetail.styled';
import { theme } from '@/themes';

export const DescWrapper = styled.section`
    ${ServiceDetailTabItem}

    & div.ant-typography,
    & span.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.31;
    }
    
    & div.ant-typography {
        margin-bottom: 6px;
    }
`;

export const DescContent = styled.div`
    margin-bottom: 23px;

    & li {
        margin-left: 18px;
    }
`;
