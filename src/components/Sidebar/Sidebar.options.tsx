import { Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { OptionType } from './Sidebar.type';

const { Text } = Typography;

export const sortOptions: OptionType[] = [
    { value: 'ltu', label: 'Lower to upper' },
    { value: 'utl', label: 'Upper to lower' },
];

export const serviceOptions: OptionType[] = [
    {
        value: 'single',
        label: 'Single service',
    },
    {
        value: 'package',
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
        value: '5',
        label: (
            <Space>
                <Text>5</Text>
                <StarFilled />
            </Space>
        ),
    },
    {
        value: '4',
        label: (
            <Space>
                <Text>4</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: '3',
        label: (
            <Space>
                <Text>3</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: '2',
        label: (
            <Space>
                <Text>2</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
    {
        value: '1',
        label: (
            <Space>
                <Text>1</Text>
                <StarFilled />
                <Text>upper</Text>
            </Space>
        ),
    },
];
