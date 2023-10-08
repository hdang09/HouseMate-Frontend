import { Typography } from 'antd';
import * as St from './Description.styled';

const { Title, Paragraph } = Typography;

const Description = ({ desc }: { desc: string | undefined }) => {
    return (
        <St.DescWrapper>
            <Title level={2}>About Mama at home</Title>
            <Paragraph>{desc}</Paragraph>
        </St.DescWrapper>
    );
};

export default Description;
