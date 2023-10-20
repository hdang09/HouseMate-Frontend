import { Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Category, OrderBy, Rating } from '@/utils/enums';
import { OptionType } from './Sidebar.type';

const { Text } = Typography;

export const sortOptions: OptionType[] = [
    { value: OrderBy.ASC, label: 'Lower to upper' },
    { value: OrderBy.DESC, label: 'Upper to lower' },
];

export const serviceOptions: OptionType[] = [
    {
        value: Category.SINGLE_SERVICE_UPPER,
        label: 'Single service',
    },
    {
        value: Category.PACKAGE_SERVICE_UPPER,
        label: 'Package service',
    },
];

export const expirationOptions: OptionType[] = [
    {
        value: 'os',
        label: 'On service',
    },
    {
        value: 'oos',
        label: 'Out of service',
    },
];

export const ratingOptions: OptionType[] = [
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
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: Rating.THREE,
        label: (
            <Space>
                <Text>3</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: Rating.TWO,
        label: (
            <Space>
                <Text>2</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: Rating.ONE,
        label: (
            <Space>
                <Text>1</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
];
