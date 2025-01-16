import MobileMenu from "@/components/custom-components/layout/sidebar/MobileMenu.tsx";

const TopBar=({title}:{title:string})=>{
    return <div className={'flex gap-2 items-center justify-between'}>
        <h1 className="font-semibold text-lg">{title}</h1>
        <MobileMenu/>
    </div>
}

export default TopBar;