import InputDate from './components/data-entry/InputDate';
import InputTimeRange from './components/data-entry/InputTimeRange';
import InputCycle from './components/data-entry/InputCycle';
import InputNote from './components/data-entry/InputNote';
import InputTime from './components/data-entry/InputTime';
import InputType from './components/data-entry/InputType';
import InputQuantity from './components/data-entry/InputQuantity';
import InputDateRange from './components/data-entry/InputDateRange';
import InputUsage from './components/data-entry/InputUsage';
import { ModalEnum } from '@/utils/enums';

interface Field {
    id: number;
    input: JSX.Element;
}

interface Service {
    [key: string]: {
        id: string;
        fieldIds: number[];
    };
}

interface FieldItem {
    category: Service;
    field: {
        [key: number]: Field;
    };
}

type InputFieldsType = {
    category: string;
    variant: ModalEnum;
};

const InputFields = ({ category, variant }: InputFieldsType) => {
    const fields: FieldItem = {
        category: {
            HOURLY_SERVICE: {
                id: 'HOURLY_SERVICE',
                fieldIds: [1, 2, 8, 11, 3, 4],
            },
            RETURN_SERVICE: {
                id: 'RETURN_SERVICE',
                fieldIds: [5, 7, 10, 8, 11, 3, 4],
            },
            DELIVERY_SERVICE: {
                id: 'DELIVERY_SERVICE',
                fieldIds: [1, 7, 8, 9, 11, 3, 4],
            },
        },
        field: {
            1: {
                id: 1,
                input: <InputDate />,
            },
            2: {
                id: 2,
                input: <InputTimeRange />,
            },
            3: {
                id: 3,
                input: <InputCycle variant={variant} />,
            },
            4: {
                id: 4,
                input: <InputNote />,
            },
            5: {
                id: 5,
                input: <InputDateRange />,
            },
            7: {
                id: 7,
                input: <InputTime />,
            },
            8: {
                id: 8,
                input: <InputType />,
            },
            9: {
                id: 9,
                input: <InputQuantity />,
            },
            10: {
                id: 10,
                input: <InputTime type="receivedTime" label="Received Time" />,
            },
            11: {
                id: 11,
                input: <InputUsage />,
            },
        },
    };

    return fields.category[category]?.fieldIds?.map((item, index) => {
        return <div key={index}>{fields.field[item].input}</div>;
    });
};

export default InputFields;
