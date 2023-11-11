import {
    Col,
    DatePicker,
    Flex,
    Image,
    Pagination,
    PaginationProps,
    Progress,
    Row,
    Spin,
} from 'antd';
import * as Styled from '../../Dashboard.styled';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ExportToExcel } from '../Excel/ExportCustomer';
import { useEffect, useState } from 'react';
import { getTopServiceList } from '@/utils/dashboardAPI';
import { fallbackImg } from '@/components/AuthForm/AuthForm.images';
const { RangePicker } = DatePicker;

type ServiceListType = {
    serviceName: string;
    totalPrice: number;
    numberOfSold: number;
    totalView: number;
    image: string;
};

interface Datatype {
    data: ServiceListType[];
    totalPage: number;
}

const TopService = () => {
    const [data, setData] = useState<Datatype>({
        data: [],
        totalPage: 1,
    });
    const [exportData, setExportData] = useState<ServiceListType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
        dayjs().add(-7, 'd'),
        dayjs(),
    ]);
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);

        getUserData(dateRange[0] || dayjs().add(-7, 'd'), dateRange[1] || dayjs(), page);
        setCurrent(page);
    };

    const fileName = 'Thống kê dịch vụ';
    const getUserData = async (startDate: Dayjs, endDate: Dayjs, page: number) => {
        try {
            setLoading(true);
            const body = {
                startDate,
                endDate,
                size: 5,
                page: page,
            };
            const { data }: { data: Datatype } = await getTopServiceList(body);
            setData(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserData(dayjs().add(-7, 'd'), dayjs(), 1);
        const getAllUserData = async () => {
            try {
                const body = {
                    size: 99,
                    page: 1,
                };
                const { data }: { data: Datatype } = await getTopServiceList(body);
                setExportData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllUserData();
    }, []);
    const onRangeChange = (dates: null | (Dayjs | null)[], _: string[]) => {
        if (dates) {
            setDateRange([dates[0] || null, dates[1] || null]);
            getUserData(dates[0] || dayjs().add(-7, 'd'), dates[1] || dayjs(), 1);
            console.log(dates);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const disabledEndDate = (current: Dayjs) => {
        // Disable dates after today for the end date
        return current && current > dayjs().endOf('day');
    };

    return (
        <Styled.Wrapper>
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: '16px' }}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Top các dịch vụ được quan tâm nhất
                    </Styled.DashboardTitle>
                </Col>
                <Col>
                    <Col>
                        <RangePicker
                            format={'DD/MM/YYYY'}
                            presets={rangePresets}
                            onChange={onRangeChange}
                            disabledDate={disabledEndDate}
                            value={[dateRange[0], dateRange[1]]}
                        />
                    </Col>
                    <Row justify={'end'} style={{ marginTop: '12px' }}>
                        <ExportToExcel apiData={exportData} fileName={fileName} />
                    </Row>
                </Col>
            </Row>
            <Row justify={'space-between'} style={{ marginBottom: '16px' }}>
                <Col>
                    <Styled.TopServiceHeader>Hình ảnh và tên dịch vụ</Styled.TopServiceHeader>
                </Col>

                <Row justify={'space-between'} style={{ width: '500px' }}>
                    <Col>
                        <Styled.TopServiceHeader>Số lượt bán</Styled.TopServiceHeader>
                    </Col>
                    <Col>
                        <Styled.TopServiceHeader>Doanh thu</Styled.TopServiceHeader>
                    </Col>
                    <Col>
                        <Styled.TopServiceHeader>Số lượt xem</Styled.TopServiceHeader>
                    </Col>
                </Row>
            </Row>
            {loading ? (
                <Row justify={'center'} align={'middle'} style={{ height: '50%' }}>
                    <Spin />
                </Row>
            ) : (
                <>
                    {data.data.map((service, index) => {
                        return (
                            <Flex
                                align={'center'}
                                gap={10}
                                style={{ marginBottom: '16px' }}
                                key={index}
                            >
                                <Image
                                    src={service.image}
                                    width={60}
                                    height={60}
                                    style={{
                                        borderRadius: '8px',
                                        objectFit: 'cover',
                                        marginRight: '10px',
                                    }}
                                    fallback={fallbackImg}
                                />
                                <Row
                                    justify={'space-between'}
                                    style={{ marginBottom: '16px', width: '100%' }}
                                >
                                    <Col>
                                        <Styled.TopServiceContent>
                                            {service.serviceName}
                                        </Styled.TopServiceContent>
                                    </Col>

                                    <Row
                                        justify={'space-between'}
                                        align={'middle'}
                                        style={{ width: '500px' }}
                                    >
                                        <Col>
                                            <Styled.TopServiceContent>
                                                {service.numberOfSold.toLocaleString()}
                                            </Styled.TopServiceContent>
                                        </Col>
                                        <Col>
                                            <Styled.TopServiceContent>
                                                {service.totalPrice.toLocaleString()}
                                            </Styled.TopServiceContent>
                                        </Col>
                                        <Col>
                                            <Styled.TopServiceContent>
                                                {service.totalView.toLocaleString()}
                                            </Styled.TopServiceContent>
                                        </Col>
                                    </Row>
                                    <Progress
                                        percent={Math.floor(
                                            (data.data[index].totalView /
                                                (data.data[0].totalView + 1)) *
                                                100,
                                        )}
                                        showInfo={false}
                                        style={{ marginBottom: '0' }}
                                    />
                                </Row>
                            </Flex>
                        );
                    })}
                    <Row justify={'end'}>
                        <Pagination
                            current={current}
                            defaultCurrent={1}
                            onChange={onChange}
                            total={data.totalPage * 6}
                        />
                    </Row>
                </>
            )}
        </Styled.Wrapper>
    );
};

export default TopService;
