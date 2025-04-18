import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet';
import hospital from './hospital.png';
import "leaflet/dist/leaflet.css";

const hospitalIcon = new Icon({
  iconUrl: hospital,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const hospitals = [
  {
    name: "Monroe Regional Hospital",
    rating: 4.2,
    distance: "1.6 mi",
    price: 1374,
    priceType: "Fixed",
    location: [40.8106, -73.955],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Sharp Memorial",
    rating: 3.9,
    distance: "1.8 mi",
    price: 1976,
    priceType: "Fixed",
    location: [40.813, -73.97],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Riverview Medical Center",
    rating: 4.1,
    distance: "2.3 mi",
    price: 2457,
    priceType: "Negotiated",
    location: [40.817, -73.98],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Bayshore Community Hospital",
    rating: 4.0,
    distance: "2.5 mi",
    price: 3291,
    priceType: "Fixed",
    location: [40.819, -73.99],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  }
];

const HospitalMap = () => {
  return (
    <div className="flex rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto mt-10">
      {/* Sidebar */}
      <div className="w-[30%] bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">32 Results</h2>
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm">
            Lowest Price
          </button>
        </div>

        {hospitals.map((hospital, idx) => (
          <div key={idx} className="mb-4 border-b pb-4">
            <h3 className="text-lg font-semibold">{hospital.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span>⭐ {hospital.rating}</span>
              <span className="mx-2">📍 {hospital.distance}</span>
            </div>
            <p className="text-sm text-gray-500">{hospital.address}</p>
            <div className="flex justify-between items-center mt-1">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${hospital.priceType === "Fixed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                  }`}
              >
                {hospital.priceType} Price
              </span>
              <span className="text-purple-700 font-bold text-lg">${hospital.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="w-[70%] h-full">
        <MapContainer center={[40.81, -73.96]} zoom={13} scrollWheelZoom={false} className="h-full w-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map((h, i) => (
            <Marker key={i} position={h.location} icon={hospitalIcon}>
              <Popup>{h.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default HospitalMap;
