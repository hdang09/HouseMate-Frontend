import * as Styled from './Schedule.styled';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Calendar from '@/components/Calendar';
import Container from '@/components/Container';
import Link from '@/components/Link';
import USAGES from './Schedule.dummy.json';
import UsageInfo from '@/components/UsageInfo';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'Schedule',
    },
];

const PurchasedDetail = () => {
    // TODO: Fetch API

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
                        title="You currently own"
                        description="Description"
                        usages={USAGES}
                    />
                    <Calendar />
                </Container>
            </Styled.ScheduleSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
