import {AnalyticCardProps} from "@/types/dashboard.type.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ICONS} from "@/constants/icons.constants.ts";
import {cn} from "@/lib/utils.ts";


const Analytics = ({items,className}: {items:AnalyticCardProps[],className?:string}) => {
    return (
        <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4"}>
            {items.map((item) => {
                const Icon=ICONS[item.name];
                return (<Card className={cn('p-[4px] shadow-none border-0',className)} key={item.name}>
                        <CardHeader className='p-1 text-sm flex flex-row justify-between items-center' >
                            <CardTitle>
                                {item.name}
                            </CardTitle>
                            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                        </CardHeader>
                        <CardContent className='p-1 flex flex-col' >
                            {item.info}
                            {item.subInfo && <span className={'text-gray-500 text-xs'}>{item.subInfo}</span>}
                        </CardContent>
                    </Card>)
            })}
        </div>
    )
}
export default Analytics;