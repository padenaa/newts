import Map from "../components/Map"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState, BaseSyntheticEvent } from 'react'
import { postData } from "../helper"

interface MarkerInfo {
    id: number,
    coord: number[],
    rating: number,
    name: string,
    langs: string[]
}

function MapPage () {
    const [searchQuery, setSearch] = useState("")
    const [mapProps, setMapProps] = useState([])
    const navigate = useNavigate()
    let id = localStorage.getItem('id')
    useEffect(() => {
        if (!id) {
            navigate('/', { replace: true })
        }
    })

    function onSearch(e: BaseSyntheticEvent) {
        setSearch(e.target.value)
    }

    // western={[43.00976209681672, -81.27264537179927]}
    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return
        }
        console.log(searchQuery)
        postData("http://127.0.0.1:5000/markers", {
            userId: id,
            search: searchQuery,
            latitude: 43.00976209681672,
            longitude: -81.27264537179927
        }).then((res: any) => {
            console.log(res)
            setMapProps(res.markers)
        });
    }

    return (
        
        <div className="pt-3">
            <div className="input-group flex-nowrap mb-2 mt-5">
                <span className="input-group-text" id="addon-wrapping">🔍</span>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="addon-wrapping" onChange={onSearch} onKeyDown={(e) => {onSubmit(e)}}/>
            </div>
            <Map markers={mapProps} setMarkers={setMapProps}/>
        </div>
    )
}
export default MapPage;
