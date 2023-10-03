import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

export type BannerTitleType = {
    firstLine: string;
    secondLine: string[];
    thirdLine: string;
};

export type BannerBreadcrumbProps = {
    title: BannerTitleType;
    breadcrumbItems: ItemType[];
    image?: string;
};
