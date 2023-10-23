import * as Styled from './UsageInfo.styled';

import { Col, Collapse, List, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import type { CollapseProps } from 'antd';
import USAGES from './Usage.dummy.json';
import UsageInfoItem from './UsageInfoItem';
import moment from 'moment';
import serviceImg from '@/assets/images/service-img.webp';

const { Text } = Typography;

const UsageInfo = () => {
    const [usages, setUsages] = useState<CollapseProps['items']>();

    useEffect(() => {
        // TODO: Fetch API
        const data = USAGES.map((usage, index) => {
            return {
                key: index,
                label: <UsageInfoItem service={usage.service} />,
                children: (
                    <List
                        dataSource={usage.listUserUsage}
                        // TODO: Fix type 'any'
                        renderItem={(item: any) => (
                            <List.Item>
                                ⦿ {item.remaining}/{item.total} gói dịch vụ{' '}
                                {usage.service.titleName} (
                                {moment(item.startDate).format('DD/MM/yyyy')} -{' '}
                                {moment(item.endDate).format('DD/MM/yyyy')})
                            </List.Item>
                        )}
                    />
                ),
            };
        });

        setUsages(data);
    }, []);

    const handleCancel = () => {};

    return (
        <Styled.Wrapper>
            <Row gutter={[24, 24]}>
                <Col xs={0} md={8}>
                    <Styled.ServiceImage src={serviceImg} />
                </Col>

                <Col xs={24} md={16}>
                    <Styled.ServiceTitle level={1}>
                        {'Mama at home' || 'You currently own'}
                    </Styled.ServiceTitle>

                    <Styled.ServiceDate>
                        {`15/9/2023 - 15/9/2024` || 'Description'}
                    </Styled.ServiceDate>

                    <Styled.ServiceType>
                        <Text strong>Type:</Text> {true ? 'Package' : 'Single'}
                    </Styled.ServiceType>

                    <Styled.SeviceCurrentOwn level={3}>You currently own:</Styled.SeviceCurrentOwn>

                    <Collapse ghost items={usages} expandIconPosition="end" />
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
