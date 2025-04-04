const NoDataDisplay = () => {
    return <>
        <div className={'h-full flex items-center justify-center'}>
            <div className={'h-40 w-40 text-center rounded-full border-muted border-8 flex flex-col items-center justify-center'}>
                <p className={'font-semibold'}>No Data</p>
                <span className={'text-xs text-gray-500'}> Add tasks to see stats</span>
            </div>
        </div>
    </>
}

export default NoDataDisplay;