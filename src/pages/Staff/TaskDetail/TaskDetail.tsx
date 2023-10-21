import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Map from '@/components/Map';
import { Status } from '@/utils/enums';

import { TaskDetailType, dummy, userDummy } from './TaskDetail.dummy';
import * as St from './TaskDetail.styled';

import { Typography } from 'antd';
import Steps from './Steps';

const { Title, Text } = Typography;

const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState<TaskDetailType>();

    useEffect(() => {
        (async () => {
            if (!taskId) return;
            const data = dummy[+taskId - 1];
            setTask(data);
        })();
    }, []);

    return (
        <>
            <St.TaskDetailSection>
                <St.TaskDetailHeading>
                    <Title level={1}>{task?.serviceName}</Title>
                    <Text>{task?.serviceChildrenName}</Text>
                </St.TaskDetailHeading>

                <St.TaskDetailContent>
                    <St.TaskDetailInfo>
                        <St.TaskDetailTextKey level={2}>Ngày:</St.TaskDetailTextKey>
                        <St.TaskDetailTextValue>
                            {dayjs(task?.date).format('DD/MM/YYYY')}
                        </St.TaskDetailTextValue>
                    </St.TaskDetailInfo>

                    <St.TaskDetailInfo>
                        <St.TaskDetailTextKey level={2}>Thời gian:</St.TaskDetailTextKey>
                        <St.TaskDetailTextValue>
                            {task?.startTime + ' - ' + task?.endTime}
                        </St.TaskDetailTextValue>
                    </St.TaskDetailInfo>

                    <St.TaskDetailInfo>
                        <St.TaskDetailTextKey level={2}>Trạng thái:</St.TaskDetailTextKey>

                        <St.TaskDetailStatus $status={(task?.status as Status) || ''}>
                            {task?.status}
                        </St.TaskDetailStatus>
                    </St.TaskDetailInfo>

                    <St.TaskDetailInfo>
                        <St.TaskDetailTextKey level={2}>Ghi chú:</St.TaskDetailTextKey>
                        <St.TaskDetailTextValue>{task?.note}</St.TaskDetailTextValue>
                    </St.TaskDetailInfo>

                    <St.TaskDetailInfo>
                        <St.TaskDetailTextKey level={2}>Thông tin khách hàng:</St.TaskDetailTextKey>

                        <St.TaskDetailInfo>
                            <ul>
                                <li>
                                    <St.TaskDetailTextKey level={3}>Tên:</St.TaskDetailTextKey>
                                    <St.TaskDetailTextValue>
                                        {userDummy.fullName}
                                    </St.TaskDetailTextValue>
                                </li>

                                <li>
                                    <St.TaskDetailTextKey level={3}>
                                        Số điện thoại:
                                    </St.TaskDetailTextKey>
                                    <St.TaskDetailTextValue>
                                        {userDummy.phoneNumber}
                                    </St.TaskDetailTextValue>
                                </li>

                                <li>
                                    <St.TaskDetailTextKey level={3}>Địa chỉ:</St.TaskDetailTextKey>
                                    <St.TaskDetailTextValue>
                                        {userDummy.address}
                                    </St.TaskDetailTextValue>
                                </li>
                            </ul>
                        </St.TaskDetailInfo>
                    </St.TaskDetailInfo>
                </St.TaskDetailContent>

                <Map address={task?.address || ''} />

                <Steps />
            </St.TaskDetailSection>
        </>
    );
};

export default TaskDetail;
