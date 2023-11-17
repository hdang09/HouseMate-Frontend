import { Typography } from 'antd';
import { Fragment } from 'react';
import { PackageListItemType, TypeListType } from '@/pages/ServiceDetail/ServiceDetail.type';
import * as St from './Description.styled';

const { Title, Paragraph, Text } = Typography;

const Description = ({
    title,
    desc,
    typeList,
    packageListItem,
}: {
    title: string;
    desc: string;
    typeList: TypeListType[];
    packageListItem: PackageListItemType[];
}) => {
    return (
        <St.DescWrapper>
            <Title level={2}>Về {title}</Title>

            {packageListItem.length > 0 && (
                <St.DescContent>
                    <Paragraph>Trong gói dịch vụ này gồm có:</Paragraph>
                    <ul>
                        {packageListItem.map((item) => (
                            <li key={item.singleServiceId}>
                                <Text>{item.service.titleName}: </Text>
                                <Text> {item.quantity} </Text>
                                <Text>{item.service.unitOfMeasure}</Text>
                            </li>
                        ))}
                    </ul>
                </St.DescContent>
            )}

            <St.DescContent>
                <Paragraph>{desc}</Paragraph>
            </St.DescContent>

            {packageListItem.length > 0 &&
                packageListItem.map((item) => {
                    return (
                        <Fragment key={item.singleServiceId}>
                            <St.DescContent>
                                <Paragraph>Dịch vụ {item.service.titleName}:</Paragraph>
                                <Text>{item.service.description}</Text>
                            </St.DescContent>

                            {item.typeList.length > 0 && (
                                <St.DescContent>
                                    <Paragraph>Trong dịch vụ này gồm có:</Paragraph>
                                    <ul>
                                        {item.typeList.map((item) => (
                                            <li key={item.serviceTypeId}>
                                                <Text>{item.typeName}</Text>
                                            </li>
                                        ))}
                                    </ul>
                                </St.DescContent>
                            )}
                        </Fragment>
                    );
                })}

            {typeList.length > 0 && (
                <St.DescContent>
                    <Paragraph>Trong dịch vụ này gồm có:</Paragraph>
                    <ul>
                        {typeList.map((item) => (
                            <li key={item.serviceTypeId}>
                                <Text>{item.typeName}</Text>
                            </li>
                        ))}
                    </ul>
                </St.DescContent>
            )}
        </St.DescWrapper>
    );
};

export default Description;
