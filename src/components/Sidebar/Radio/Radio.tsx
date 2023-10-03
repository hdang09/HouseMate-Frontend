import { Radio as AntRadio, Space } from 'antd';
import { RadioProps } from '@/components/Sidebar/Sidebar.type';
import { RatingContent } from './Radio.styled';

const Radio = ({ options, value, handleRadio }: RadioProps) => {
    return (
        <RatingContent>
            <AntRadio.Group onChange={handleRadio} value={value}>
                <Space direction="vertical">
                    {options.map((option) => (
                        <AntRadio key={option.value} value={option.value}>
                            {option.label}
                        </AntRadio>
                    ))}
                </Space>
            </AntRadio.Group>
        </RatingContent>
    );
};

export default Radio;
