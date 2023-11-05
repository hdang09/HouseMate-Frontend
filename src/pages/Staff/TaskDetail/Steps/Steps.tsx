import { memo } from 'react';
import { StepsStyled } from './Steps.styled';
import { ReportTaskType } from '@/pages/Staff/Job/Job.type';

const description = 'This is a description.';

const Steps = ({ list }: { list: ReportTaskType[] | undefined }) => {
    return (
        <StepsStyled
            direction="vertical"
            current={list?.length || -1}
            items={[
                { title: 'Đã đến', description },
                {
                    title: 'Đang làm việc',
                    description,
                },
                {
                    title: 'Đã hoàn thành',
                    description,
                },
                {
                    title: 'Nhận xét của khách hàng',
                    description,
                },
            ]}
        />
    );
};

export default memo(Steps);
