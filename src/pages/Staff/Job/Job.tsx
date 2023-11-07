import { Badge, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';

import config from '@/config';
import { getTaskPending } from '@/utils/tasksAPI';
import { JobType } from '@/pages/Staff/Job/Job.type';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import JobList from '@/components/JobList';

import { JobWrapper, NewLabel } from './Job.styled';

const { Title } = Typography;

const New = () => {
    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const [newJobs, setNewJobs] = useState<JobType>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getTaskPending({ page, size: 9 });

                setNewJobs({
                    ...data,
                    content: [...(newJobs?.content || []), ...data.content],
                });
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
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

            <JobWrapper>
                <StaffSection>
                    <Badge count={newJobs?.totalElements} overflowCount={20} offset={[28, 13]}>
                        <Title level={1}>Việc mới</Title>
                    </Badge>

                    <JobList
                        loading={loading}
                        list={newJobs?.content || []}
                        totalElements={newJobs?.totalElements || 0}
                        link={config.routes.staff.job}
                        label={<NewLabel>New</NewLabel>}
                        hasMore={handleShowMore}
                    />
                </StaffSection>
            </JobWrapper>
        </>
    );
};

export default New;
