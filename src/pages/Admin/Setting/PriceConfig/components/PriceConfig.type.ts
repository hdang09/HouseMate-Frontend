export interface ServiceConfigType {
    service_config_id: number;
    configType: string;
    configValue: string;
}

export type PriceConfigMap = {
    PriceConfig: ServiceConfigType[];
};
