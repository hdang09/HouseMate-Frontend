import { Image, Typography, Modal, notification, Skeleton, Flex } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import fallBackImage from '@/assets/images/fallback-img.png';
import Map from '@/components/Map';
import config from '@/config';
import { applyTask, getTaskById } from '@/utils/tasksAPI';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { CategoryLabel } from '@/utils/enums';
import * as St from './JobDetail.styled';

const { Title, Text } = Typography;

const JobDetail = () => {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);

    const navigate = useNavigate();

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });

    const { jobId } = useParams();
    const [modal, contextHolderModal] = Modal.useModal();
    const [job, setJob] = useState<JobItemType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!jobId) return;
                const { data } = await getTaskById(Number(jobId));

                setJob(data);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
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
            okText: 'Xác nhận',
            onOk: handleConfirmJob,
            cancelText: 'Quay lại',
        });
    };

    const handleConfirmJob = async () => {
        try {
            setLoading(true);

            await applyTask(Number(jobId));

            api.success({
                message: 'Thành công',
                description: 'Bạn đã nhận việc thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolderNotification}

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
                    <Title level={1}>{job?.service.titleName}</Title>
                    <Text>{job?.service.titleName}</Text>
                </St.JobDetailHeading>

                <St.JobDetailContent>
                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Phân loại:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>
                            {job?.service.package ? CategoryLabel.PACKAGE : CategoryLabel.SINGLE}
                        </St.JobDetailTextValue>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Thời gian:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>
                            {dayjs(job?.schedule.startDate).format('H:mm') +
                                ' - ' +
                                dayjs(job?.schedule.endDate).format('H:mm') +
                                ' ' +
                                dayjs(job?.schedule.startDate).format('dddd, DD/MM/YYYY')}
                        </St.JobDetailTextValue>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Thông tin khách hàng:</St.JobDetailTextKey>

                        <St.JobDetailInfo>
                            <ul>
                                <li>
                                    <St.JobDetailTextKey level={3}>Tên:</St.JobDetailTextKey>
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
                                            ? job.customer.phoneNumber
                                            : job?.customer.phoneNumber.replace(
                                                  /(\d{4})(\d{4})(.*)/,
                                                  '$1xxxxxx',
                                              )}
                                    </St.JobDetailTextValue>
                                </li>

                                <li>
                                    <St.JobDetailTextKey level={3}>Địa chỉ:</St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {job?.addressWorking}
                                    </St.JobDetailTextValue>
                                </li>
                            </ul>
                        </St.JobDetailInfo>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Ghi chú:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>{job?.taskId}</St.JobDetailTextValue>
                    </St.JobDetailInfo>

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

            {contextHolderModal}
        </>
    );
};

export default JobDetail;
