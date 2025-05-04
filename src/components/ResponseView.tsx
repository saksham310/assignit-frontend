import { useGetRetrospectiveFeedbacks } from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import { DataGrid } from "./custom-components/shared/DataGrid";
import { useGetRetrospectiveColumns } from "@/constants/table-columns.constants";
import { Button } from "./ui/button";
import { FileX } from "lucide-react";
import * as XLSX from 'xlsx';

interface ResponseViewProps {
    sprintId: number;
}

const ResponseView = ({ sprintId }: ResponseViewProps) => {
    const { data, isLoading } = useGetRetrospectiveFeedbacks(sprintId);
    const columns = useGetRetrospectiveColumns();

    if (isLoading) {
        return <Loader />;
    }
    const handleExport = () => {
        if (!data?.responses) return;

        // Prepare data for export
        const exportData = data.responses.map(item => ({
            'What Went Well': item.wentWell,
            'Areas for Improvement': item.toImprove,
            'Action Items': item.actionItems
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Retrospective Feedback');

        // Generate filename with date
        const fileName = `retrospective-feedback-${new Date().toISOString().split('T')[0]}.xlsx`;

        // Save file
        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className="px-1 grid grid-cols-1 gap-4 max-h-[450px]">
            <Button variant={'secondary'} size={'sm'} 
            className='ml-auto flex gap-1 items-center text-muted-foreground hover:bg-secondary'
            onClick={handleExport}
            ><FileX/> Export to excel</Button>
            <div className="bg-white rounded-lg border">
                <DataGrid columns={columns} data={data.responses}/>
            </div>
        </div>
    );
};

export default ResponseView;