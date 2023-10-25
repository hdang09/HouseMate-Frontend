import * as Styled from './UsageInfo.styled';

import { Col, List, Row, Typography } from 'antd';

import { CollapseProps } from 'antd/lib';
import UsageInfoItem from './UsageInfoItem';
import moment from 'moment';
import serviceImg from '@/assets/images/service-img.webp';

// TODO: Fix service's type
export type UsageType = {
    service: any; // ServiceType
    startDate: Date | null;
    endDate: Date | null;
    total: number;
    remaining: number;
    listUserUsage: UsageType[] | null;
};

type UsageProps = {
    title: string;
    description: string;
    serviceType?: string;
    usages: UsageType[];
};

const UsageInfo = ({ title, description, serviceType, usages }: UsageProps) => {
    const collapseItems: CollapseProps['items'] = usages?.map((usage, index) => {
        return {
            key: index,
            label: (
                <UsageInfoItem
                    service={usage.service}
                    remaining={usage.remaining}
                    total={usage.total}
                />
            ),
            children: usage.listUserUsage && (
                <List
                    dataSource={usage.listUserUsage}
                    renderItem={(item) => (
                        <List.Item>
                            • {item.remaining}/{item.total} gói dịch vụ {usage.service.titleName} (
                            {moment(item.startDate).format('DD/MM/yyyy')} -{' '}
                            {moment(item.endDate).format('DD/MM/yyyy')})
                        </List.Item>
                    )}
                />
            ),
            extra: usage.listUserUsage && <Styled.PrimaryText>View detail</Styled.PrimaryText>,
            showArrow: !!usage.listUserUsage,
        };
    });

    const handleCancel = () => {};

    return (
        <Styled.Wrapper>
            <Row gutter={[24, 24]}>
                <Col xs={0} md={8}>
                    <Styled.ServiceImage src={serviceImg} />
                </Col>

                <Col xs={24} md={16}>
                    <Styled.ServiceTitle level={1}>{title}</Styled.ServiceTitle>

                    <Styled.ServiceDate>{description}</Styled.ServiceDate>

                    {serviceType && (
                        <Styled.ServiceType>
                            <Typography.Text strong>Type:</Typography.Text> {serviceType}
                        </Styled.ServiceType>
                    )}

                    <Styled.SeviceCurrentOwn level={3}>You currently own:</Styled.SeviceCurrentOwn>

                    <Styled.Collapse
                        accordion
                        ghost
                        items={collapseItems}
                        expandIconPosition={'end'}
                    />
                </Col>
            </Row>

            <Row justify="end">
                <Styled.CancelButton type="primary" onClick={handleCancel}>
                    Cancel package
                </Styled.CancelButton>
            </Row>
        </Styled.Wrapper>
    );
};

export default UsageInfo;
