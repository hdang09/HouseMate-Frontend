import { Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Category, OrderBy, Rating } from '@/utils/enums';
import { OptionType } from './Sidebar.type';

const { Text } = Typography;

export const sortOptions: OptionType[] = [
    { value: OrderBy.ASC, label: 'Thấp đến Cao' },
    { value: OrderBy.DESC, label: 'Cao đến Thấp' },
];

export const serviceOptions: OptionType[] = [
    {
        value: Category.SINGLE_SERVICE_UPPER,
        label: 'Dịch vụ đơn lẻ',
    },
    {
        value: Category.PACKAGE_SERVICE_UPPER,
        label: 'Gói dịch vụ',
    },
];

export const expirationOptions: OptionType[] = [
    {
        value: 'os',
        label: 'Còn hạn',
    },
    {
        value: 'oos',
        label: 'Hết hạn',
    },
];

export const ratingOptions: OptionType[] = [
    {
        value: Rating.ZERO,
        label: (
            <Space>
                <Text>Tất cả</Text>
                <StarFilled />
            </Space>
        ),
    },
    {
        value: Rating.FIVE,
        label: (
            <Space>
                <Text>5</Text>
                <StarFilled />
            </Space>
        ),
    },
    {
        value: Rating.FOUR,
        label: (
            <Space>
                <Text>4</Text>
                <StarFilled />
                <Text>trở lên</Text>
            </Space>
        ),
    },
    {
        value: Rating.THREE,
        label: (
            <Space>
                <Text>3</Text>
                <StarFilled />
                <Text>trở lên</Text>
            </Space>
        ),
    },
    {
        value: Rating.TWO,
        label: (
            <Space>
                <Text>2</Text>
                <StarFilled />
                <Text>trở lên</Text>
            </Space>
        ),
    },
    {
        value: Rating.ONE,
        label: (
            <Space>
                <Text>1</Text>
                <StarFilled />
                <Text>trở lên</Text>
            </Space>
        ),
    },
];
