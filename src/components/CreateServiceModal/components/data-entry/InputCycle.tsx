import { useAppDispatch } from '@/hooks';
import {  Select } from 'antd';
import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { CycleEnum } from '@/utils/enums';

const InputCycle = () => {
    const dispatch = useAppDispatch();

    const handleCycleChange = (value: string) => {
        dispatch(scheduleSlice.actions.setCycle(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'cycle', value: value }));
    };

    return (
        <Styled.ServiceForm.Item
            label="Cycle"
            name="cycle"
            rules={[{ required: true, message: 'Cycle cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <Select placeholder="Choose cycle" onChange={handleCycleChange}>
                <Select.Option value={CycleEnum.ONLY_ONE_TIME}>Only one time</Select.Option>
                <Select.Option value={CycleEnum.EVERY_WEEK}>Every week</Select.Option>
                <Select.Option value={CycleEnum.EVERY_MONTH}>Every month</Select.Option>
            </Select>
        </Styled.ServiceForm.Item>
    );
};

export default InputCycle;
