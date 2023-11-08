import { Badge, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

import config from '@/config';
import { getTaskPending } from '@/utils/staffAPI';
import { JobType } from '@/pages/Staff/Job/Job.type';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import JobList from '@/components/JobList';
import { OrderBy } from '@/utils/enums';
import { useDocumentTitle } from '@/hooks';

import { JobWrapper, NewLabel } from './Job.styled';

const { Title } = Typography;

const New = () => {
    useDocumentTitle('Tìm Việc Mới | HouseMate');

    // Show message
    const [messageApi, contextHolder] = message.useMessage();

    const [newJobs, setNewJobs] = useState<JobType>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getTaskPending({
                    directionSort: OrderBy.DESC,
                    page,
                    size: 9,
                });

                setNewJobs({
                    ...data,
                    content: [...(newJobs?.content || []), ...(data.content || [])],
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

            <JobWrapper>
                <StaffSection>
                    <Badge count={newJobs?.totalElements} overflowCount={20} offset={[24, 11]}>
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
