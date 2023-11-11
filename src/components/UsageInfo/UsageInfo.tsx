import * as Styled from './UsageInfo.styled';

import { Button, Col, Empty, List, Row, Skeleton, Typography } from 'antd';

import { CollapseProps } from 'antd/lib';
import { DATE_FORMAT } from '@/utils/constants';
import type { ServiceType } from '@/components/ServiceList/ServiceItem';
import UsageInfoItem from './UsageInfoItem';
import moment from 'moment';
import scheduleImg from '@/assets/svg/schedule.svg';
import { useNavigate } from 'react-router-dom';

export type UsageType = {
    service: ServiceType;
    startDate: Date | null;
    endDate: Date | null;
    total: number;
    remaining: number;
    listUserUsage: UsageType[] | null;
};

type UsageProps = {
    title: string;
    subTitle: string;
    serviceType?: string;
    description: string;
    usages: UsageType[];
    buttonTitle: string;
    routeNavigate: string;
    loading: boolean;
};

const UsageInfo = ({
    title,
    subTitle,
    serviceType,
    description,
    usages,
    buttonTitle,
    routeNavigate,
    loading,
}: UsageProps) => {
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
                            • {item.remaining}/{item.total} {usage.service.unitOfMeasure} dịch vụ{' '}
                            <Typography.Text strong>{item.service.titleName}</Typography.Text> (
                            {moment(item.startDate).format(DATE_FORMAT)} -{' '}
                            {moment(item.endDate).format(DATE_FORMAT)})
                        </List.Item>
                    )}
                />
            ),
            extra: usage.listUserUsage && <Styled.PrimaryText>Xem chi tiết</Styled.PrimaryText>,
            showArrow: !!usage.listUserUsage,
            collapsible: !!usage.listUserUsage ? 'header' : 'disabled',
        };
    });

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(routeNavigate);
    };

    return (
        <Styled.Wrapper>
            <Row gutter={[24, 24]}>
                <Col xs={0} xl={8}>
                    {loading ? (
                        <Skeleton.Avatar size={400} active={true} shape="square" />
                    ) : (
                        <Styled.ServiceImage src={scheduleImg} preview={false} />
                    )}
                </Col>

                <Col xs={24} xl={16}>
                    <Skeleton active loading={loading}>
                        <Styled.ServiceTitle level={1}>{title}</Styled.ServiceTitle>

                        <Styled.ServiceSubTitle level={2}>{subTitle}</Styled.ServiceSubTitle>

                        {serviceType && (
                            <Styled.ServiceType>
                                <Typography.Text strong>Loại:</Typography.Text> {serviceType}
                            </Styled.ServiceType>
                        )}

                        <Styled.SeviceDescription level={3}>{description}</Styled.SeviceDescription>

                        {usages.length === 0 ? (
                            <Empty description="Bạn chưa sở hữu dịch vụ nào" />
                        ) : (
                            <Styled.Collapse
                                destroyInactivePanel={true}
                                accordion
                                ghost
                                items={collapseItems}
                                expandIconPosition={'end'}
                            />
                        )}
                    </Skeleton>
                </Col>
            </Row>

            <Row justify="end">
                <Button type="primary" onClick={handleNavigate} style={{ marginTop: '24px' }}>
                    {buttonTitle}
                </Button>
            </Row>
        </Styled.Wrapper>
    );
};

export default UsageInfo;
