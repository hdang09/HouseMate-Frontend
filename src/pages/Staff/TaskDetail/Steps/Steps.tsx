import { Button } from 'antd';
import { memo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import { JobItemType } from '@/pages/Staff/Job/Job.type';

import { StepsStyled } from './Steps.styled';
import { TaskStatus } from '@/utils/enums';

const description = 'This is a description.';

const Steps = ({ task }: { task: JobItemType | undefined }) => {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);

    return (
        <>
            <StepsStyled
                direction="vertical"
                current={task?.taskReportList.length || -1}
                items={[
                    {
                        title: 'Đã đến',
                        description:
                            task?.taskStatus === TaskStatus.ARRIVED ? (
                                dayjs(task?.taskReportList[0].reportAt)
                                    .format('H:mm dddd, DD/MM/YYYY')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())
                            ) : (
                                <Button type="primary" size="large">
                                    Đã đến
                                </Button>
                            ),
                    },
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
        </>
    );
};

export default memo(Steps);
