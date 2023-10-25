import { Typography } from 'antd';
import * as St from './Description.styled';
import { PackageListItemType } from '../ServiceDetail.type';

const { Title, Paragraph, Text } = Typography;

const Description = ({ desc, list }: { desc: string; list: PackageListItemType[] }) => {
    return (
        <St.DescWrapper>
            <Title level={2}>About Mama at home</Title>

            {list.length > 0 && (
                <St.DescContent>
                    <Paragraph>Trong gói dịch vụ này gồm có:</Paragraph>
                    <ul>
                        {list.map((item) => (
                            <li key={item.singleServiceId}>
                                <Text>{item.singleServiceName}:</Text>
                            </li>
                        ))}
                    </ul>
                </St.DescContent>
            )}

            <St.DescContent>
                <Paragraph>{desc}</Paragraph>
            </St.DescContent>

            {list.map((item) => (
                <St.DescContent key={item.singleServiceId}>
                    <Paragraph>Dịch vụ {item.singleServiceName}:</Paragraph>
                    <Text>{item.description}</Text>
                </St.DescContent>
            ))}
        </St.DescWrapper>
    );
};

export default Description;
