import { Image, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { memo } from 'react';

import Link from '@/components/Link';
import { Status } from '@/utils/enums';

import { JobItemProps } from './JobItem.type';
import * as St from './JobItem.styled';

const { Title, Text } = Typography;

const JobItem = ({
    job,
    link,
    title,
    label,
    formattedDate,
    successText,
    cancelText,
}: {
    job: JobItemProps;
    link: string;
    title?: string;
    label?: JSX.Element;
    formattedDate?: boolean;
    successText?: string;
    cancelText?: string;
}) => {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);

    const renderDate = () => {
        const createdAt = dayjs(job.createAt);
        return formattedDate ? createdAt.format('DD/MM/YYYY') : createdAt.fromNow();
    };

    const renderStatusText = () => {
        if (job.status === Status.DONE) {
            return <St.JobItemTextSuccess>{successText}</St.JobItemTextSuccess>;
        } else if (job.status === Status.CANCEL) {
            return <St.JobItemTextCancel>{cancelText}</St.JobItemTextCancel>;
        } else if (title) {
            return <Text>{title}</Text>;
        } else {
            return <Text>{renderDate()}</Text>;
        }
    };

    return (
        <Link to={`${link}/${job.jobId}`}>
            <St.JobItemWrapper $status={job.status?.toString() || ''}>
                <Image
                    src={job.serviceImage}
                    alt={job.serviceName}
                    width={94}
                    height={84}
                    preview={false}
                />

                <St.JobItemContent>
                    <St.JobItemHeading>
                        <Title level={2}>{job.serviceName}</Title>
                        {renderStatusText()}
                    </St.JobItemHeading>

                    <St.JobItemSubTitle>{job.serviceChildrenName}</St.JobItemSubTitle>

                    <St.JobItemParagraph>
                        <Text strong>Thời gian:</Text>
                        <Text>{job.time}</Text>
                    </St.JobItemParagraph>

                    <St.JobItemParagraph>
                        <Text strong>Địa chỉ:</Text>
                        <Text>{job.address}</Text>
                    </St.JobItemParagraph>
                </St.JobItemContent>

                <St.JobItemLabel>{label}</St.JobItemLabel>
            </St.JobItemWrapper>
        </Link>
    );
};

export default memo(JobItem);
