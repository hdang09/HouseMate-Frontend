import TextArea from 'antd/es/input/TextArea';
import { riceType, waterType } from './CreateServiceModal.types';
import { DatePicker, InputNumber, TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import * as Styled from './CreateServiceModal.styled';

const handleCycleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onTimeRangeChange = (value: any, formatString: [string, string]) => {
    console.log(value, formatString);
};

const onTimeChange = (value: Dayjs, dateString: string) => {
    console.log(value, dateString);
};

const onQuantityChange = (value: 1 | 10) => {
    console.log('changed', value);
};

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};

interface Field {
    id: number;
    name: string;
    input: JSX.Element;
}

interface Service {
    [key: string]: {
        id: string;
        title: string;
        fieldIds: number[];
    };
}

interface FieldItem {
    service: Service;
    field: {
        [key: number]: Field;
    };
}

export const fields: FieldItem = {
    service: {
        'cleaning-house': {
            id: 'cleaning-house',
            title: 'Cleaning House',
            fieldIds: [1, 2, 3, 4],
        },
        laundry: {
            id: 'laundry',
            title: 'Laundry',
            fieldIds: [5, 7, 6, 7, 3, 4],
        },
        'water-delivery': {
            id: 'water-delivery',
            title: 'Water delivery',
            fieldIds: [1, 7, 8, 9, 3, 4],
        },
        'rice-delivery': {
            id: 'rice-delivery',
            title: 'Rice delivery',
            fieldIds: [1, 7, 10, 9, 3, 4],
        },
    },
    field: {
        1: {
            id: 1,
            name: 'Date',
            input: <DatePicker />,
        },
        2: {
            id: 2,
            name: 'Time',
            input: (
                <TimePicker.RangePicker use12Hours format="h:mm a" onChange={onTimeRangeChange} />
            ),
        },
        3: {
            id: 3,
            name: 'Cycle',
            input: (
                <Styled.ModalSelect
                    defaultValue="Choose cycle"
                    style={{ width: 150 }}
                    onChange={handleCycleChange}
                    options={[
                        { value: 'Only one time', label: 'Every week' },
                        { value: 'Every week', label: 'Every week' },
                    ]}
                />
            ),
        },
        4: {
            id: 4,
            name: 'Note',
            input: (
                <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                    onChange={onChange}
                    placeholder="Write your note"
                />
            ),
        },
        5: {
            id: 5,
            name: 'Pick up date',
            input: <DatePicker />,
        },
        6: {
            id: 6,
            name: 'Received date: ',
            input: <DatePicker />,
        },
        7: {
            id: 7,
            name: 'Time',
            input: <TimePicker use12Hours format="h:mm a" />,
        },
        8: {
            id: 8,
            name: 'Type',
            input: (
                <Styled.ModalSelect
                    defaultValue="Choose type"
                    style={{ width: 150 }}
                    onChange={handleCycleChange}
                    options={waterType}
                />
            ),
        },
        9: {
            id: 9,
            name: 'Quantity',
            input: <InputNumber min={1} max={10} defaultValue={1} />,
        },
        10: {
            id: 10,
            name: 'Type',
            input: (
                <Styled.ModalSelect
                    defaultValue="Choose type"
                    style={{ width: 150 }}
                    onChange={handleCycleChange}
                    options={riceType}
                />
            ),
        },
    },
};
