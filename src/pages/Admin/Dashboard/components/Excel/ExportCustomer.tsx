import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import { AiOutlineDownload } from 'react-icons/ai';
import * as XLSX from 'xlsx';

export const ExportToExcel = ({ apiData, fileName }: { apiData: any; fileName: any }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (apiData: any, fileName: string) => {
        console.log(apiData);
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <Button
            onClick={() => exportToCSV(apiData, fileName)}
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <AiOutlineDownload size={18} style={{ marginRight: '10px' }} /> Tải về
        </Button>
    );
};
