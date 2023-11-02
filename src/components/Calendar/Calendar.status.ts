import { Status } from '@/utils/enums';
import { theme } from '@/themes';

// TODO: Change label
const STATUS = [
    { color: theme.colors.done, value: Status.DONE, label: 'HOÀN THÀNH' },
    { color: theme.colors.processing, value: Status.PROCESSING, label: 'ĐANG XỬ LÝ' },
    { color: theme.colors.incoming, value: Status.INCOMING, label: 'SẮP ĐẾN' },
    { color: theme.colors.cancel, value: Status.CANCEL, label: 'ĐÃ HỦY' },
    { color: theme.colors.pending, value: Status.PENDING, label: 'DANG CHỜ' },
];

export default STATUS;
