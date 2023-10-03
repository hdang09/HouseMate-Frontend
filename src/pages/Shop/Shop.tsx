import { Col, RadioChangeEvent, Row, Select, Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react';

import image from '@/assets/images/breadcrumb-banner-img.png';
import BannerBreadcrumb from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import ServiceList from '@/components/ServiceList';
import { ServiceType } from '@/components/ServiceItem';
import Sidebar from '@/components/Sidebar';
import Checkbox from '@/components/Sidebar/Checkbox';
import Radio from '@/components/Sidebar/Radio';
import { ratingOptions, serviceOptions, sortOptions } from '@/components/Sidebar/Sidebar.options';
import config from '@/config';
import servicesDummy from '@/pages/Admin/ViewServiceList/ViewServiceList.dummy';
import { SaleStatus } from '@/utils/enums';

import * as Styled from './Shop.styled';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Search from '@/components/Search';

const { Text } = Typography;

const grid = {
    gutter: [30, 30],
    xs: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 3,
};

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'Shop',
    },
];

const Shop = () => {
    const [services, setServices] = useState<ServiceType[]>([]);

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);

    // Search
    const [searchValue, setSearchValue] = useState('');

    // Dropdown
    const [dropdownValue, setDropdownValue] = useState('ltu');

    // Checkbox category list
    const [checkedCategoryList, setCheckedServiceList] = useState<CheckboxValueType[]>([]);
    const categoryCheckAll = serviceOptions.length === checkedCategoryList.length;

    // Rating radio
    const [radioValue, setRadioValue] = useState('');

    // Fetch API search services
    useEffect(() => {
        console.log(searchValue);
    }, [searchValue]);

    // Fetch API dropdown
    useEffect(() => {
        console.log(dropdownValue);
    }, [dropdownValue]);

    // Fetch API filter services by category
    useEffect(() => {
        console.log(checkedCategoryList);
    }, [checkedCategoryList, categoryCheckAll]);

    // Fetch API filter services by rating
    useEffect(() => {
        console.log(radioValue);
    }, [radioValue]);

    // Fetch API all services
    useEffect(() => {
        const getAllServices = () => {
            try {
                setLoading(true);
                // ...
                // ... Fetch API
                // ...
                // TODO: Waiting filter from server
                setServices(servicesDummy.filter((x) => x.saleStatus != SaleStatus.DISCONTINUED));
            } finally {
                setLoading(false);
            }
        };

        getAllServices();
    }, []);

    const handleSearch = (value: string) => {
        const data = value.trim();

        if (data.length !== 0) {
            setSearchValue(data);
        }
    };

    const handleDropdownSelected = (value: string) => {
        setDropdownValue(value);
    };

    const handleCategoryCheckbox = (list: CheckboxValueType[]) => {
        setCheckedServiceList(list);
    };

    const handleRatingRadio = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        <>
            <BannerBreadcrumb
                title={{
                    firstLine: 'Welcome to',
                    secondLine: ['House', 'Mate'],
                    thirdLine: 'service shop!',
                }}
                breadcrumbItems={breadcrumbItems}
                image={image}
            />

            <Styled.ShopSection>
                <Container>
                    <Row>
                        <Col span={6}></Col>

                        <Col span={18}>
                            <Search placeholder="Input search text" handleSearch={handleSearch} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Styled.ShopFilterWrapper>
                                <Text>Sort By Price:</Text>

                                <Select
                                    defaultValue="Lower to upper"
                                    onChange={handleDropdownSelected}
                                    options={sortOptions}
                                    popupClassName="shop-dropdown"
                                />
                            </Styled.ShopFilterWrapper>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col span={6}>
                            <Styled.ShopSidebar>
                                <Sidebar title="Service Category">
                                    <Checkbox
                                        options={serviceOptions}
                                        checkedList={checkedCategoryList}
                                        handleCheckbox={handleCategoryCheckbox}
                                    />
                                </Sidebar>

                                <Sidebar title="Rating star">
                                    <Radio
                                        options={ratingOptions}
                                        value={radioValue}
                                        handleRadio={handleRatingRadio}
                                    />
                                </Sidebar>
                            </Styled.ShopSidebar>
                        </Col>

                        <Col span={18}>
                            <Skeleton loading={loading}>
                                <ServiceList
                                    pageSize={9}
                                    services={services}
                                    grid={grid}
                                    cardWidth={270}
                                />
                            </Skeleton>
                        </Col>
                    </Row>
                </Container>
            </Styled.ShopSection>
        </>
    );
};

export default Shop;
