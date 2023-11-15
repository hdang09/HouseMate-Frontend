import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Spin, notification } from 'antd';
import UnitConfigColumns from './components/UnitConfig.columns';
import {
    createServiceConfig,
    deleteServiceConfig,
    getServiceConfigByType,
    updateServiceConfig,
} from '@/utils/configAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigForm, PageTitle, ConfigTable, AddButton } from '../Setting.styled';
import { Config, ModalEnum } from '@/utils/enums';
import { ServiceConfigType } from './components/UnitConfig.type';
import { IoMdAdd } from 'react-icons/io';

interface FormValues {
    configValue: string;
}

const UnitConfig = () => {
    const [unitConfig, setUnitConfig] = useState<ServiceConfigType[]>([]);
    const [modal, contextHolder] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [configUpdate, setConfigUpdate] = useState<ServiceConfigType>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm<FormValues>();
    const [modalType, setModalType] = useState<string>(ModalEnum.CREATE);

    const showModal = (id: number, variant: string) => {
        setModalType(variant);
        if (variant === ModalEnum.VIEW) {
            const selectedConfig = unitConfig.find((config) => config.serviceConfigId === id);

            const initialValue = {
                configValue: selectedConfig?.configValue,
            };
            form.setFieldsValue(initialValue);
            setConfigUpdate(selectedConfig);
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getUnitConfig = async () => {
        try {
            const { data }: { data: ServiceConfigType[] } = await getServiceConfigByType(
                Config.SERVICE_UNITS,
            );
            setUnitConfig(data);
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        } finally {
        }
    };

    useEffect(() => {
        getUnitConfig();
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

    const deleteConfirm = (id: number) => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn đơn vị này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Cấu hình sau khi được chỉnh sửa sẽ áp dụng cho toàn bộ hệ thống.',
            okText: 'Quay lại',
            onCancel: () => handleDelete(id),
            cancelText: 'Xóa',
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
            getUnitConfig();
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
            configType: Config.SERVICE_UNITS,
            configValue: values.configValue,
        };
        if (modalType === ModalEnum.VIEW) {
            handleUpdate(configType);
        } else {
            handleAddUnit(configType);
        }
        form.resetFields();
    };
    const onFinishFail = (values: any) => {
        console.log(values);
    };

    const handleAddUnit = async (configType: any) => {
        try {
            setIsLoading(true);
            await createServiceConfig(configType);
            api.success({
                message: 'Thành công',
                description: 'Chỉnh sửa thành công',
            });
            getUnitConfig();
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        try {
            setIsLoading(true);
            await deleteServiceConfig(id);
            api.success({
                message: 'Thành công',
                description: 'Xóa thành công',
            });
            getUnitConfig();
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            {contextHolderNotification}
            {contextHolder}
            <Modal
                title={configUpdate?.configType || 'Thêm đơn vị'}
                open={isModalOpen}
                onOk={confirm}
                width={400}
                onCancel={handleCancel}
                footer={
                    modalType === ModalEnum.VIEW
                        ? [
                              <Button key="submit" type="primary" onClick={confirm}>
                                  Chỉnh sửa
                              </Button>,
                              <Button key="cancel" onClick={handleCancel}>
                                  Quay lại
                              </Button>,
                          ]
                        : [
                              <Button key="cancel" onClick={handleCancel}>
                                  Quay lại
                              </Button>,
                              <Button key="submit" type="primary" onClick={handleOk}>
                                  Tạo
                              </Button>,
                          ]
                }
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
                        label="Đơn vị"
                        name="configValue"
                        rules={[{ required: true, message: 'Đơn vị không được để trống!!' }]}
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <Input value={configUpdate?.configValue} />
                    </ConfigForm.Item>
                </ConfigForm>
            </Modal>

            <PageTitle>Đơn vị dịch vụ</PageTitle>

            <Row justify={'end'}>
                <AddButton type="primary" onClick={() => showModal(0, ModalEnum.CREATE)}>
                    <IoMdAdd size={18} />
                    Tạo thêm đơn vị
                </AddButton>
            </Row>

            {isLoading ? (
                <Spin />
            ) : (
                <Row justify={'center'} align={'middle'}>
                    <Col span={8}>
                        <ConfigTable
                            columns={UnitConfigColumns(showModal, deleteConfirm)}
                            dataSource={unitConfig}
                            pagination={false}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default UnitConfig;
