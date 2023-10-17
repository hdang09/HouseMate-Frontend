import { memo } from 'react';

import JobItem from './JobItem';
import { JobItemProps } from './JobItem/JobItem.type';
import { JobListWrapper } from './JobList.styled';

const JobList = ({
    list,
    title,
    label,
    formattedDate,
    successText,
    cancelText,
}: {
    list: JobItemProps[];
    title?: string;
    label?: JSX.Element;
    formattedDate?: boolean;
    successText?: string;
    cancelText?: string;
}) => {
    return (
        <>
            <JobListWrapper>
                {list.map((item) => (
                    <JobItem
                        key={item.jobId}
                        job={item}
                        title={title}
                        label={label}
                        formattedDate={formattedDate}
                        successText={successText}
                        cancelText={cancelText}
                    />
                ))}
            </JobListWrapper>
        </>
    );
};

export default memo(JobList);
