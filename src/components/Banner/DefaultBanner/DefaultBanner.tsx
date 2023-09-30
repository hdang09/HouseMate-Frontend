import { Typography } from 'antd';
import { IoIosArrowForward } from 'react-icons/io';

import fallbackImg from '@/assets/images/fallback-img.png';
import broom from '@/assets/svg/broom-icon.svg';
import bannerImg from '@/assets/images/banner-img.png';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';

import * as Styled from './DefaultBanner.styled';

const { Text } = Typography;

const DefaultBanner = () => {
    return (
        <Styled.BannerSection>
            <Container>
                <Styled.BannerWrapper>
                    <Styled.BannerHeading level={1}>
                        <Text>Let's Make</Text>
                        <Text>Your Apartment More</Text>
                        <Text>Convenient</Text>
                    </Styled.BannerHeading>

                    <Link to={config.routes.shop}>
                        <Styled.BannerButton type="primary">
                            <Text>Discover now</Text>
                            <IoIosArrowForward size={24} color={theme.colors.white} />
                        </Styled.BannerButton>
                    </Link>

                    <Styled.BannerImage
                        src={bannerImg}
                        alt="Let's Make Your Apartment More Convenient"
                        fallback={fallbackImg}
                        preview={false}
                    />

                    <Styled.BroomIcon src={broom} alt="icon" />
                </Styled.BannerWrapper>
            </Container>
        </Styled.BannerSection>
    );
};

export default DefaultBanner;
