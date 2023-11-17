import { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Modal, Spin, notification } from 'antd';
import ServiceConfigColumns from './components/ServiceConfig.columns';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigForm, PageTitle, ConfigTable } from '../Setting.styled';
import { ServiceConfigType } from '../UnitConfig/components/UnitConfig.type';
import { getServiceConfig, updateServiceConfig } from '@/utils/configAPI';
import { Config, ConfigLabel } from '@/utils/enums';
import { ServiceConfigListType } from './components/ServiceConfig.type';

interface FormValues {
    configValue: string;
}

const ServiceConfig = () => {
    const [serviceConfig, setServiceConfig] = useState<ServiceConfigType[]>([]);
    const [modal, contextHolder] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [configUpdate, setConfigUpdate] = useState<ServiceConfigType>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm<FormValues>();

    const showModal = (id: number) => {
        const selectedConfig = serviceConfig.find((config) => config.serviceConfigId === id);

        const initialValue = {
            configValue: selectedConfig?.configValue,
        };
        form.setFieldsValue(initialValue);
        setConfigUpdate(selectedConfig);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getServiceConfigList = async () => {
        try {
            const { data }: { data: ServiceConfigListType } = await getServiceConfig();
            const serviceConfigObj = Object.keys(data).reduce(
                (accumulator: ServiceConfigType[], key) => {
                    if (key !== 'SERVICE_GROUPS' && key !== 'SERVICE_UNITS') {
                        accumulator.push(...data[key as Config]);
                    }
                    return accumulator;
                },
                [],
            );

            setServiceConfig(serviceConfigObj);
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getServiceConfigList();
    }, []);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn đơn vị này không?',
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
            await updateServiceConfig(configUpdate?.serviceConfigId || 0, configType);
            api.success({
                message: 'Thành công',
                description: 'Chỉnh sửa thành công',
            });
            getServiceConfigList();
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
            configType: configUpdate?.configType,
            configValue: values.configValue,
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
                title={`${ConfigLabel[configUpdate?.configType as Config]}`}
                open={isModalOpen}
                onOk={confirm}
                onCancel={handleCancel}
                width={350}
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
                >
                    <Form.Item
                        label="Giá trị"
                        name="configValue"
                        rules={[{ required: true, message: 'Cấu hình không được để trống!!' }]}
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <InputNumber min={0} value={configUpdate?.configValue || 0} />
                    </Form.Item>
                </ConfigForm>
            </Modal>

            <PageTitle>Tỉ giá chu kì</PageTitle>

            {isLoading ? (
                <Spin />
            ) : (
                <ConfigTable
                    columns={ServiceConfigColumns(showModal)}
                    dataSource={serviceConfig}
                    pagination={false}
                />
            )}
        </>
    );
};

export default ServiceConfig;
