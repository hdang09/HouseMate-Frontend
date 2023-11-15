import { useAppDispatch, useAppSelector } from '@/hooks';
import { Select } from 'antd';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { CycleEnum, ModalEnum } from '@/utils/enums';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

const InputCycle = ({ variant }: { variant: ModalEnum }) => {
    const dispatch = useAppDispatch();
    const cycle = useAppSelector((state) => state.schedules.cycle);
    const groupType = localStorage.getItem('groupType');
    const handleCycleChange = (value: string) => {
        dispatch(scheduleSlice.actions.setCycle(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'cycle', value: value }));
    };

    const checkCycle = () => {
        switch (cycle) {
            case CycleEnum.ONLY_ONE_TIME:
                return (
                    <>
                        <Select.Option value={CycleEnum.ONLY_ONE_TIME}>Chỉ 1 lần này</Select.Option>
                    </>
                );
            case CycleEnum.EVERY_WEEK:
                return (
                    <>
                        <Select.Option value={CycleEnum.ONLY_ONE_TIME}>Chỉ 1 lần này</Select.Option>
                        <Select.Option value={CycleEnum.EVERY_WEEK}>
                            Lần này và các tuần sau
                        </Select.Option>
                    </>
                );
            case CycleEnum.EVERY_MONTH:
                return (
                    <>
                        <Select.Option value={CycleEnum.ONLY_ONE_TIME}>Chỉ 1 lần này</Select.Option>
                        <Select.Option value={CycleEnum.EVERY_MONTH}>
                            Lần này và các tháng sau
                        </Select.Option>
                    </>
                );
            default:
                break;
        }
    };

    return (
        <Styled.ServiceForm.Item
            label="Chu kỳ"
            name="cycle"
            rules={[{ required: true, message: 'Chu kỳ không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <Select placeholder="Chọn chu kì" onChange={handleCycleChange}>
                {variant === ModalEnum.VIEW ? (
                    checkCycle()
                ) : (
                    <>
                        {groupType === 'RETURN_SERVICE' ? (
                            <>
                                <Select.Option value={CycleEnum.ONLY_ONE_TIME}>
                                    Chỉ 1 lần này
                                </Select.Option>
                            </>
                        ) : (
                            <>
                                <Select.Option value={CycleEnum.ONLY_ONE_TIME}>
                                    Chỉ 1 lần này
                                </Select.Option>
                                <Select.Option value={CycleEnum.EVERY_WEEK}>Mỗi tuần</Select.Option>
                                <Select.Option value={CycleEnum.EVERY_MONTH}>
                                    Mỗi tháng
                                </Select.Option>
                            </>
                        )}
                    </>
                )}
            </Select>
        </Styled.ServiceForm.Item>
    );
};

export default InputCycle;
