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
            label="Chu kỳ"
            name="cycle"
            rules={[{ required: true, message: 'Chu kỳ không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <Select placeholder="Chọn chu kì" onChange={handleCycleChange}>
                <Select.Option value={CycleEnum.ONLY_ONE_TIME}>Only one time</Select.Option>
                <Select.Option value={CycleEnum.EVERY_WEEK}>Every week</Select.Option>
                <Select.Option value={CycleEnum.EVERY_MONTH}>Every month</Select.Option>
            </Select>
        </Styled.ServiceForm.Item>
    );
};

export default InputCycle;
