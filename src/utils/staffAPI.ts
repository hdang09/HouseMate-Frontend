import { OrderBy, SortBy } from './enums';

export type StaffParams = {
    keyword?: string;
    status?: string;
    sortBy?: SortBy;
    orderBy?: OrderBy;
    page?: number;
    size?: number;
};
