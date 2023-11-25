import Map from "../components/Map"


function MapPage () {
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