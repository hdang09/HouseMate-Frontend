import { Flex, Modal, Skeleton, Spin, Typography, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import Map from '@/components/Map';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { GroupType, Status, StatusLabel } from '@/utils/enums';
import { cancelTask, getTaskById } from '@/utils/staffAPI';
import { useDocumentTitle } from '@/hooks';

import Steps from './Steps';
import * as St from './TaskDetail.styled';

const { Title, Text } = Typography;

const TaskDetail = () => {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);

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

    const renderStatus = (status: Status) => {
        switch (status) {
            case Status.DONE:
                return StatusLabel.DONE;

            case Status.INCOMING:
                return StatusLabel.INCOMING;

            case Status.PENDING:
                return StatusLabel.PENDING;

            case Status.CANCEL:
                return StatusLabel.CANCEL;

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
                                <Title level={1}>
                                    {task?.service && task?.service.packageName.length > 0
                                        ? task?.service.packageName
                                        : task?.service.titleName}
                                </Title>
                                <Text>{task?.service.titleName}</Text>
                            </>
                        )}
                    </St.TaskDetailHeading>

                    <St.TaskDetailContent>
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <>
                                {task?.service.groupType === GroupType.RETURN_SERVICE ? (
                                    <>
                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Thời gian gửi:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailTextValue>
                                                {`${dayjs(task?.schedule.startDate).format(
                                                    'H:mm',
                                                )} ${dayjs(task?.schedule.startDate).format(
                                                    'dddd, DD/MM/YYYY',
                                                )}`}
                                            </St.TaskDetailTextValue>
                                        </St.TaskDetailInfo>

                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Thời gian trả:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailTextValue>
                                                {`${dayjs(task?.schedule.endDate).format(
                                                    'H:mm',
                                                )} ${dayjs(task?.schedule.endDate).format(
                                                    'dddd, DD/MM/YYYY',
                                                )}`}
                                            </St.TaskDetailTextValue>
                                        </St.TaskDetailInfo>
                                    </>
                                ) : (
                                    <>
                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Ngày:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailTextValue>
                                                {dayjs(task?.schedule.startDate).format(
                                                    'dddd, DD/MM/YYYY',
                                                )}
                                            </St.TaskDetailTextValue>
                                        </St.TaskDetailInfo>

                                        <St.TaskDetailInfo>
                                            <St.TaskDetailTextKey level={2}>
                                                Thời gian:
                                            </St.TaskDetailTextKey>
                                            <St.TaskDetailTextValue>
                                                {`${dayjs(task?.schedule.startDate).format(
                                                    'H:mm',
                                                )} - ${dayjs(task?.schedule.endDate).format(
                                                    'H:mm',
                                                )}`}
                                            </St.TaskDetailTextValue>
                                        </St.TaskDetailInfo>
                                    </>
                                )}

                                <St.TaskDetailInfo>
                                    <St.TaskDetailTextKey level={2}>
                                        Trạng thái:
                                    </St.TaskDetailTextKey>

                                    <St.TaskDetailStatus
                                        $status={(task?.schedule.status as Status) || ''}
                                    >
                                        {renderStatus(task?.schedule.status as Status)}
                                    </St.TaskDetailStatus>
                                </St.TaskDetailInfo>

                                {task?.schedule && task.schedule.quantityRetrieve > 0 && (
                                    <St.TaskDetailInfo>
                                        <St.TaskDetailTextKey level={2}>
                                            Khách hàng yêu cầu:
                                        </St.TaskDetailTextKey>
                                        <St.TaskDetailTextValue>
                                            {task.schedule.quantityRetrieve +
                                                ' ' +
                                                task.service.unitOfMeasure}
                                        </St.TaskDetailTextValue>
                                    </St.TaskDetailInfo>
                                )}

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
                                                <St.TaskDetailTextKey level={3}>
                                                    Số điện thoại:
                                                </St.TaskDetailTextKey>
                                                <St.TaskDetailTextValue>
                                                    {task?.customer.phoneNumber}
                                                </St.TaskDetailTextValue>
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
                                disabled={task?.schedule.status !== Status.PENDING}
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
