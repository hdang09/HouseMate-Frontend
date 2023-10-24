import { TablePaginationConfig } from 'antd';

import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';

export interface TableParams {
    pagination?: TablePaginationConfig;
    search?: string;
    category?: string[];
    status?: string[];
}

export type DataType = {
    content: ServiceDetailType[];
};
