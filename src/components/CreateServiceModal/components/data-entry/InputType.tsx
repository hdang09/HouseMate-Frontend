import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';

function InputType() {
    const dispatch = useAppDispatch();
    const types = useAppSelector((state) => state.schedules.types);
    const handleTypeChange = (value: string) => {
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'typeId', value: value }));
    };

    return (
        <>
            {types?.length != undefined && types?.length > 0 && (
                <Styled.ServiceForm.Item
                    label="Phân loại"
                    name="type"
                    wrapperCol={{ offset: 0, span: 24 }}
                    rules={[{ required: true, message: 'Phân loại không được để trống!!' }]}
                >
                    <Select placeholder="Chọn phân loại" onChange={handleTypeChange}>
                        {types?.map((type, index) => {
                            return (
                                <Select.Option value={type.serviceTypeId} key={index}>
                                    {type.typeName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Styled.ServiceForm.Item>
            )}
        </>
    );
}

export default InputType;
