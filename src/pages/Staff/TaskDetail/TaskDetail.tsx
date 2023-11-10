import { Divider, Flex, Image, Modal, Skeleton, Spin, Typography, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';

import zaloLogo from '@/assets/images/zalo.png';
import fallBackImage from '@/assets/images/fallback-img.png';
import Map from '@/components/Map';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { GroupType, TaskStatus, TaskStatusLabel } from '@/utils/enums';
import { cancelTask, getTaskById } from '@/utils/staffAPI';
import { useDocumentTitle } from '@/hooks';
import { weekDayFormat } from '@/utils/weekDayFormat';

import Steps from './Steps';
import * as St from './TaskDetail.styled';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Text } = Typography;

const TaskDetail = () => {
    // Show message
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [modal, contextHolderModal] = Modal.useModal();

    // const [modal, contextHolderModal] = Modal.useModal();
    const { taskId } = useParams();
    const [task, setTask] = useState<JobItemType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);

    useDocumentTitle(`${task ? `${task.service.titleName} | HouseMate` : 'Đang Tải...'}`);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!taskId) return;
                const { data } = await getTaskById(Number(taskId));

                setTask(data);
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn đã chắc chắn hủy công việc này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để hủy công việc này.',
            okText: 'Quay lại',
            onCancel: handleCancelTask,
            cancelText: 'Xác nhận',
        });
    };

    const renderStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.PENDING_WORKING:
                return TaskStatusLabel.PENDING_WORKING;

            case TaskStatus.INCOMING:
                return TaskStatusLabel.INCOMING;

            case TaskStatus.ARRIVED:
                return TaskStatusLabel.ARRIVED;

            case TaskStatus.DOING:
                return TaskStatusLabel.DOING;

            case TaskStatus.DONE:
                return TaskStatusLabel.DONE;

            case TaskStatus.CANCELLED:
                return TaskStatusLabel.CANCELLED;

            case TaskStatus.CANCELLED_BY_CUSTOMER:
                return TaskStatusLabel.CANCELLED_BY_CUSTOMER;

            case TaskStatus.CANCELLED_BY_STAFF:
                return TaskStatusLabel.CANCELLED_BY_STAFF;

            case TaskStatus.CANCELLED_CAUSE_NOT_FOUND_STAFF:
                return TaskStatusLabel.CANCELLED_CAUSE_NOT_FOUND_STAFF;

            default:
                break;
        }
    };

    const handleCancelTask = async () => {
        try {
            if (!task?.schedule.scheduleId) return;

            await cancelTask(task?.schedule.scheduleId);

            messageApi.open({
                type: 'success',
                content: 'Đã hủy công việc thành công!',
            });

            setReload(!reload);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        }
    };

    return (
        <>
            {contextHolderMessage}

            <Spin size="small" spinning={loading} tip="Đang tải...">
                <St.TaskDetailSection>
                    <St.TaskDetailHeading>
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                <Title level={1}>{task?.service.titleName}</Title>
                                <Text>
                                    {task?.service && task?.service.packageName.length > 0
                                        ? task?.service.packageName
                                        : task?.service.titleName}
                                </Text>
                            </>
                        )}
                    </St.TaskDetailHeading>

                    <St.TaskDetailContent>
                        <Divider />

                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                {task?.service.groupType === GroupType.RETURN_SERVICE ? (
                                    <>
                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Ngày nhận:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailDateValue>
                                                {`${dayjs(task?.schedule.startDate).calendar(null, {
                                                    lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                    sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                    nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                    lastWeek: `[${weekDayFormat(
                                                        dayjs(task?.schedule.startDate).format('d'),
                                                    )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                    nextWeek: `[${weekDayFormat(
                                                        dayjs(task?.schedule.startDate).format('d'),
                                                    )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                })}`}
                                            </St.TaskDetailDateValue>
                                        </St.TaskDetailInfo>

                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Ngày trả:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailDateValue>
                                                {`${dayjs(task?.schedule.endDate).calendar(null, {
                                                    lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                    sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                    nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                    lastWeek: `[${weekDayFormat(
                                                        dayjs(task?.schedule.endDate).format('d'),
                                                    )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                    nextWeek: `[${weekDayFormat(
                                                        dayjs(task?.schedule.endDate).format('d'),
                                                    )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                })}`}
                                            </St.TaskDetailDateValue>
                                        </St.TaskDetailInfo>
                                    </>
                                ) : (
                                    <St.TaskDetailInfo>
                                        <St.TaskDetailTextKey level={2}>Ngày:</St.TaskDetailTextKey>
                                        <St.TaskDetailDateValue>
                                            {`${dayjs(task?.schedule.startDate).calendar(null, {
                                                lastDay: '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                sameDay: '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                nextDay: '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                lastWeek: `[${weekDayFormat(
                                                    dayjs(task?.schedule.startDate).format('d'),
                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                nextWeek: `[${weekDayFormat(
                                                    dayjs(task?.schedule.startDate).format('d'),
                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                            })}`}
                                        </St.TaskDetailDateValue>
                                    </St.TaskDetailInfo>
                                )}

                                {task?.schedule && task.schedule.quantityRetrieve > 0 && (
                                    <St.TaskDetailInfo>
                                        <St.TaskDetailTextKey level={2}>
                                            Khách hàng yêu cầu:
                                        </St.TaskDetailTextKey>
                                        <St.TaskDetailDateValue>
                                            {task.schedule.quantityRetrieve +
                                                ' ' +
                                                task.service.unitOfMeasure}
                                        </St.TaskDetailDateValue>
                                    </St.TaskDetailInfo>
                                )}

                                <Divider />

                                <St.TaskDetailInfo>
                                    <St.TaskDetailTextKey level={2}>
                                        Trạng thái:
                                    </St.TaskDetailTextKey>

                                    <St.TaskDetailStatus $status={task?.taskStatus as TaskStatus}>
                                        {renderStatus(task?.taskStatus as TaskStatus)}
                                    </St.TaskDetailStatus>
                                </St.TaskDetailInfo>

                                <Divider />

                                <St.TaskDetailInfo>
                                    <St.TaskDetailTextKey level={2}>Ghi chú:</St.TaskDetailTextKey>
                                    <St.TaskDetailTextValue>
                                        {task?.schedule && task.schedule.note.length > 0
                                            ? task?.schedule.note
                                            : 'Không có ghi chú'}
                                    </St.TaskDetailTextValue>
                                </St.TaskDetailInfo>
                            </>
                        )}

                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                <St.TaskDetailInfo>
                                    <St.TaskDetailTextKey level={2}>
                                        Thông tin khách hàng:
                                    </St.TaskDetailTextKey>

                                    <St.TaskDetailInfo>
                                        <ul>
                                            <li>
                                                <St.TaskDetailTextKey level={3}>
                                                    Tên:
                                                </St.TaskDetailTextKey>
                                                <St.TaskDetailTextValue>
                                                    {task?.customer.fullName}
                                                </St.TaskDetailTextValue>
                                            </li>

                                            <li>
                                                <Flex gap={12} align='center'>
                                                    <a href={`tel:${task?.customer.phoneNumber}`}>
                                                        <St.TaskDetailTextKey level={3}>
                                                            Số điện thoại:
                                                        </St.TaskDetailTextKey>
                                                        <St.TaskDetailPhoneValue>
                                                            {task?.customer.phoneNumber}
                                                        </St.TaskDetailPhoneValue>
                                                    </a>

                                                    <a
                                                        href={`https://zalo.me/${task?.customer.phoneNumber}`}
                                                    >
                                                        <Image
                                                            src={zaloLogo}
                                                            alt="Zalo"
                                                            fallback={fallBackImage}
                                                            preview={false}
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </a>
                                                </Flex>
                                            </li>

                                            <li>
                                                <St.TaskDetailTextKey level={3}>
                                                    Địa chỉ:
                                                </St.TaskDetailTextKey>
                                                <St.TaskDetailTextValue>
                                                    {task?.addressWorking}
                                                </St.TaskDetailTextValue>
                                            </li>
                                        </ul>
                                    </St.TaskDetailInfo>
                                </St.TaskDetailInfo>
                            </>
                        )}
                    </St.TaskDetailContent>

                    <Map address={task?.addressWorking || ''} />

                    <Steps task={task} setReload={setReload} />

                    {task?.taskReportList.length === 0 && (
                        <Flex justify="flex-end">
                            <St.TaskDetailButton
                                type="primary"
                                disabled={task?.taskStatus !== TaskStatus.PENDING_WORKING}
                                onClick={confirm}
                            >
                                Hủy
                            </St.TaskDetailButton>
                        </Flex>
                    )}
                </St.TaskDetailSection>
            </Spin>

            {contextHolderModal}
        </>
    );
};

export default TaskDetail;
