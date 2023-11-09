import { Badge, Typography, message } from 'antd';
import { memo, useEffect, useState } from 'react';

import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import { JobType } from '@/pages/Staff/Job/Job.type';
import { getTasksByStatus } from '@/utils/staffAPI';
import { TaskStatus } from '@/utils/enums';
import JobList from '@/components/JobList';

const { Title } = Typography;

interface TaskListProps {
    title: string;
    text?: string;
    link: string;
    label?: JSX.Element;
    formattedDate?: boolean;
    successText?: string;
    cancelText?: string;
    taskStatus: TaskStatus;
}

const TaskList = ({
    title,
    text,
    link,
    label,
    formattedDate,
    successText,
    cancelText,
    taskStatus,
}: TaskListProps) => {
    // Show message
    const [messageApi, contextHolder] = message.useMessage();
    const [tasks, setTasks] = useState<JobType>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getTasksByStatus({
                    taskStatus,
                    page,
                    size: 9,
                });

                setTasks({
                    ...data,
                    content: [...(tasks?.content || []), ...(data.content || [])],
                });
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [page]);

    const handleShowMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            {contextHolder}

            <StaffSection>
                <Badge count={tasks?.totalElements} overflowCount={20} offset={[24, 11]}>
                    <Title level={1}>{title}</Title>
                </Badge>

                <JobList
                    loading={loading}
                    list={tasks?.content || []}
                    totalElements={tasks?.totalElements || 0}
                    text={text}
                    link={link}
                    label={label}
                    formattedDate={formattedDate}
                    successText={successText}
                    cancelText={cancelText}
                    hasMore={handleShowMore}
                />
            </StaffSection>
        </>
    );
};

export default memo(TaskList);
