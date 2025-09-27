import { useEffect, useState } from "react"

const Loader = () => {
    const [dots, setDots] = useState(0);
    const baseText = 'Loading';
    useEffect(() => {
        setTimeout(()=> {
            setDots((dots + 1) % 4);
        }, 100);
    })
    const text = baseText + '.'.repeat(dots); 
    return (
        <div className = 'loader'>
            <div className="loader-content">
                {text}
            </div>
        </div>
    )
}
export const OverlayLoader = ({loading, children}) => {
    return (
        <div className={`overlay-loader${loading ? ' loading': ' ready'}`}>
            {loading && <Loader/>}
            {children}
        </div>
    )
}