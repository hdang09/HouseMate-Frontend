import { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Modal } from 'antd';
import PriceConfigColumns from './components/PriceConfig.columns';
import { ConfigMap, ConfigType } from '../../ManageService/CreateService';
import { getInUsedPeriodConfig, updatePriceConfig } from '@/utils/configAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigForm, PageTitle, PriceConfigTable } from '../Setting.styled';

interface FormValues {
    min: number;
    max: number;
}

const PriceConfig = () => {
    const [priceConfig, setPriceConfig] = useState<ConfigType[]>([]);
    const [modal, contextHolder] = Modal.useModal();
    const [configUpdate, setConfigUpdate] = useState<ConfigType>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm<FormValues>();

    const showModal = (id: number) => {
        const selectedConfig = priceConfig.find((config) => config.configId === id);

        const initialValue = {
            min: selectedConfig?.min || 0,
            max: selectedConfig?.max || 0,
        };
        form.setFieldsValue(initialValue);
        setIsModalOpen(true);
        setConfigUpdate(selectedConfig);
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: ConfigType[] } = await getInUsedPeriodConfig();

                const configObject: ConfigMap = {};
                data.forEach((item) => {
                    configObject[item.configValue] = item;
                });
                setPriceConfig(data);
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
            }
        })();
    }, []);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn chỉnh sửa cấu hình này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Cấu hình sau khi được chỉnh sửa sẽ áp dụng cho toàn bộ hệ thống.',
            okText: 'Quay lại',
            onCancel: handleOk,
            cancelText: 'Chỉnh sửa',
        });
    };

    const handleUpdate = async (configType : any) => {
           try {
            await updatePriceConfig(configType);
            
           } catch (error) {
           }
    };

    const onFinish = (values: FormValues) => {
        const configType = {
            configValue: configUpdate?.configValue || 0,
            configName: configUpdate?.configName || "MONTH",
            min: values.min,
            max: values.max,
        };
        handleUpdate(configType);
        console.log(values);
        form.resetFields();
    };
    const onFinishFail = (values: any) => {
        console.log(values);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={`${configUpdate?.configValue} ${configUpdate?.configName}`}
                open={isModalOpen}
                onOk={confirm}
                width={400}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Quay lại
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Tạo
                    </Button>,
                ]}
            >
                <ConfigForm
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFail}
                    wrapperCol={{ span: 24 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    labelCol={{ span: 6 }}
                >
                    <ConfigForm.Item
                        label="Tối thiểu"
                        name="min"
                        rules={[
                            { required: true, message: 'Tỉ lệ tối thiểu không được để trống!!' },
                        ]}
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <InputNumber min={1} max={10} value={configUpdate?.min ?? 0} />
                    </ConfigForm.Item>

                    <Form.Item
                        label="Tối đa"
                        name="max"
                        rules={[{ required: true, message: 'Tỉ lệ tối đa không được để trống!!' }]}
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <InputNumber min={1} max={10} value={configUpdate?.max || 0} />
                    </Form.Item>
                </ConfigForm>
            </Modal>

            <PageTitle>Tỉ giá chu kì</PageTitle>
            <PriceConfigTable
                columns={PriceConfigColumns(showModal)}
                dataSource={priceConfig}
                pagination={false}
            />
        </>
    );
};

export default PriceConfig;
