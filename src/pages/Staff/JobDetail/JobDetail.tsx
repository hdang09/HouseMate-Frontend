import { Image, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import jobDetailImage from '@/assets/images/job-detail-img.webp';
import locationIcon from '@/assets/svg/location-icon.svg';
import { JobItemProps } from '@/components/JobList/JobItem/JobItem.type';
import embedMapUrl from '@/utils/embedMapUrl';

import { dummy, userDummy } from './JobDetail.dummy';
import * as St from './JobDetail.styled';

const { Title, Text } = Typography;

const JobDetail = () => {
    const { jobId } = useParams();
    const [modal, contextHolder] = Modal.useModal();
    const [job, setJob] = useState<JobItemProps>();

    useEffect(() => {
        (async () => {
            if (!jobId) return;
            const data = dummy[+jobId - 1];
            setJob(data);
        })();
    }, []);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn đã đọc kỹ thông tin và muốn nhận việc?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để nhận việc.',
            okText: 'Xác nhận',
            onOk: handleConfirmJob,
            cancelText: 'Hủy',
        });
    };

    const handleConfirmJob = () => {
        console.log('Confirmed!');
    };

    return (
        <>
            <St.JobDetailSection>
                <St.JobDetailBanner>
                    <Image
                        src={jobDetailImage}
                        alt="job_detail_image"
                        width="100%"
                        height={124}
                        preview={false}
                    />

                    <figure>
                        <img src={locationIcon} loading="lazy" decoding="async" alt="location" />
                    </figure>
                </St.JobDetailBanner>

                <St.JobDetailHeading>
                    <Title level={1}>{job?.serviceName}</Title>
                    <Text>{job?.serviceChildrenName}</Text>
                </St.JobDetailHeading>

                <St.JobDetailContent>
                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Phân loại:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>
                            {job?.package ? 'gói dịch vụ' : 'dịch vụ'}
                        </St.JobDetailTextValue>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Thời gian:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>
                            {job?.time} ({job?.startDate} -&gt; {job?.endDate})
                        </St.JobDetailTextValue>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Thông tin khách hàng:</St.JobDetailTextKey>

                        <St.JobDetailInfo>
                            <ul>
                                <li>
                                    <St.JobDetailTextKey level={3}>Tên:</St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {userDummy.fullName}
                                    </St.JobDetailTextValue>
                                </li>

                                <li>
                                    <St.JobDetailTextKey level={3}>
                                        Số điện thoại:
                                    </St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {userDummy.phoneNumber}
                                    </St.JobDetailTextValue>
                                </li>

                                <li>
                                    <St.JobDetailTextKey level={3}>Địa chỉ:</St.JobDetailTextKey>
                                    <St.JobDetailTextValue>
                                        {userDummy.address}
                                    </St.JobDetailTextValue>
                                </li>
                            </ul>
                        </St.JobDetailInfo>
                    </St.JobDetailInfo>

                    <St.JobDetailInfo>
                        <St.JobDetailTextKey level={2}>Ghi chú:</St.JobDetailTextKey>
                        <St.JobDetailTextValue>{job?.note}</St.JobDetailTextValue>
                    </St.JobDetailInfo>

                    <St.JobDetailMap
                        src={embedMapUrl(job?.address || '')}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <St.JobDetailButton onClick={confirm}>Nhận việc</St.JobDetailButton>
                </St.JobDetailContent>
            </St.JobDetailSection>

            {contextHolder}
        </>
    );
};

export default JobDetail;
