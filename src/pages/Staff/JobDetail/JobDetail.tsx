import { Image, Typography, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as St from './JobDetail.styled';
import Map from '@/components/Map';
import { applyTask, getTaskById } from '@/utils/tasksAPI';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { CategoryLabel } from '@/utils/enums';

const { Title, Text } = Typography;

const JobDetail = () => {
    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });

    const { jobId } = useParams();
    const [modal, contextHolderModal] = Modal.useModal();
    const [job, setJob] = useState<JobItemType>();
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                if (!jobId) return;
                const { data } = await getTaskById(Number(jobId));
                setJob(data);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
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
            await applyTask(Number(jobId));

            api.success({
                message: 'Thành công',
                description: 'Bạn đã nhận việc thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    return (
        <>
            {contextHolderNotification}

            <St.JobDetailSection>
                <St.JobDetailBanner>
                    <Image
                        src={job?.service.images[0].imageUrl}
                        alt="job_detail_image"
                        width="100%"
                        height={124}
                        preview={false}
                    />
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
                            Backend đang trả thiếu
                            {/* {job?.time} ({job?.startDate} -&gt; {job?.endDate}) */}
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
                                        {job?.customer.phoneNumber}
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

                    <St.JobDetailButton onClick={confirm} disabled={job?.staff !== null}>
                        Nhận việc
                    </St.JobDetailButton>
                </St.JobDetailContent>
            </St.JobDetailSection>

            {contextHolderModal}
        </>
    );
};

export default JobDetail;
