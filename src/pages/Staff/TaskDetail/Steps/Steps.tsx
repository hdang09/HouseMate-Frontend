import { StepsStyled } from './Steps.styled';

const description = 'This is a description.';

const Steps = () => {
    return (
        <StepsStyled
            direction="vertical"
            size="small"
            current={0}
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

export default Steps;
