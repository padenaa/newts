import Map from "../components/Map"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

function MapPage () {
    const navigate = useNavigate()
    let id = localStorage.getItem('id')
    useEffect(() => {
        if (!id) {
            navigate('/', { replace: true })
        }
    })
    
    return (
        
        <div className="pt-3">
            <div className="input-group flex-nowrap mb-2 mt-5">
                <span className="input-group-text" id="addon-wrapping">🔍</span>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="addon-wrapping"/>
            </div>
            <Map />
            
        </div>
    )
}
export default MapPage;