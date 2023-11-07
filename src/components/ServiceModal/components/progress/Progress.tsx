import { Button, Modal, Rate, Row, Steps, Typography, notification } from 'antd';
import { FormParagraph } from '../../ServiceModal.styled';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import * as styled from '@/components/ServiceModal/ServiceModal.styled';
import { FeedbackType, ReportType } from '@/components/Calendar/Calendar.types';
import { useState } from 'react';
import { createFeedback } from '@/utils/feedbackAPI';
import { Input } from 'antd';
import fallbackImg from '@/assets/images/fallback-img.png';

type ProgressProps = {
    serviceId?: number;
    report?: ReportType[];
    feedback?: FeedbackType;
};
const Progress = ({ report, feedback, serviceId }: ProgressProps) => {
    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const { TextArea } = Input;
    const { Text } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackForm, setFeedBackForm] = useState<FeedbackType>({
        taskId: (report && report[0]?.taskId) || 0,
        serviceId: serviceId || 0,
        content: null,
        rating: 0,
    });
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleFeedback(feedbackForm);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFeedback = async (feedback: FeedbackType) => {
        try {
            await createFeedback(feedback);

            api.success({ message: 'Thành công', description: 'Đánh giá thành công' });
        } catch (error: any) {
            api.error({
                message: 'Thất bại',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title="Give Feed" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <FormParagraph>
                    Bạn có hài lòng với dịch vụ của <Text>House</Text>
                    <Text>Mate</Text> .
                </FormParagraph>
                <Row justify={'center'}>
                    <Rate
                        onChange={(value: number) =>
                            setFeedBackForm({ ...feedbackForm, rating: value })
                        }
                    />
                </Row>
                <styled.FormTitle style={{ marginTop: '15px' }}>
                    Hãy chia sẻ trải nghiệm cho dịch vụ này bạn nhé!
                </styled.FormTitle>
                <TextArea
                    rows={4}
                    placeholder="Mô tả trải nghiệm của bạn"
                    onChange={(e: any) =>
                        setFeedBackForm({ ...feedbackForm, content: e.target.value })
                    }
                />
            </Modal>
            <Steps
                direction="vertical"
                current={report ? (feedback?.content ? report.length + 1 : report.length) : 0}
                items={[
                    {
                        title: 'Đã đến',
                        description: (
                            <div>
                                {report
                                    ? report.length > 0
                                        ? dayjs(report[0]?.reportAt).toDate().toUTCString()
                                        : 'Nhân viên chưa đến'
                                    : "'Nhân viên chưa đến"}
                            </div>
                        ),
                    },
                    {
                        title: 'Đang làm việc',
                        description: (
                            <>
                                <div>
                                    Hình ảnh trước khi làm (
                                    {report
                                        ? report.length > 1
                                            ? dayjs(report[1].reportAt).toDate().toUTCString()
                                            : 'Nhân viên vân chưa cập nhật dữ liệu'
                                        : 'Nhân viên vân chưa cập nhật dữ liệu'}
                                    )
                                </div>
                                {report ? (
                                    report.length > 1 ? (
                                        <styled.ImageWrapper>
                                            <Swiper
                                                slidesPerView={3}
                                                navigation={true}
                                                modules={[Navigation]}
                                                spaceBetween={15}
                                                className="mySwiper"
                                            >
                                                {report &&
                                                    report[1]?.taskReportImages.map(
                                                        (image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <styled.Picture
                                                                    src={image.imageUrl}
                                                                    fallback={fallbackImg}
                                                                />
                                                            </SwiperSlide>
                                                        ),
                                                    )}
                                            </Swiper>
                                        </styled.ImageWrapper>
                                    ) : (
                                        ''
                                    )
                                ) : (
                                    ''
                                )}
                            </>
                        ),
                    },
                    {
                        title: 'Đã hoàn thành',
                        description: (
                            <>
                                <div>
                                    Hình ảnh sau khi làm (
                                    {report
                                        ? report.length > 2
                                            ? dayjs(report[2]?.reportAt).toDate().toUTCString()
                                            : 'Nhân viên vân chưa cập nhật dữ liệu'
                                        : 'Nhân viên chưa cập nhật dữ liệu'}
                                    )
                                </div>
                                {report ? (
                                    report.length > 2 ? (
                                        <styled.ImageWrapper>
                                            <Swiper
                                                slidesPerView={3}
                                                navigation={true}
                                                modules={[Navigation]}
                                                spaceBetween={15}
                                                className="mySwiper"
                                            >
                                                {report &&
                                                    report[2]?.taskReportImages.map(
                                                        (image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <styled.Picture
                                                                    src={image.imageUrl}
                                                                    fallback={fallbackImg}
                                                                />
                                                            </SwiperSlide>
                                                        ),
                                                    )}
                                            </Swiper>
                                        </styled.ImageWrapper>
                                    ) : (
                                        ''
                                    )
                                ) : (
                                    ''
                                )}
                            </>
                        ),
                    },
                    {
                        title: 'Nhận xét',
                        description: (
                            <>
                                {report ? (
                                    report.length <= 3 && feedback == null ? (
                                        <>
                                            <Button
                                                onClick={showModal}
                                                disabled={
                                                    report.length < 3 ||
                                                    dayjs().diff(report[1]?.reportAt, 'day') > 7
                                                }
                                            >
                                                Viết đánh giá
                                            </Button>

                                            {dayjs().diff(report[1]?.reportAt, 'day') > 7 && (
                                                <FormParagraph style={{ marginTop: '5px' }}>
                                                    Đã quá hạn nhận xét
                                                </FormParagraph>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Rate
                                                style={{ height: '10px' }}
                                                count={5}
                                                defaultValue={feedback ? feedback.rating : 0}
                                                allowHalf
                                                disabled
                                            />
                                            <FormParagraph>{feedback?.content}</FormParagraph>{' '}
                                        </>
                                    )
                                ) : (
                                    ''
                                )}
                            </>
                        ),
                    },
                ]}
            />
        </>
    );
};

export default Progress;
