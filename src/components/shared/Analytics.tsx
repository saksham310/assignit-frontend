import {AnalyticCardProps} from "@/types/dashboard.type.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";


const Analytics = ({items}: {items:AnalyticCardProps[]}) => {
    return <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
                return (<Card>
                        <CardHeader>
                            <CardTitle>
                                {item.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {item.count}
                        </CardContent>
                    </Card>)
            })}
        </div>
    </>
}
export default Analytics;