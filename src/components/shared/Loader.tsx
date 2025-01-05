import Lottie from 'lottie-react';
import animation from '@/animation.json';
const Loader=()=>{
    return <>
    <div className='flex w-full h-full items-center justify-center bg-blend-overlay'>
        <div className='size-72'><Lottie animationData={animation}/></div>

    </div>
    </>
}
export default Loader;