import {AnalyticCardProps} from "@/types/dashboard.type.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ICONS} from "@/constants/icons.constants.ts";


const Analytics = ({items}: {items:AnalyticCardProps[]}) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
                const Icon=ICONS[item.name];
                return (<Card className='p-[4px] shadow-none border-none' key={item.name}>
                        <CardHeader className='p-1 text-sm flex flex-row justify-between items-center' >
                            <CardTitle>
                                {item.name}
                            </CardTitle>
                            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                        </CardHeader>
                        <CardContent className='p-1' >
                            {item.count}
                        </CardContent>
                    </Card>)
            })}
        </div>
    )
}
export default Analytics;