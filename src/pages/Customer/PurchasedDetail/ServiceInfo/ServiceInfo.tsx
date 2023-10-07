import * as Styled from './ServiceInfo.styled';

import { Col, Row, Typography } from 'antd';

import type { UsageItem } from '../PurchasedDetail.types';
import serviceImg from '@/assets/images/service-img.jpg';

const { Text } = Typography;

const ServiceInfo = ({ usageList }: { usageList: UsageItem[] }) => {
    const handleCancel = () => {};

    return (
        <>
            <Row gutter={[24, 24]} justify="center">
                <Col span={10}>
                    <Styled.ServiceImage src={serviceImg} />
                </Col>

                <Col span={14}>
                    <Styled.ServiceTitle level={1}>Mama at home</Styled.ServiceTitle>

                    <Styled.ServiceDate>15/9/2023 - 15/9/2024</Styled.ServiceDate>

                    <Styled.ServiceType>
                        <Text strong>Type:</Text> Package
                    </Styled.ServiceType>

                    <Styled.SeviceCurrentOwn level={3}>You currently own:</Styled.SeviceCurrentOwn>

                    {usageList.map((item) => (
                        <Styled.UsageItem key={item.id}>
                            <Styled.UsageIcon>{item.icon}</Styled.UsageIcon>

                            <Styled.UsageServiceName>{item.serviceName}</Styled.UsageServiceName>

                            <Styled.UsageProgress
                                percent={(item.quantityRemaining / item.quantityPurchased) * 100}
                            />

                            <Styled.UsageCount>
                                <Styled.UsageRemaining>
                                    {item.quantityRemaining}
                                </Styled.UsageRemaining>

                                <Text>{item.unitOfMeasure}</Text>
                            </Styled.UsageCount>
                        </Styled.UsageItem>
                    ))}
                </Col>
            </Row>

            <Row justify="end">
                <Styled.CancelButton type="primary" onClick={handleCancel}>
                    Cancel package
                </Styled.CancelButton>
            </Row>
        </>
    );
};

export default ServiceInfo;
