import { Button, Col, Flex, Form, App } from 'antd';
import * as Styled from '@/pages/Admin/Setting/styled';
import PriceConfigForm from './components/form/PriceConfigForm';
import { useEffect, useState } from 'react';
import { ConfigMap, ConfigType, FormType } from '../CreateService/CreateService';
import { getInUsedPeriodConfig, getServiceConfig } from '@/utils/periodConfigAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ServiceConfigForm from './components/form/ServiceConfigForm';
import { useDocumentTitle } from '@/hooks';

interface ServiceConfigType {
    service_config_id: number;
    configType: string;
    configValue: string;
}

export type ServiceConfigMap = {
    SERVICE_UNITS: ServiceConfigType[];
    SERVICE_GROUPS: ServiceConfigType[];
};

const Setting = () => {
    useDocumentTitle('Cài Đặt | HouseMate');

    const [form] = Form.useForm<FormType>();
    const [priceConfig, setPriceConfig] = useState<ConfigMap>({});
    const [serviceConfig, seServiceConfig] = useState<ServiceConfigMap>({
        SERVICE_UNITS: [],
        SERVICE_GROUPS: [],
    });
    const { modal } = App.useApp();
    const confirm = () => {
        modal.confirm({
            maskClosable: true,
            title: 'Bạn có muốn chỉnh sửa cài đặt?',
            icon: <ExclamationCircleOutlined />,
            content: 'Sau khi chỉnh sửa cài đặt thì các giá trị sẽ được áp dụng vào hệ thống.',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: () => {
                form.submit();
            },
        });
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);

        //  try {
        //      const { data } = await createNewService(service);
        //      console.log(data);
        //      await uploadServiceImage(imageList, ImageEnum.SERVICE, data?.service?.serviceId);

        //      api.success({
        //          message: 'Success',
        //          description: 'Tạo thành công',
        //      });
        //      form.resetFields();
        //      dispatch(createServiceSlice.actions.reset());
        //  } catch (error: any) {
        //      api.error({
        //          message: 'Error',
        //          description: error.response ? error.response.data : error.message,
        //      });
        //      console.log(error.response ? error.response.data : error.message);
        //  } finally {
        //      setFileList([]);
        //  }
    };

    const onFinishFailed = async (values: any) => {
        console.log('Failed:', values);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: ConfigType[] } = await getInUsedPeriodConfig();
                const response = await getServiceConfig();

                const configObject: ConfigMap = {};
                data.forEach((item) => {
                    configObject[item.configValue] = item;
                });

                const serviceConfigList: ServiceConfigMap = response.data;
                seServiceConfig(serviceConfigList);
                setPriceConfig(configObject);
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
            }
        })();
    }, []);
    return (
        <Styled.Container>
            <Flex justify="space-between">
                <Col span={11}>
                    <Styled.PageTitle>Tỉ giá chu kì</Styled.PageTitle>
                    <PriceConfigForm
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        priceConfig={priceConfig}
                    />
                </Col>
                <Col span={11}>
                    <Styled.PageTitle>Đơn vị dịch vụ</Styled.PageTitle>

                    <ServiceConfigForm
                        serviceConfig={serviceConfig}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                </Col>
            </Flex>
            <Flex justify="center" style={{ marginTop: '20px' }}>
                <Button type="primary" htmlType="submit" onClick={() => confirm()}>
                    Chỉnh sửa
                </Button>
            </Flex>
        </Styled.Container>
    );
};

export default Setting;
