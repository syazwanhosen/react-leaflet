import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
    price: 2457,
    priceType: "Fixed",
    location: [40.8106, -73.955],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Sharp Memorial",
    rating: 3.9,
    distance: "2.5 mi",
    price: 1976,
    priceType: "Fixed",
    location: [40.813, -73.97],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Riverview Medical Center",
    rating: 4.1,
    distance: "2.3 mi",
    price: 3291,
    priceType: "Negotiated",
    location: [40.817, -73.98],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  },
  {
    name: "Bayshore Community Hospital",
    rating: 4.0,
    distance: "1.8 mi",
    price: 1374,
    priceType: "Fixed",
    location: [40.819, -73.99],
    address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
  }
];

const accessToken = "zt7wt1ZXSBmlye8q8IQ6HuOv6p4idsbIbLl3Qi2ns2X4ZcbQbarIZpGE6YAkfi6L"

const ResizeHandler = ({ sidebarOpen }) => {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 500); // Smooth transition delay to match CSS

    return () => clearTimeout(timeout);
  }, [sidebarOpen, map]);

  return null;
};

const HospitalMap = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortOption, setSortOption] = useState("lowestPrice");
  const [sortedHospitals, setSortedHospitals] = useState([]);

  useEffect(() => {
    const sorted = [...hospitals].sort((a, b) => {
      if (sortOption === "lowestPrice") {
        return a.price - b.price;
      } else if (sortOption === "shortestDistance") {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      }
      return 0;
    });
    setSortedHospitals(sorted);
  }, [sortOption]);


  return (
    <div className="relative flex rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto mt-10">


      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute z-20 top-4 h-12 w-10 flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${sidebarOpen ? 'left-[calc(31%-16px)]' : 'left-0'
          } rounded-tr-lg rounded-br-lg`}
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>




      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-[30%]" : "w-0"} transition-all duration-500 ease-in-out overflow-hidden bg-white`}>
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">32 Results</h2>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-md text-sm"
            >
              <option value="lowestPrice">Lowest Price</option>
              <option value="shortestDistance">Shortest Distance</option>
            </select>
          </div>


          {sortedHospitals.map((hospital, idx) => (
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
      </div>

      {/* Map */}
      <div className={`${sidebarOpen ? "w-[70%]" : "w-full"} transition-all duration-500 ease-in-out h-full`}>
        <MapContainer
          center={[40.81, -73.96]}
          zoom={13}
          zoomControl={false}
          className="h-full w-full z-0"
        >
          <ResizeHandler sidebarOpen={sidebarOpen} />
          <TileLayer
            url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
            attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sortedHospitals.map((h, i) => (
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
