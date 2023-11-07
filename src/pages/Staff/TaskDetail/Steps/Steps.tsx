import { Button, Flex, InputNumber, Modal, Typography, Upload, UploadProps, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { Dispatch, memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { getServiceConfigByType } from '@/utils/configAPI';
import { ConfigType, GroupType, Status, TaskStatus } from '@/utils/enums';
import { reportTask } from '@/utils/staffAPI';

import { StepsStyled } from './Steps.styled';

const { Text } = Typography;

const description = 'This is a description.';

const Steps = ({
    task,
    setReload,
}: {
    task: JobItemType | undefined;
    setReload: Dispatch<React.SetStateAction<boolean>>;
}) => {
    dayjs.locale('vi');
    dayjs.extend(relativeTime);

    // Show message
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [modal, contextHolderModal] = Modal.useModal();

    const [minuteConfig, setMinuteConfig] = useState<number>(0);
    const [isArrived, setIsArrived] = useState<boolean>(false);

    const [quantityRetrieve, setQuantityRetrieve] = useState<number>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getServiceConfigByType(
                    ConfigType.DURATION_MINUTES_TIMES_STAFF_START_REPORT,
                );

                setMinuteConfig(Number(data[0].configValue));
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: error.response ? error.response.data : error.message,
                });
            }
        })();
    }, []);

    useEffect(() => {
        if (!task?.taskId) return;

        const now = dayjs();
        const minium = dayjs(task?.schedule.startDate).subtract(minuteConfig, 'minute');
        const maximum = dayjs(task?.schedule.startDate).add(minuteConfig, 'minute');

        if (now > minium && now < maximum) setIsArrived(true);
    }, [task]);

    // Confirm modal
    const confirmArrived = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn đã đến nơi?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để bắt đầu làm việc.',
            okText: 'Quay lại',
            onCancel: reportArrived,
            cancelText: 'Xác nhận',
        });
    };

    const confirmDoing = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn đã kiểm tra kỹ thông tin?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để bắt đầu làm việc.',
            okText: 'Quay lại',
            onCancel: reportDoing,
            cancelText: 'Xác nhận',
        });
    };

    // Step 1: Report arrived
    const reportArrived = async () => {
        try {
            if (!task || !task?.taskId || !isArrived) return;
            await reportTask(task.taskId, TaskStatus.ARRIVED);
            setReload((prev) => !prev);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        }
    };

    // Step 2: Report working
    const beforeUploadFile = () => {
        return false;
    };

    const onChangeFile: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        if (fileList.length >= 5) return;

        // const imageList = newFileList.map((file) => file.originFileObj);
        setFileList(newFileList);
    };

    const handlePreviewFile = (file: UploadFile) => {
        setPreviewImage(URL.createObjectURL(file.originFileObj as RcFile));
        setPreviewOpen(true);
    };

    const handleChangeQuantityRetrieve = (value: number | null) =>
        setQuantityRetrieve(Number(value));

    const reportDoing = async () => {
        try {
            if (!task || !task?.taskId) return;
            await reportTask(task.taskId, TaskStatus.DOING);
            setReload((prev) => !prev);
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
                                <Button
                                    type="primary"
                                    disabled={
                                        !isArrived || task?.schedule.status !== Status.INCOMING
                                    }
                                    onClick={confirmArrived}
                                >
                                    Đã đến
                                </Button>
                            ),
                    },
                    {
                        title: 'Đang làm việc',
                        description: (
                            <Flex vertical gap={12} align="flex-start">
                                {task?.service.groupType === GroupType.RETURN_SERVICE && (
                                    <Flex align="center" gap={6}>
                                        <Text style={{ flexShrink: 0 }}>Số lượng:</Text>
                                        <InputNumber
                                            min={task.service.min}
                                            max={task.service.max}
                                            precision={0}
                                            defaultValue={task.service.min}
                                            value={quantityRetrieve}
                                            onChange={handleChangeQuantityRetrieve}
                                            style={{ maxWidth: '70px' }}
                                        />
                                        <Text>{task.service.unitOfMeasure}</Text>
                                    </Flex>
                                )}

                                <ImgCrop rotationSlider>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChangeFile}
                                        beforeUpload={beforeUploadFile}
                                        onPreview={handlePreviewFile}
                                    >
                                        {fileList.length < 5 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>

                                <Button type="primary" onClick={confirmDoing}>
                                    Xác nhận
                                </Button>
                            </Flex>
                        ),
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

            <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt={task?.service.titleName} style={{ width: '100%' }} src={previewImage} />
            </Modal>

            {contextHolderModal}
        </>
    );
};

export default memo(Steps);
