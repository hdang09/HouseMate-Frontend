import * as Styled from './PurchasedDetail.styled';

import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { Category } from '@/utils/enums';
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

type DetailType = {
    title: string;
    description: string;
    serviceType: string;
    usages: UsageType[];
};

const PurchasedDetail = () => {
    // Skeleton
    const [loading, setLoading] = useState(false);

    const [detail, setDetail] = useState<DetailType>({
        title: '',
        description: '',
        serviceType: '',
        usages: [],
    });
    const { purchasedId } = useParams();

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
                    description: `${moment(data.startDate).format('DD/MM/yyyy')}
             - ${moment(data.endDate).format('DD/MM/yyyy')}`,
                    serviceType: data.service.package
                        ? Category.PACKAGE_SERVICE
                        : Category.SINGLE_SERVICE,
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
                        <UsageInfo {...detail} />
                    </Skeleton>
                </Container>
            </Styled.PurchasedDetailSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
