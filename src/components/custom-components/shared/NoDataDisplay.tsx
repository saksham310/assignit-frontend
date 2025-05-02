interface NoDataDisplayProps {
    title: string;
    subtitle: string;
    containerClassName?: string;
}

const NoDataDisplay = ({title, subtitle, containerClassName = 'h-full'}: NoDataDisplayProps) => {
    return <>
        <div className={`flex items-center justify-center ${containerClassName}`}>
            <div className={'h-32 w-32 md:h-40 md:w-40 text-center rounded-full border-muted border-8 flex flex-col items-center justify-center gap-2 md:gap-3'}>
                <p className={'font-semibold text-sm md:text-base'}>{title}</p>
                <span className={'text-xs md:text-sm text-gray-500 px-2'}> {subtitle}</span>
            </div>
        </div>
    </>
}

export default NoDataDisplay;