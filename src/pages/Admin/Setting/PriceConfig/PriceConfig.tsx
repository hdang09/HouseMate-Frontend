import { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Modal, Spin, notification } from 'antd';
import PriceConfigColumns from './components/PriceConfig.columns';
import { ConfigType } from '../../ManageService/CreateService';
import { getInUsedPeriodConfig, updatePriceConfig } from '@/utils/configAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigForm, PageTitle, ConfigTable } from '../Setting.styled';

interface FormValues {
    min: number;
    max: number;
}

const PriceConfig = () => {
    const [priceConfig, setPriceConfig] = useState<ConfigType[]>([]);
    const [modal, contextHolder] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [configUpdate, setConfigUpdate] = useState<ConfigType>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const getPriceConfig = async () => {
        try {
            const { data }: { data: ConfigType[] } = await getInUsedPeriodConfig();
            data.sort((a, b) => a.configValue - b.configValue);
            setPriceConfig(data);
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getPriceConfig();
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

    const handleUpdate = async (configType: any) => {
        try {
            setIsLoading(true);
            await updatePriceConfig(configType);
            api.success({
                message: 'Thành công',
                description: 'Chỉnh sửa thành công',
            });
            getPriceConfig();
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
        setIsLoading(false);
    };

    const onFinish = (values: FormValues) => {
        const configType = {
            configValue: configUpdate?.configValue || 0,
            configName: configUpdate?.configName || 'MONTH',
            min: values.min,
            max: values.max,
        };
        handleUpdate(configType);
        form.resetFields();
    };
    const onFinishFail = (values: any) => {
        console.log(values);
    };

    return (
        <>
            {contextHolderNotification}
            {contextHolder}
            <Modal
                title={`${configUpdate?.configValue} ${configUpdate?.configName}`}
                open={isModalOpen}
                onOk={confirm}
                width={400}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={confirm}>
                        Chỉnh sửa
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        Quay lại
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
                        <InputNumber min={1} max={2} value={configUpdate?.min ?? 0} />
                    </ConfigForm.Item>

                    <Form.Item
                        label="Tối đa"
                        name="max"
                        rules={[{ required: true, message: 'Tỉ lệ tối đa không được để trống!!' }]}
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <InputNumber min={1} max={2} value={configUpdate?.max || 0} />
                    </Form.Item>
                </ConfigForm>
            </Modal>

            <PageTitle>Tỉ giá chu kì</PageTitle>

            {isLoading ? (
                <Spin />
            ) : (
                <ConfigTable
                    columns={PriceConfigColumns(showModal)}
                    dataSource={priceConfig}
                    pagination={false}
                />
            )}
        </>
    );
};

export default PriceConfig;
