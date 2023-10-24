import * as Styled from './PurchasedDetail.styled';

import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { Category } from '@/utils/enums';
import Container from '@/components/Container';
import Link from '@/components/Link';
import USAGES from './PurchasedDetail.dummy.json';
import UsageInfo from '@/components/UsageInfo';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';
import moment from 'moment';

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

// TODO: Fix type 'any'
type UsageType = {
    title: string;
    description: string;
    serviceType: string;
    usages: any[];
};

const PurchasedDetail = () => {
    const [usage, setUsage] = useState<UsageType>({
        title: '',
        description: '',
        serviceType: '',
        usages: [],
    });

    useEffect(() => {
        // TODO: Fetch API
        const data = USAGES;

        const usageInfo = {
            title: data?.service?.titleName,
            description: `${moment(data.startDate).format('DD/MM/yyyy')}
             - ${moment(data.endDate).format('DD/MM/yyyy')}`,
            serviceType: data.service.package ? Category.PACKAGE_SERVICE : Category.SINGLE_SERVICE,
            usages: data.list,
        };

        setUsage(usageInfo);
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
                    <UsageInfo {...usage} />
                </Container>
            </Styled.PurchasedDetailSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
