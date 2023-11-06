import { Flex, List } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { memo } from 'react';

import { theme } from '@/themes';
import InfiniteScroll from '@/components/InfiniteScroll';
import { JobItemType } from '@/pages/Staff/Job/Job.type';

import JobItem from './JobItem';
import { JobListWrapper } from './JobList.styled';

const JobList = ({
    list,
    totalElements,
    link,
    title,
    label,
    formattedDate,
    successText,
    cancelText,
    loading,
    hasMore,
}: {
    list: JobItemType[];
    totalElements: number;
    link: string;
    title?: string;
    label?: JSX.Element;
    formattedDate?: boolean;
    successText?: string;
    cancelText?: string;
    loading: boolean;
    hasMore: () => void;
}) => {
    return (
        <>
            <InfiniteScroll
                fetchMore={hasMore}
                hasMore={list.length < totalElements}
                loader={
                    <Flex justify="center" style={{ marginTop: '20px' }}>
                        <Loading3QuartersOutlined spin style={{ color: theme.colors.primary }} />
                    </Flex>
                }
            >
                <JobListWrapper>
                    <List
                        loading={{
                            size: 'small',
                            spinning: loading,
                            tip: 'Đang tải...',
                        }}
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
            </InfiniteScroll>
        </>
    );
};

export default memo(JobList);
