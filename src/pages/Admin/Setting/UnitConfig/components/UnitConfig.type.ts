import { Config } from '@/utils/enums';

export type ServiceConfigType = {
    serviceConfigId: number;
    configType: Config;
    configValue: string;
};
