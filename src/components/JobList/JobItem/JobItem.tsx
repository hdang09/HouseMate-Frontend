import { Image, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { memo } from 'react';

import fallBackImage from '@/assets/images/fallback-img.png';
import Link from '@/components/Link';
import { GroupType, TaskStatus } from '@/utils/enums';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { theme } from '@/themes';

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
    job: JobItemType;
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
        const createdAt = dayjs(
            job.taskStatus === TaskStatus.PENDING_APPLICATION
                ? job.createdAt
                : job.schedule.startDate,
        );

        return formattedDate ? createdAt.format('DD/MM/YYYY') : createdAt.fromNow();
    };

    const renderStatusText = () => {
        switch (job.taskStatus) {
            case TaskStatus.PENDING_WORKING:
                return <Text style={{ color: theme.colors.pending }}>{renderDate()}</Text>;

            case TaskStatus.INCOMING:
                return <Text style={{ color: theme.colors.incoming }}>{renderDate()}</Text>;

            case TaskStatus.ARRIVED:
                return <Text style={{ color: theme.colors.info }}>{renderDate()}</Text>;

            case TaskStatus.DOING:
                return <Text style={{ color: theme.colors.warning }}>{renderDate()}</Text>;

            case TaskStatus.DONE:
                return <Text style={{ color: theme.colors.success }}>{successText}</Text>;

            case TaskStatus.CANCELLED_BY_CUSTOMER:
            case TaskStatus.CANCELLED_BY_STAFF:
            case TaskStatus.CANCELLED_CAUSE_NOT_FOUND_STAFF:
                return <Text style={{ color: theme.colors.error }}>{cancelText}</Text>;

            default:
                if (title) {
                    return <Text>{title}</Text>;
                } else {
                    return <Text>{renderDate()}</Text>;
                }
        }
    };

    return (
        <Link to={`${link}/${job.taskId}`} style={{ width: '100%' }} replace>
            <St.JobItemWrapper $status={job.taskStatus?.toString() || ''}>
                <Image
                    src={job.service.images[0].imageUrl}
                    alt={job.service.titleName}
                    width={94}
                    height={84}
                    preview={false}
                    fallback={fallBackImage}
                    style={{ objectFit: 'cover' }}
                />

                <St.JobItemContent>
                    <St.JobItemHeading>
                        <Title level={2}>
                            {job.service.packageName.length > 0
                                ? job.service.packageName
                                : job.service.titleName}
                        </Title>
                        {renderStatusText()}
                    </St.JobItemHeading>

                    <St.JobItemSubTitle>{job.service.titleName}</St.JobItemSubTitle>

                    {job.service.groupType === GroupType.RETURN_SERVICE ? (
                        <>
                            <St.JobItemParagraph>
                                <Text strong>Thời gian gửi:</Text>
                                <Text>
                                    {`${dayjs(job?.schedule.startDate).format('H:mm')} ${dayjs(
                                        job?.schedule.startDate,
                                    ).format('dddd, DD/MM/YYYY')}`}
                                </Text>
                            </St.JobItemParagraph>

                            <St.JobItemParagraph>
                                <Text strong>Thời gian trả:</Text>
                                <Text>
                                    {`${dayjs(job?.schedule.endDate).format('H:mm')} ${dayjs(
                                        job?.schedule.endDate,
                                    ).format('dddd, DD/MM/YYYY')}`}
                                </Text>
                            </St.JobItemParagraph>
                        </>
                    ) : (
                        <St.JobItemParagraph>
                            <Text strong>Thời gian:</Text>
                            <Text>
                                {dayjs(job.schedule.startDate).format('H:mm') +
                                    ' - ' +
                                    dayjs(job.schedule.endDate).format('H:mm') +
                                    ' ' +
                                    dayjs(job.schedule.startDate).format('dddd, DD/MM/YYYY')}
                            </Text>
                        </St.JobItemParagraph>
                    )}

                    <St.JobItemParagraph>
                        <Text strong>Địa chỉ:</Text>
                        <Text>{job.addressWorking}</Text>
                    </St.JobItemParagraph>
                </St.JobItemContent>

                <St.JobItemLabel>{label}</St.JobItemLabel>
            </St.JobItemWrapper>
        </Link>
    );
};

export default memo(JobItem);
