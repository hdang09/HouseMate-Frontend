import * as Styled from './Shop.styled';

import { Col, RadioChangeEvent, Row, Select, Skeleton, Space, Typography } from 'antd';
import { serviceOptions, sortOptions } from '@/components/Sidebar/Sidebar.options';
import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Container from '@/components/Container';
import Link from '@/components/Link';
import MobileFilter from '@/components/Mobile/MobileFilter';
import { SaleStatus } from '@/utils/enums';
import Search from '@/components/Search';
import ServiceList from '@/components/ServiceList';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import ShopFilter from './ShopFilter';
import config from '@/config';
import servicesDummy from '@/components/ServiceList/ServiceList.dummy';

const { Text } = Typography;

const grid = {
    gutter: [30, 30],
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
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
    const [checkedCategoryList, setCheckedCategoryList] = useState<CheckboxValueType[]>([]);
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
        setCheckedCategoryList(list);
    };

    const handleRatingRadio = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        <>
            <BreadcrumbBanner
                title={{
                    firstLine: 'Welcome to',
                    secondLine: ['House', 'Mate'],
                    thirdLine: 'service shop!',
                }}
                breadcrumbItems={breadcrumbItems}
            />

            <Styled.ShopSection>
                <Container>
                    <Row>
                        <Col span={24}>
                            <Search placeholder="Input search text" handleSearch={handleSearch} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Styled.ShopFilterWrapper>
                                <MobileFilter>
                                    <ShopFilter
                                        checkedCategoryList={checkedCategoryList}
                                        handleCategoryCheckbox={handleCategoryCheckbox}
                                        radioValue={radioValue}
                                        handleRatingRadio={handleRatingRadio}
                                    />
                                </MobileFilter>

                                <Space>
                                    <Text>Sort By Price:</Text>

                                    <Select
                                        defaultValue="Lower to upper"
                                        onChange={handleDropdownSelected}
                                        options={sortOptions}
                                        popupClassName="shop-dropdown"
                                    />
                                </Space>
                            </Styled.ShopFilterWrapper>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col xl={6} sm={0} xs={0}>
                            <Styled.ShopSidebar>
                                <ShopFilter
                                    checkedCategoryList={checkedCategoryList}
                                    handleCategoryCheckbox={handleCategoryCheckbox}
                                    radioValue={radioValue}
                                    handleRatingRadio={handleRatingRadio}
                                />
                            </Styled.ShopSidebar>
                        </Col>

                        <Col xl={18} sm={24} xs={24}>
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
