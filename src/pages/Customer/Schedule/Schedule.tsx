import * as Styled from './Schedule.styled';

import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Calendar from '@/components/Calendar';
import Container from '@/components/Container';
import Link from '@/components/Link';
import UsageInfo from '@/components/UsageInfo';
import { UsageType } from '@/components/UsageInfo/UsageInfo';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';
import { getSchedule } from '@/utils/userUsageAPI';
import { useAppSelector } from '@/hooks';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'Schedule',
    },
];

const PurchasedDetail = () => {
    // Fetch API
    const [loading, setLoading] = useState(false);

    // Re-render when schedule is craeted using scheduleServiceId
    const scheduleServiceId = useAppSelector((state) => state.schedules.serviceId);

    const [usages, setUsages] = useState<UsageType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                // Show skeleton
                setLoading(true);

                // Fetch API
                const { data } = await getSchedule();

                // Change type in response to Date
                const newUsages = data.map((usage: UsageType) => ({
                    ...usage,
                    startDate: usage.startDate ? new Date(usage.startDate) : null,
                    endDate: usage.endDate ? new Date(usage.endDate) : null,
                    listUserUsage:
                        usage.listUserUsage &&
                        usage.listUserUsage.map((purchasedService) => ({
                            ...purchasedService,
                            startDate: purchasedService.startDate
                                ? new Date(purchasedService.startDate)
                                : null,
                            endDate: purchasedService.endDate
                                ? new Date(purchasedService.endDate)
                                : null,
                        })),
                }));

                // Store response
                setUsages(newUsages);
            } finally {
                setLoading(false);
            }
        })();
    }, [scheduleServiceId]);

    return (
        <>
            <BreadcrumbBanner
                title={{
                    firstLine: ' Welcome to my',
                    secondLine: ['schedule', ''],
                    thirdLine: 'for service!',
                }}
                breadcrumbItems={breadcrumbItems}
                image={breadcrumbBannerImage}
            />

            <Styled.ScheduleSection>
                <Container>
                    <UsageInfo
                        title="Danh sách dịch vụ"
                        subTitle="Bạn đang sở hữu"
                        description="Chi tiết"
                        buttonTitle="Xem dịch vụ đã mua"
                        routeNavigate={config.routes.customer.purchased}
                        usages={usages}
                        loading={loading}
                    />

                    <Calendar />
                </Container>
            </Styled.ScheduleSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
