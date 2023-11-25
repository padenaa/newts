import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function Map() {
    return (
    <MapContainer center={[43.00976209681672, -81.27264537179927]} zoom={13} scrollWheelZoom={false} style={{height: "600px", width: "1000px"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[43.00976209681672, -81.27264537179927]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
    )
}

export default Map;