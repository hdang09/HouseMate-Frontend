import { ReportType } from '@/components/Calendar/Calendar';
import { Image, Steps } from 'antd';
import { FormParagraph } from '../../ServiceModal.styled';

const description = 'This is a description.';

type ProgressProps = {
    report?: ReportType;
};
const Progress = ({ report }: ProgressProps) => (
    <Steps
        direction="vertical"
        current={1}
        items={[
            {
                title: 'Đã đến',
                description: [report?.arrivedTime],
            },
            {
                title: 'Đang làm việc',
                description: (
                    <>
                        <FormParagraph>Hình ảnh trước khi làm ({report?.doingTime})</FormParagraph>
                        {report?.images.beforeWork.map((image, index) => (
                            <div key={index}>
                                <Image src={image} />
                            </div>
                        ))}
                    </>
                ),
            },
            {
                title: 'Đã hoàn thành',
                description,
            },
            {
                title: 'Nhận xét',
                description,
            },
        ]}
    />
);

export default Progress;
