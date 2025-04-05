interface NoDataDisplayProps {
    title: string;
    subtitle: string;
}
const NoDataDisplay = ({title,subtitle}:NoDataDisplayProps) => {
    return <>
        <div className={'h-full flex items-center justify-center '}>
            <div className={'h-40 w-40 text-center rounded-full border-muted border-8 flex flex-col items-center justify-center gap-3'}>
                <p className={'font-semibold'}>{title}</p>
                <span className={'text-xs text-gray-500 text-wrap'}> {subtitle}</span>
            </div>
        </div>
    </>
}

export default NoDataDisplay;