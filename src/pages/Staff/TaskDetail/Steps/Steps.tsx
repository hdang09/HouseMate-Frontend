import {
    Button,
    Carousel,
    Flex,
    InputNumber,
    Modal,
    Typography,
    Upload,
    UploadProps,
    message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { Dispatch, memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import fallBackImage from '@/assets/images/fallback-img.png';
import { JobItemType } from '@/pages/Staff/Job/Job.type';
import { getServiceConfigByType } from '@/utils/configAPI';
import { ConfigType, GroupType, ImageEnum, TaskStatus } from '@/utils/enums';
import { reportTask } from '@/utils/staffAPI';
import { uploadImageList } from '@/utils/uploadAPI';

import { ImageSteps, StepsReportText, StepsStyled } from './Steps.styled';
import { AiOutlineEye } from 'react-icons/ai';
import { Rating } from '@/components/ServiceList/ServiceItem/ServiceItem.styled';

const { Text } = Typography;

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

    const [quantityRetrieve, setQuantityRetrieve] = useState<number>(1);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageList, setImageList] = useState<(RcFile | undefined)[]>([]);
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
        const maximum = dayjs(task?.schedule.endDate);

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

    const confirmDone = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn đã kiểm tra kỹ thông tin?',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhấn “Xác nhận” để hoàn tất công việc.',
            okText: 'Quay lại',
            onCancel: reportDone,
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

        const imageList = newFileList.map((file) => file.originFileObj);
        setFileList(newFileList);
        setImageList(imageList);
    };

    const handlePreviewFile = (file: UploadFile) => {
        setPreviewImage(URL.createObjectURL(file.originFileObj as RcFile));
        setPreviewOpen(true);
    };

    const handleChangeQuantityRetrieve = (value: number | null) =>
        setQuantityRetrieve(Number(value));

    const handleCheckQuantityImage = () =>
        messageApi.open({
            type: 'error',
            content: 'Vui lòng chụp ít nhất 1 ảnh để xác nhận trạng thái làm việc.',
        });

    const reportDoing = async () => {
        try {
            if (!task || !task?.taskId) return;

            const { data } = await reportTask(task.taskId, TaskStatus.DOING);
            await uploadImageList(imageList, ImageEnum.WORKING, data.taskReportId);

            setFileList([]);
            setImageList([]);
            setReload((prev) => !prev);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        }
    };

    // Step 3: Report done
    const reportDone = async () => {
        try {
            if (!task || !task?.taskId) return;

            const { data } = await reportTask(task.taskId, TaskStatus.DONE, {
                note: '',
                qtyOfGroupReturn: quantityRetrieve,
            });
            await uploadImageList(imageList, ImageEnum.WORKING, data.taskReportId);

            setFileList([]);
            setImageList([]);
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

            <Flex vertical gap={2} style={{ marginTop: '16px' }}>
                <StepsReportText level={2}>Báo cáo công việc</StepsReportText>

                <StepsStyled
                    direction="vertical"
                    current={
                        task?.feedback
                            ? task?.taskReportList.length + 1
                            : task?.taskReportList.length || -1
                    }
                    items={[
                        {
                            title: 'Đã đến',
                            description:
                                task && task.taskReportList.length >= 1 ? (
                                    <Text>
                                        {`Vào lúc ${dayjs(task?.taskReportList[0].reportAt).format(
                                            'H:mm dddd, DD/MM/YYYY',
                                        )}`}
                                    </Text>
                                ) : (
                                    task?.taskStatus !== TaskStatus.ARRIVED && (
                                        <Button
                                            type="primary"
                                            disabled={
                                                !isArrived ||
                                                task?.taskStatus !== TaskStatus.INCOMING
                                            }
                                            onClick={confirmArrived}
                                        >
                                            Đã đến
                                        </Button>
                                    )
                                ),
                        },
                        {
                            title: 'Đang làm việc',
                            description:
                                task && task.taskReportList.length >= 2 ? (
                                    <Flex vertical gap={12}>
                                        <Text>
                                            {`Vào lúc ${dayjs(
                                                task?.taskReportList[1].reportAt,
                                            ).format('H:mm dddd, DD/MM/YYYY')}`}
                                        </Text>
                                        <Text>Ảnh trước khi làm việc:</Text>

                                        <Carousel style={{ width: '200px' }}>
                                            {task.taskReportList[1].taskReportImages.length > 0 ? (
                                                task.taskReportList[1].taskReportImages.map(
                                                    (image) => (
                                                        <ImageSteps
                                                            key={image.imageId}
                                                            width={200}
                                                            height={200}
                                                            src={image.imageUrl}
                                                            alt={task.service.titleName}
                                                            fallback={fallBackImage}
                                                            preview={{
                                                                mask: <AiOutlineEye size={30} />,
                                                            }}
                                                        />
                                                    ),
                                                )
                                            ) : (
                                                <Text>Chưa có dữ liệu hình ảnh</Text>
                                            )}
                                        </Carousel>
                                    </Flex>
                                ) : (
                                    task?.taskStatus !== TaskStatus.DOING && (
                                        <Flex vertical gap={12} align="flex-start">
                                            <Upload
                                                listType="picture-card"
                                                fileList={
                                                    task?.taskStatus !== TaskStatus.ARRIVED
                                                        ? []
                                                        : fileList
                                                }
                                                onChange={onChangeFile}
                                                beforeUpload={beforeUploadFile}
                                                onPreview={handlePreviewFile}
                                                disabled={task?.taskStatus !== TaskStatus.ARRIVED}
                                                multiple
                                            >
                                                {fileList.length < 5 && '+ Tải lên'}
                                            </Upload>

                                            <Button
                                                type="primary"
                                                onClick={
                                                    imageList.length < 1
                                                        ? handleCheckQuantityImage
                                                        : confirmDoing
                                                }
                                                disabled={task?.taskStatus !== TaskStatus.ARRIVED}
                                            >
                                                Xác nhận
                                            </Button>
                                        </Flex>
                                    )
                                ),
                        },
                        {
                            title: 'Đã hoàn thành',
                            description:
                                task && task.taskReportList.length >= 3 ? (
                                    <Flex vertical gap={12}>
                                        <Text>
                                            {`Vào lúc ${dayjs(
                                                task?.taskReportList[2].reportAt,
                                            ).format('H:mm dddd, DD/MM/YYYY')}`}
                                        </Text>

                                        {task?.service.groupType === GroupType.RETURN_SERVICE && (
                                            <Flex vertical gap={6}>
                                                <Flex align="center" gap={6}>
                                                    <Text style={{ flexShrink: 0 }}>Số lượng:</Text>
                                                    <InputNumber
                                                        precision={0}
                                                        defaultValue={
                                                            task.taskReportList[2].quantityRemainder
                                                        }
                                                        style={{ maxWidth: '70px' }}
                                                        disabled={
                                                            task?.taskStatus !== TaskStatus.DOING
                                                        }
                                                    />
                                                    <Text>{task.service.unitOfMeasure}</Text>
                                                </Flex>

                                                {task.taskReportList[2].quantityRemainder > 0 && (
                                                    <Flex vertical>
                                                        <Text style={{ flexShrink: 0 }}>

                                                        </Text>
                                                    </Flex>
                                                )}
                                            </Flex>
                                        )}

                                        <Text>Ảnh sau khi làm việc:</Text>

                                        <Carousel style={{ width: '200px' }}>
                                            {task.taskReportList[2].taskReportImages.length > 0 ? (
                                                task.taskReportList[2].taskReportImages.map(
                                                    (image) => (
                                                        <ImageSteps
                                                            key={image.imageId}
                                                            width={200}
                                                            height={200}
                                                            src={image.imageUrl}
                                                            alt={task.service.titleName}
                                                            fallback={fallBackImage}
                                                            preview={{
                                                                mask: <AiOutlineEye size={30} />,
                                                            }}
                                                        />
                                                    ),
                                                )
                                            ) : (
                                                <Text>Chưa có dữ liệu hình ảnh</Text>
                                            )}
                                        </Carousel>
                                    </Flex>
                                ) : (
                                    task?.taskStatus !== TaskStatus.DONE && (
                                        <Flex vertical gap={12} align="flex-start">
                                            {task?.service.groupType ===
                                                GroupType.RETURN_SERVICE && (
                                                <Flex align="center" gap={6}>
                                                    <Text style={{ flexShrink: 0 }}>Số lượng:</Text>
                                                    <InputNumber
                                                        precision={0}
                                                        value={quantityRetrieve}
                                                        onChange={handleChangeQuantityRetrieve}
                                                        style={{ maxWidth: '70px' }}
                                                        disabled={
                                                            task?.taskStatus !== TaskStatus.DOING
                                                        }
                                                    />
                                                    <Text>{task.service.unitOfMeasure}</Text>
                                                </Flex>
                                            )}

                                            <Upload
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                listType="picture-card"
                                                fileList={
                                                    task?.taskStatus !== TaskStatus.DOING
                                                        ? []
                                                        : fileList
                                                }
                                                onChange={onChangeFile}
                                                beforeUpload={beforeUploadFile}
                                                onPreview={handlePreviewFile}
                                                disabled={task?.taskStatus !== TaskStatus.DOING}
                                                multiple
                                            >
                                                {fileList.length < 5 && '+ Tải lên'}
                                            </Upload>

                                            <Button
                                                type="primary"
                                                onClick={
                                                    imageList.length < 1
                                                        ? handleCheckQuantityImage
                                                        : confirmDone
                                                }
                                                disabled={task?.taskStatus !== TaskStatus.DOING}
                                            >
                                                Xác nhận
                                            </Button>
                                        </Flex>
                                    )
                                ),
                        },
                        {
                            title: 'Nhận xét của khách hàng',
                            description: task?.feedback ? (
                                <Flex vertical gap={12}>
                                    <Rating
                                        count={5}
                                        value={task.feedback.rating}
                                        allowHalf
                                        disabled
                                    />
                                    <Text>{task.feedback.content}</Text>
                                </Flex>
                            ) : (
                                <Text>Chưa có đánh giá</Text>
                            ),
                        },
                    ]}
                />
            </Flex>
            <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt={task?.service.titleName} style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {contextHolderModal}
        </>
    );
};

export default memo(Steps);
