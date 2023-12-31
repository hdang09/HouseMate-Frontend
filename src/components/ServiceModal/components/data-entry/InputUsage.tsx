import { useAppDispatch, useAppSelector } from '@/hooks';
import { Select } from 'antd';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import dayjs from 'dayjs';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

const InputUsage = () => {
    const dispatch = useAppDispatch();
    const usages = useAppSelector((state) => state.schedules.userUsage);
    const handleUsageChange = (value: string) => {
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'userUsageId', value: value }));
    };
    return (
        <Styled.ServiceForm.Item
            label="D.vụ đã mua"
            name="usage"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ đã mua!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder="Chọn dịch vụ đã mua" onChange={handleUsageChange}>
                {usages?.map((usage) => (
                    <Select.Option
                        value={usage.userUsageId}
                        key={usage.userUsageId}
                        className="usage"
                        optionLabelProp="children"
                    >
                        Lượng còn lại: {usage.remaining}/{usage.total} {usage.service.titleName} (
                        {dayjs(usage.startDate).format('DD/MM/YYYY')} -{' '}
                        {dayjs(usage.endDate).format('DD/MM/YYYY')})
                    </Select.Option>
                ))}
            </Select>
        </Styled.ServiceForm.Item>
    );
};

export default InputUsage;
