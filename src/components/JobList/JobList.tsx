import { memo } from 'react';

import JobItem from './JobItem';
import { JobListWrapper } from './JobList.styled';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { List } from 'antd';

const JobList = ({
    list,
    link,
    title,
    label,
    formattedDate,
    successText,
    cancelText,
    loading,
}: {
    list: JobItemType[];
    link: string;
    title?: string;
    label?: JSX.Element;
    formattedDate?: boolean;
    successText?: string;
    cancelText?: string;
    loading: boolean;
}) => {
    return (
        <>
            <JobListWrapper>
                <List
                    loading={loading}
                    dataSource={list}
                    renderItem={(job) => (
                        <List.Item key={job.taskId}>
                            <JobItem
                                job={job}
                                link={link}
                                title={title}
                                label={label}
                                formattedDate={formattedDate}
                                successText={successText}
                                cancelText={cancelText}
                            />
                        </List.Item>
                    )}
                />
            </JobListWrapper>
        </>
    );
};

export default memo(JobList);
