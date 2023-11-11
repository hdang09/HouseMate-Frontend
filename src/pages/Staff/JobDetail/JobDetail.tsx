import { Image, Typography, Modal, Skeleton, Flex, Spin, message, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';

import fallBackImage from '@/assets/images/fallback-img.png';
import Map from '@/components/Map';
import config from '@/config';
import { applyTask, getTaskById } from '@/utils/staffAPI';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { CategoryLabel, GroupType } from '@/utils/enums';
import { useDocumentTitle } from '@/hooks';
import { weekDayFormat } from '@/utils/weekDayFormat';

import * as St from './JobDetail.styled';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Text } = Typography;

const JobDetail = () => {
    const navigate = useNavigate();

    // Show message
    const [messageApi, contextHolderMessage] = message.useMessage();

    const { jobId } = useParams();
    const [modal, contextHolderModal] = Modal.useModal();
    const [job, setJob] = useState<JobItemType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);

    useDocumentTitle(`${job ? `${job.service.titleName} | HouseMate` : 'Đang Tải...'}`);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!jobId) return;
                const { data } = await getTaskById(Number(jobId));

                setJob(data);
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const confirm = () => {
        if (job?.staff !== null) return;

        modal.confirm({
            centered: true,
            title: 'Bạn đã đọc kỹ thông tin và muốn nhận việc?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để nhận việc.',
            okText: 'Quay lại',
            onCancel: handleConfirmJob,
            cancelText: 'Xác nhận',
        });
    };

    const handleConfirmJob = async () => {
        try {
            setLoading(true);

            await applyTask(Number(jobId));

            messageApi.open({
                type: 'success',
                content: 'Bạn đã nhận việc thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolderMessage}

            <Spin size="small" spinning={loading} tip="Đang tải...">
                <St.JobDetailSection>
                    <St.JobDetailBanner>
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <Image
                                src={job?.service.images[0].imageUrl}
                                alt="job_detail_image"
                                width="100%"
                                preview={false}
                                fallback={fallBackImage}
                                loading="lazy"
                            />
                        )}
                    </St.JobDetailBanner>

                    <St.JobDetailHeading>
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                <Title level={1}>{job?.service.titleName}</Title>
                                <Text>
                                    {job?.service && job?.service.packageName.length > 0
                                        ? job?.service.packageName
                                        : job?.service.titleName}
                                </Text>
                            </>
                        )}
                    </St.JobDetailHeading>

                    <St.JobDetailContent>
                        <Divider />

                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                {job?.service.groupType === GroupType.RETURN_SERVICE ? (
                                    <>
                                        <St.JobDetailInfo>
                                            <St.JobDetailTextKey level={2}>
                                                Ngày nhận:
                                            </St.JobDetailTextKey>
                                            <St.JobDetailDateValue>
                                                {`${dayjs(job?.schedule.startDate).calendar(null, {
                                                    lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                    sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                    nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                    lastWeek: `[${weekDayFormat(
                                                        dayjs(job?.schedule.startDate).format('d'),
                                                    )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                    nextWeek: `[${weekDayFormat(
                                                        dayjs(job?.schedule.startDate).format('d'),
                                                    )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                })}`}
                                            </St.JobDetailDateValue>
                                        </St.JobDetailInfo>

                                        <St.JobDetailInfo>
                                            <St.JobDetailTextKey level={2}>
                                                Ngày trả:
                                            </St.JobDetailTextKey>
                                            <St.JobDetailDateValue>
                                                {`${dayjs(job?.schedule.endDate).calendar(null, {
                                                    lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                    sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                    nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                    lastWeek: `[${weekDayFormat(
                                                        dayjs(job?.schedule.endDate).format('d'),
                                                    )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                    nextWeek: `[${weekDayFormat(
                                                        dayjs(job?.schedule.endDate).format('d'),
                                                    )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                })}`}
                                            </St.JobDetailDateValue>
                                        </St.JobDetailInfo>
                                    </>
                                ) : (
                                    <St.JobDetailInfo>
                                        <St.JobDetailTextKey level={2}>Ngày:</St.JobDetailTextKey>
                                        <St.JobDetailDateValue>
                                            {`${dayjs(job?.schedule.startDate).calendar(null, {
                                                lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                lastWeek: `[${weekDayFormat(
                                                    dayjs(job?.schedule.startDate).format('d'),
                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                nextWeek: `[${weekDayFormat(
                                                    dayjs(job?.schedule.startDate).format('d'),
                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                            })}`}
                                        </St.JobDetailDateValue>
                                    </St.JobDetailInfo>
                                )}

                                {job?.schedule && job.schedule.quantityRetrieve > 0 && (
                                    <St.JobDetailInfo>
                                        <St.JobDetailTextKey level={2}>
                                            Khách hàng yêu cầu:
                                        </St.JobDetailTextKey>
                                        <St.JobDetailDateValue>
                                            {job.schedule.quantityRetrieve +
                                                ' ' +
                                                job.service.unitOfMeasure}
                                        </St.JobDetailDateValue>
                                    </St.JobDetailInfo>
                                )}

                                <Divider />

                                <St.JobDetailInfo>
                                    <St.JobDetailTextKey level={2}>Phân loại:</St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {job?.service.package
                                            ? CategoryLabel.PACKAGE
                                            : CategoryLabel.SINGLE}
                                    </St.JobDetailTextValue>
                                </St.JobDetailInfo>

                                <Divider />

                                <St.JobDetailInfo>
                                    <St.JobDetailTextKey level={2}>Ghi chú:</St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {job?.schedule && job.schedule.note.length > 0
                                            ? job?.schedule.note
                                            : 'Không có ghi chú'}
                                    </St.JobDetailTextValue>
                                </St.JobDetailInfo>

                                <St.JobDetailInfo>
                                    <St.JobDetailTextKey level={2}>
                                        Thông tin khách hàng:
                                    </St.JobDetailTextKey>

                                    <St.JobDetailInfo>
                                        <ul>
                                            <li>
                                                <St.JobDetailTextKey level={3}>
                                                    Tên:
                                                </St.JobDetailTextKey>
                                                <St.JobDetailTextValue>
                                                    {job?.customer.fullName}
                                                </St.JobDetailTextValue>
                                            </li>

                                            <li>
                                                <St.JobDetailTextKey level={3}>
                                                    Số điện thoại:
                                                </St.JobDetailTextKey>
                                                <St.JobDetailTextValue>
                                                    {job?.staff
                                                        ? job?.customer.phoneNumber
                                                        : job?.customer.phoneNumber.replace(
                                                              /(\d{4})(\d{4})(.*)/,
                                                              '$1xxxxxx',
                                                          )}
                                                </St.JobDetailTextValue>
                                            </li>

                                            <li>
                                                <St.JobDetailTextKey level={3}>
                                                    Địa chỉ:
                                                </St.JobDetailTextKey>
                                                <St.JobDetailTextValue>
                                                    {job?.addressWorking}
                                                </St.JobDetailTextValue>
                                            </li>
                                        </ul>
                                    </St.JobDetailInfo>
                                </St.JobDetailInfo>
                            </>
                        )}

                        <Map address={job?.addressWorking || ''} />

                        <Flex justify="flex-end" gap={12}>
                            <St.JobDetailButton
                                type={job?.staff !== null ? 'primary' : 'dashed'}
                                onClick={() => navigate(config.routes.staff.job)}
                            >
                                Tìm việc mới
                            </St.JobDetailButton>

                            <St.JobDetailButton
                                type="primary"
                                onClick={confirm}
                                disabled={job?.staff !== null}
                            >
                                Nhận việc
                            </St.JobDetailButton>
                        </Flex>
                    </St.JobDetailContent>
                </St.JobDetailSection>
            </Spin>

            {contextHolderModal}
        </>
    );
};

export default JobDetail;
