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
};

const InputFields = ({ category }: InputFieldsType) => {
    const fields: FieldItem = {
        category: {
            HOURLY_SERVICE: {
                id: 'HOURLY_SERVICE',
                fieldIds: [1, 2, 8, 3, 4],
            },
            RETURN_SERVICE: {
                id: 'RETURN_SERVICE',
                fieldIds: [5, 7, 6, 10, 8, 3, 4],
            },
            DELIVERY_SERVICE: {
                id: 'DELIVERY_SERVICE',
                fieldIds: [1, 7, 8, 9, 3, 4],
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
                input: <InputType />,
            },
            9: {
                id: 9,
                input: <InputQuantity />,
            },
            10: {
                id: 10,
                input: <InputTime type="received-time" />,
            },
        },
    };

    return fields.category[category]?.fieldIds?.map((item, index) => {
        return <div key={index}>{fields.field[item].input}</div>;
    });
};

export default InputFields;
