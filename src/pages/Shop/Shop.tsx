import { Col, Flex, PaginationProps, RadioChangeEvent, Row, Select, Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useState } from 'react';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import MobileFilter from '@/components/Mobile/MobileFilter';
import Search from '@/components/Search';
import ServiceList from '@/components/ServiceList';
import { serviceOptions, sortOptions } from '@/components/Sidebar/Sidebar.options';
import config from '@/config';
import { useAppSelector, useDocumentTitle, useWindowsDimension } from '@/hooks';
import { ServiceParams, getAllService } from '@/utils/serviceAPI';
import { Category, Rating, OrderBy } from '@/utils/enums';

import { ShopType } from './Shop.type';
import ShopFilter from './ShopFilter';
import * as Styled from './Shop.styled';

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
        title: <Link to={config.routes.public.home}>Trang chủ</Link>,
    },
    {
        title: 'Cửa hàng',
    },
];

const Shop = () => {
    useDocumentTitle('Cửa Hàng | HouseMate');

    const { width } = useWindowsDimension();

    const category = useAppSelector((state) => state.service.category);

    // Reload page
    const [reload, setReload] = useState<number>(0);

    // Service list
    const [shop, setShop] = useState<ShopType>();

    // Params
    const [shopParams, setShopParams] = useState<ServiceParams>({
        keyword: '',
        page: 1,
        size: 9,
        category,
    });

    const [loading, setLoading] = useState<boolean>(true);

    // Checkbox category list
    const [checkedCategoryList, setCheckedCategoryList] = useState<CheckboxValueType[]>([category]);
    const categoryCheckAll = serviceOptions.length === checkedCategoryList.length;

    // Fetch API filter services by category
    useEffect(() => {
        if (categoryCheckAll) {
            setShopParams({
                ...shopParams,
                page: 1,
                category: Category.ALL,
            });
            setReload(reload + 1);
        } else {
            setShopParams({
                ...shopParams,
                page: 1,
                category: checkedCategoryList[0] as Category,
            });
            setReload(reload + 1);
        }
    }, [checkedCategoryList, categoryCheckAll]);

    // Fetch API all services
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getAllService(shopParams);
                setShop(data);
            } catch (error: any) {
                setShop({} as ShopType);
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const handleChangePage: PaginationProps['onChange'] = (page) => {
        setShopParams({
            ...shopParams,
            page,
        });
        setReload(reload + 1);
    };

    const handleSearch = (value: string) => {
        const data = value.trim();

        setShopParams({
            ...shopParams,
            page: 1,
            keyword: data,
        });
        setReload(reload + 1);
    };

    const handleDropdownSelected = (value: OrderBy) => {
        setShopParams({
            ...shopParams,
            page: 1,
            orderBy: value,
        });
        setReload(reload + 1);
    };

    const handleCategoryCheckbox = (list: CheckboxValueType[]) => {
        setCheckedCategoryList(list);
    };

    const handleRatingRadio = (e: RadioChangeEvent) => {
        setShopParams({
            ...shopParams,
            page: 1,
            rating: e.target.value,
        });
        setReload(reload + 1);
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
                            <Search placeholder="Tìm Kiếm Dịch Vụ..." handleSearch={handleSearch} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Styled.ShopFilterWrapper>
                                <MobileFilter>
                                    <ShopFilter
                                        checkedCategoryList={checkedCategoryList}
                                        handleCategoryCheckbox={handleCategoryCheckbox}
                                        radioValue={shopParams.rating || Rating.ZERO}
                                        handleRatingRadio={handleRatingRadio}
                                    />
                                </MobileFilter>

                                <Flex gap={10} align="center">
                                    <Text>{width > 576 ? 'Sắp Xếp Theo Giá:' : 'Giá:'}</Text>

                                    <Select
                                        defaultValue={OrderBy.ASC}
                                        onChange={handleDropdownSelected}
                                        options={sortOptions}
                                        popupClassName="shop-dropdown"
                                    />
                                </Flex>
                            </Styled.ShopFilterWrapper>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col xl={6} sm={0} xs={0}>
                            <Styled.ShopSidebar>
                                <ShopFilter
                                    checkedCategoryList={checkedCategoryList}
                                    handleCategoryCheckbox={handleCategoryCheckbox}
                                    radioValue={shopParams.rating || Rating.ZERO}
                                    handleRatingRadio={handleRatingRadio}
                                />
                            </Styled.ShopSidebar>
                        </Col>

                        <Col xl={18} sm={24} xs={24}>
                            <ServiceList
                                loading={loading}
                                current={shopParams.page}
                                pageSize={shopParams.size}
                                totalElement={shop?.totalElements}
                                services={shop?.content || []}
                                grid={grid}
                                cardWidth={270}
                                handleChangePage={handleChangePage}
                            />
                        </Col>
                    </Row>
                </Container>
            </Styled.ShopSection>
        </>
    );
};

export default Shop;
