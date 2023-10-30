import { useAppDispatch, useAppSelector } from '@/hooks';
import { Select } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { CycleEnum } from '@/utils/enums';
import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';

const InputUsage = () => {
    const dispatch = useAppDispatch();
    const usages = useAppSelector((state) => state.schedules.userUsage);
    console.log(usage);
    const handleCycleChange = (value: string) => {
        dispatch(scheduleSlice.actions.setCycle(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'cycle', value: value }));
    };

    return (
        <Styled.ServiceForm.Item
            label="Gói dịch vụ"
            name="cycle"
            rules={[{ required: true, message: 'Cycle cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <Select placeholder="Choose cycle" onChange={handleCycleChange}>
                {usages?.map((usage) => (
                    <Select.Option value={usage.userUsageId}>{usage.}</Select.Option>
                ))}
            </Select>
        </Styled.ServiceForm.Item>
    );
};

export default InputUsage;
