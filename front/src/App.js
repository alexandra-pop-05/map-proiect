import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import { Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import StarIcon from '@mui/icons-material/Star';
import "./App.css" ;
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
//import * as timeago from 'timeago.js';

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = React.useState(myStorage.getItem('user'));
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [pins, setPins] = React.useState([]);//we dont have any pins => empty array []
  const [newPlace, setNewPlace] = React.useState(null);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  /*
  //for fetching pins from backend
  React.useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get('/pins_routes');
        setPins(res.data);
      }catch(err){
        console.log(err);
      };
    };
    getPins();
  }, []);*/

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    
  }

  const handleAddClick = (e) => {
    const { lng:long, lat } = e.lngLat;
    setNewPlace({
      long,
      lat
    }); 
   // console.log(e)
  };

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  }
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 17,
          latitude: 46,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
      >
       {/* {pins.map((p) => (
          <>
             <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <FmdGoodIcon
                style={{
                  fontSize: FmdGoodIcon,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id)}
              ></FmdGoodIcon>
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                closeOnMove={true}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.description}</p>
                  <label>Rating</label>
                  <div className="stars">
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                  </div>
                  <label>Info</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  {
                    //<span className='date'>{timeago(p.createdAt)}</span>
                  }
                </div>
              </Popup>
            )}
          </>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            closeOnMove={true}
            onClose={() => setNewPlace(null)}
          >
            hello
          </Popup>
        )}
 */}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>Log out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login 
            setShowLogin={setShowLogin} 
            myStorage={myStorage} 
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
};

export default App;
