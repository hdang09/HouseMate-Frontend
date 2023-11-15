import * as Styled from './DefaultBanner.styled';

import Container from '@/components/Container';
import { IoIosArrowForward } from 'react-icons/io';
import Link from '@/components/Link';
import { Typography } from 'antd';
import bannerImg from '@/assets/images/banner-img.webp';
import broom from '@/assets/svg/broom-icon.svg';
import config from '@/config';
import fallbackImg from '@/assets/images/fallback-img.png';
import { theme } from '@/themes';

const { Text } = Typography;

const DefaultBanner = () => {
    return (
        <Styled.DefaultBannerSection>
            <Container>
                <Styled.DefaultBannerWrapper>
                    <Styled.DefaultBannerHeading level={1}>
                        <Text>Let's Make</Text>
                        <Text>Your Apartment More</Text>
                        <Text>Convenient</Text>
                    </Styled.DefaultBannerHeading>

                    <Link to={config.routes.public.shop}>
                        <Styled.DefaultBannerButton type="primary">
                            <Text>Khám phá ngay</Text>
                            <IoIosArrowForward size={24} color={theme.colors.white} />
                        </Styled.DefaultBannerButton>
                    </Link>

                    <Styled.DefaultBannerImage
                        src={bannerImg}
                        alt="Let's Make Your Apartment More Convenient"
                        fallback={fallbackImg}
                        preview={false}
                        height={533}
                    />

                    <Styled.BroomIcon src={broom} alt="icon" />
                </Styled.DefaultBannerWrapper>
            </Container>
        </Styled.DefaultBannerSection>
    );
};

export default DefaultBanner;
