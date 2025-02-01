import {MapContainer, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./Map.scss"
import Pin from "../pin/Pin"

const Map = ({items}) => {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [43.6492628, -79.3787741]
      }
      zoom={9}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  )
}

export default Map
