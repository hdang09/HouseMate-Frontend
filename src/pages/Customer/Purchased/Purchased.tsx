import { Col, Row } from 'antd';
import { PurchasedFilterWrapper, PurchasedSection, PurchasedSidebar } from './Purchased.styled';
import { expirationOptions, serviceOptions } from '@/components/Sidebar/Sidebar.options';
import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Container from '@/components/Container';
import Link from '@/components/Link';
import MobileFilter from '@/components/Mobile/MobileFilter';
import PurchasedFilter from './PurchasedFilter';
import PurchasedList from '@/components/PurchasedList';
import PurchasedType from './Purchased.type';
import Search from '@/components/Search';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';
import servicesDummy from './Purchased.dummy';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'My purchased',
    },
];

const Purchased = () => {
    // Purchased services
    const [services, setServices] = useState<PurchasedType[]>([]);

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);

    // Search
    const [searchValue, setSearchValue] = useState('');

    // Checkbox category list
    const [checkedCategoryList, setCheckedCategoryList] = useState<CheckboxValueType[]>([]);
    const categoryCheckAll = serviceOptions.length === checkedCategoryList.length;

    // Checkbox expiration list
    const [checkedExpirationList, setCheckedExpirationList] = useState<CheckboxValueType[]>([]);
    const expirationCheckAll = expirationOptions.length === checkedExpirationList.length;

    // Fetch API all services
    useEffect(() => {
        const getAllServices = () => {
            try {
                setLoading(true);
                // ...
                // ... Fetch API
                // ...
                setServices(servicesDummy);
            } finally {
                setLoading(false);
            }
        };

        getAllServices();
    }, []);

    // Fetch API search services
    useEffect(() => {
        console.log(searchValue);
    }, [searchValue]);

    // Fetch API filter services by category
    useEffect(() => {
        console.log(checkedCategoryList);
    }, [checkedCategoryList, categoryCheckAll]);

    // Fetch API filter services by expiration
    useEffect(() => {
        console.log(checkedExpirationList);
    }, [checkedExpirationList, expirationCheckAll]);

    const handleSearch = (value: string) => {
        const data = value.trim();

        if (data.length !== 0) {
            setSearchValue(data);
        }
    };

    const handleCategoryCheckbox = (list: CheckboxValueType[]) => {
        setCheckedCategoryList(list);
    };

    const handleExpirationCheckbox = (list: CheckboxValueType[]) => {
        setCheckedExpirationList(list);
    };

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

            <PurchasedSection>
                <Container>
                    <Row>
                        <Col span={24}>
                            <Search placeholder="Input search text" handleSearch={handleSearch} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <PurchasedFilterWrapper>
                                <MobileFilter>
                                    <PurchasedFilter
                                        checkedCategoryList={checkedCategoryList}
                                        handleCategoryCheckbox={handleCategoryCheckbox}
                                        checkedExpirationList={checkedExpirationList}
                                        handleExpirationCheckbox={handleExpirationCheckbox}
                                    />
                                </MobileFilter>
                            </PurchasedFilterWrapper>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col xl={6} sm={0} xs={0}>
                            <PurchasedSidebar>
                                <PurchasedFilter
                                    checkedCategoryList={checkedCategoryList}
                                    handleCategoryCheckbox={handleCategoryCheckbox}
                                    checkedExpirationList={checkedExpirationList}
                                    handleExpirationCheckbox={handleExpirationCheckbox}
                                />
                            </PurchasedSidebar>
                        </Col>

                        <Col xl={18} sm={24} xs={24}>
                            <PurchasedList loading={loading} services={services} />
                        </Col>
                    </Row>
                </Container>
            </PurchasedSection>
        </>
    );
};

export default Purchased;
