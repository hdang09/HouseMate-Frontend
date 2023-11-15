import * as Styled from './PurchasedDetail.styled';

import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { CategoryLabel } from '@/utils/enums';
import Container from '@/components/Container';
import Link from '@/components/Link';
import { Skeleton } from 'antd';
import UsageInfo from '@/components/UsageInfo';
import { UsageType } from '@/components/UsageInfo/UsageInfo';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';
import { getPurchasedDetail } from '@/utils/userUsageAPI';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: <Link to={config.routes.customer.purchased}>My purchased</Link>,
    },
    {
        title: 'Manage purchased service',
    },
];

const PurchasedDetail = () => {
    // Skeleton
    const [loading, setLoading] = useState(false);

    const [detail, setDetail] = useState({
        title: '',
        subTitle: '',
        serviceType: '',
        usages: [],
    });
    const { purchasedId } = useParams();

    useDocumentTitle(`${detail.title ? `${detail.title} | HouseMate` : 'Đang Tải...'}`);

    useEffect(() => {
        (async () => {
            try {
                // Show skeleton
                setLoading(true);

                // Fetch API
                if (!purchasedId) return;
                const { data } = await getPurchasedDetail(+purchasedId);

                // Change type in response to Date
                const newUsages = data.listUserUsage.map((usage: UsageType) => ({
                    ...usage,
                    startDate: usage.startDate ? new Date(usage.startDate) : null,
                    endDate: usage.endDate ? new Date(usage.endDate) : null,
                }));

                // Convert data
                const usageInfo = {
                    title: data?.service?.titleName,
                    subTitle: `${moment(data.startDate).format('DD/MM/yyyy')}
             - ${moment(data.endDate).format('DD/MM/yyyy')}`,
                    serviceType: data.service.package
                        ? CategoryLabel.PACKAGE
                        : CategoryLabel.SINGLE,
                    usages: newUsages,
                };

                // Store response
                setDetail(usageInfo);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <BreadcrumbBanner
                title={{
                    firstLine: ' Welcome to my',
                    secondLine: ['purchased', ''],
                    thirdLine: 'service!',
                }}
                breadcrumbItems={breadcrumbItems}
                image={breadcrumbBannerImage}
            />

            <Styled.PurchasedDetailSection>
                <Container>
                    <Skeleton loading={loading}>
                        <UsageInfo
                            {...detail}
                            description="Bạn đang sở hữu"
                            buttonTitle="Xem lịch sử dụng"
                            routeNavigate={config.routes.customer.schedule}
                            loading={loading}
                        />
                    </Skeleton>
                </Container>
            </Styled.PurchasedDetailSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
