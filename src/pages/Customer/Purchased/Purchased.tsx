import { Col, Row } from 'antd';
import { PurchasedFilterWrapper, PurchasedSection, PurchasedSidebar } from './Purchased.styled';
import { expirationOptions, serviceOptions } from '@/components/Sidebar/Sidebar.options';
import { useEffect, useRef, useState } from 'react';

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
import { getMyPurchased } from '@/utils/userUsageAPI';
import { Category } from '@/utils/enums';
import { useDocumentTitle } from '@/hooks';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Trang chủ</Link>,
    },
    {
        title: 'Dịch vụ của tôi',
    },
];

const Purchased = () => {
    useDocumentTitle('Dịch Vụ Của Tôi | HouseMate');

    // Purchased services
    const servicesStore = useRef<PurchasedType[]>([]);
    const [services, setServices] = useState<PurchasedType[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    // Fake filter data by FE
    useEffect(() => {
        if (mounted) {
            let newServices: PurchasedType[] = servicesStore.current;

            // Fake loading data
            setLoading(true);
            setTimeout(() => {
                if (searchValue.length !== 0) {
                    newServices = servicesStore.current.filter((service) =>
                        service.service.titleName.toLowerCase().includes(searchValue.toLowerCase()),
                    );
                    setCurrentPage(1);
                }

                if (!categoryCheckAll && checkedCategoryList.length !== 0) {
                    const isPackage =
                        checkedCategoryList.toString() === Category.PACKAGE_SERVICE_UPPER;
                    newServices = newServices.filter(
                        (service) => service.service.package === isPackage,
                    );
                    setCurrentPage(1);
                }

                if (!expirationCheckAll && checkedExpirationList.length !== 0) {
                    switch (checkedExpirationList.toString()) {
                        case 'os':
                            newServices = newServices.filter((service) => {
                                return new Date(service.endDate).getTime() > Date.now();
                            });
                            setCurrentPage(1);
                            break;

                        case 'oos':
                            newServices = newServices.filter((service) => {
                                return new Date(service.endDate).getTime() < Date.now();
                            });
                            setCurrentPage(1);
                            break;

                        default:
                            newServices = [];
                    }
                }

                setServices(newServices);
                setLoading(false);
            }, 500);
        }
    }, [
        searchValue,
        checkedCategoryList,
        categoryCheckAll,
        checkedExpirationList,
        expirationCheckAll,
    ]);

    // Fetch API all services
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getMyPurchased();
                servicesStore.current = data;
                setServices(data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSearch = (value: string) => {
        const data = value.trim();
        setSearchValue(data);
        setMounted(true);
    };

    const handleCategoryCheckbox = (list: CheckboxValueType[]) => {
        setCheckedCategoryList(list);
        setMounted(true);
    };

    const handleExpirationCheckbox = (list: CheckboxValueType[]) => {
        setCheckedExpirationList(list);
        setMounted(true);
    };

    const handleChangePage = (page: number) => {
        setLoading(true);

        setTimeout(() => {
            setCurrentPage(page);
            setLoading(false);
        }, 500);

        setMounted(true);
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
                            <Search placeholder="Tìm kiếm dịch vụ..." handleSearch={handleSearch} />
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
                            <PurchasedList
                                current={currentPage}
                                loading={loading}
                                services={services}
                                onChange={handleChangePage}
                            />
                        </Col>
                    </Row>
                </Container>
            </PurchasedSection>
        </>
    );
};

export default Purchased;
