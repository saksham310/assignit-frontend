import { useGetRetrospectiveFeedbacks } from "@/hooks/project.hooks.ts";
import Loader from "@/components/custom-components/shared/Loader.tsx";
import {RetrospectivePayload} from "@/types/project.types.ts";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { LayoutTemplate} from "lucide-react";

interface ResponseViewProps {
    sprintId: number;
}

const ResponseView = ({ sprintId }: ResponseViewProps) => {
    const { data, isLoading,isError } = useGetRetrospectiveFeedbacks(sprintId);

    if (isLoading) {
        return <Loader />;
    }
if(!data?.responses || data?.responses.length === 0 || isError) {
    return (
        <Card className="flex flex-col items-center shadow-none border-0 p-20  justify-center w-full h-full ">
            <LayoutTemplate className={'size-20 text-gray-400'}/>
            <CardHeader>
                <CardTitle className="text-center">No Feedbacks Available</CardTitle>
                <CardDescription className="text-center text-gray-700">
                   The feedbacks submitted by the members will be displayed here. Currently no feedbacks have been submitted.
                </CardDescription>
            </CardHeader>
        </Card>

    )
}
    return (
        <div className="flex flex-col space-y-4">
            {data?.responses?.map((res:RetrospectivePayload, index:number) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 shadow-none rounded-md p-3 space-y-6 w-full"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium text-gray-800">Feedback</h2>
                        <span className="text-sm font-medium ml-auto text-gray-500">
                            Submitted on: {res.createdAt || "N/A"}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1">
                            💡 What went well
                        </h3>
                        <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                            {res.wentWell}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">
                            ⚠️ Areas for improvement
                        </h3>
                        <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                            {res.toImprove}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">
                            📌 Action items
                        </h3>
                        <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                            {res.actionItems}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResponseView;
