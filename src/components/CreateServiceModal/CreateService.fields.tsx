import { riceType, waterType } from './CreateServiceModal.types';

import InputDate from './components/data-entry/InputDate';
import InputTimeRange from './components/data-entry/InputTimeRange';
import InputCycle from './components/data-entry/InputCycle';
import InputNote from './components/data-entry/InputNote';
import InputTime from './components/data-entry/InputTime';
import InputType from './components/data-entry/InputType';
import InputQuantity from './components/data-entry/InputQuantity';

interface Field {
    id: number;
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
            fieldIds: [5, 7, 6, 11, 3, 4],
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
            input: <InputDate label="Date" />,
        },
        2: {
            id: 2,
            input: <InputTimeRange />,
        },
        3: {
            id: 3,
            input: <InputCycle />,
        },
        4: {
            id: 4,
            input: <InputNote />,
        },
        5: {
            id: 5,
            input: <InputDate label="Pick up date" type="pick-up-date" />,
        },
        6: {
            id: 6,
            input: <InputDate label="Received date" type="received-date" />,
        },
        7: {
            id: 7,
            input: <InputTime />,
        },
        8: {
            id: 8,
            input: <InputType type={waterType} />,
        },
        9: {
            id: 9,
            input: <InputQuantity />,
        },
        10: {
            id: 10,
            input: <InputType type={riceType} />,
        },
        11: {
            id: 11,
            input: <InputTime type="received-time" />,
        },
    },
};
