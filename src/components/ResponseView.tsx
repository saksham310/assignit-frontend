import { useGetRetrospectiveFeedbacks } from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import { DataGrid } from "./custom-components/shared/DataGrid";
import { useGetRetrospectiveColumns } from "@/constants/table-columns.constants";

interface ResponseViewProps {
    sprintId: number;
}

const ResponseView = ({ sprintId }: ResponseViewProps) => {
    const { data, isLoading } = useGetRetrospectiveFeedbacks(sprintId);
    const columns = useGetRetrospectiveColumns();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="px-1 max-h-[450px]">
            <div className="bg-white rounded-lg border">
                <DataGrid columns={columns} data={data.responses}/>
            </div>
        </div>
    );
};

export default ResponseView;