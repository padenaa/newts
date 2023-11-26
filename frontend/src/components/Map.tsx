import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { BaseSyntheticEvent, useState } from "react";
import './Map.css'
import { getData, postData } from '../helper'

interface MarkerInfo {
    id: number,
    coord: number[],
    rating: number,
    name: string,
    langs: string[]
}

function giveStars(n: number) {
    if (n === 0) {
        return "No ratings yet, be the first one to add one!"
    }
    let res = ""
    for (let i=0; i < n; i++){
        res+="⭐"
    }
    return res
}

const StarRating = (props: {locationId: number, setModalOn: any, setMarkers: any}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const submitRating = (index: number) => {
        setRating(index);
        postData("http://127.0.0.1:5000/rating", {
            userId: localStorage.getItem("id"),
            rating: index,
            locationId: props.locationId,
        }).then((res) => {
            getData(`http://127.0.0.1:5000/avg_rating?locationId=${props.locationId}`).then((res) => {
                props.setMarkers((prevMap: MarkerInfo[]) => {
                    let newMap = [...prevMap];

                    for (const i in newMap) {
                        if (newMap[i].id === props.locationId) {
                            newMap[i] = {
                                id: prevMap[i].id,
                                coord: prevMap[i].coord,
                                rating: res.avg_rating,
                                name: prevMap[i].name,
                                langs: prevMap[i].langs,
                            }
                        }
                    }

                    return newMap;
                });
            })
            props.setModalOn(false);
        });
    }

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              style={{backgroundColor: "transparent", border: "none", outline: "none", cursor: "pointer"}}
              onClick={() => submitRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star" style={{fontSize:"30px"}}>&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };


function Map(props: {markers: MarkerInfo[], setMarkers: any}) {
    const [message, setMessage] = useState("")
    const [phone, setPhone] = useState("")
    const [selectedId, setSelectedId] = useState(-1)
    const [modalOn, setModalOn] = useState(false)
    const [selectedRatingId, setSelectedRatingId] = useState(-1)
    const [ratingModalOn, setRatingModalOn] = useState(false)
    let markerMap = props.markers

    const onSubmitContact = () => {
        postData("http://127.0.0.1:5000/contact", {
                 message: message,
                 locationId: selectedId,
                 userId: localStorage.getItem('id'),
                 phoneNumber: phone
        }).then((res: any) => {
            console.log(res)
            setModalOn(false)
        });
    }

    function onPhone(e: BaseSyntheticEvent){
        setPhone(e.target.value)
    }

    function onMessage(e: BaseSyntheticEvent){
        setMessage(e.target.value)
    }

    function ContactModal(){
        return (
            <div className="modal" id="contactModal" tabIndex={-1} role="dialog" style={{display: "inline-block"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                        <button className="btn btn-light border-0" style={{fontSize:"30px", backgroundColor: "white"}} onClick={() => setModalOn(false)}>
                            <span style={{color:"#AAB29F"}}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control is-lgreen mb-3" id="floatingInput" placeholder="123-456-7890" autoCorrect='on' onClick={onPhone}/>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="I'd like to schedule..." onClick={onMessage}></textarea>
                    </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="button" style={{backgroundColor:"#AAB29F"}} onClick={onSubmitContact}>Send</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    function RatingModal(){
        return (
            <div className="modal" id="contactModal" tabIndex={-1} role="dialog" style={{display: "inline-block"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add a Rating</h5>
                        <button className="btn btn-light border-0" style={{fontSize:"30px", backgroundColor: "white"}} onClick={() => setRatingModalOn(false)}>
                            <span style={{color:"#AAB29F"}}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group text-start">
                            <h6 className="modal-title mb-3" id="exampleModalLabel">How well does this business accomodate your language?</h6>
                            <StarRating locationId={selectedRatingId} setModalOn={setRatingModalOn} setMarkers={props.setMarkers} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    function onContact(id:number){
        setModalOn(true)
        setSelectedId(id)
    }

    function onRating(id:number){
        setRatingModalOn(true)
        setSelectedRatingId(id)
    }

    return (
        <div>
            {modalOn && <ContactModal />}
            {ratingModalOn && <RatingModal />}
            <MapContainer center={[43.00976209681672, -81.27264537179927]} zoom={13} scrollWheelZoom={false} style={{height: "580px", width: "1000px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                markerMap.map((info: MarkerInfo) => {
                    return (
                    <Marker position={[info.coord[0], info.coord[1]]} key={info.id}>
                        <Popup >
                        <div className="card border-0" style={{width: "18rem"}} >
                            <h5 className="card-title">{info.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{giveStars(info.rating)}</h6>
                            {info.langs.map((lang) => {return (<span className="badge bg-secondary" style={{width:"60px"}}>{lang}</span>)})}
                            <div className='mt-3'>
                                <button className="button me-2" type="button" style={{width: "40%", backgroundColor: "#AAB29F"}} onClick={() => {onContact(info.id)}}>Contact</button>
                                <button className="button" style={{width: "40%", backgroundColor: "#AAB29F"}} onClick={() => {onRating(info.id)}}>Add rating</button>
                            </div>
                        </div>
                        </Popup>
                    </Marker>
                    )
                })
            }
            
            </MapContainer>
    
        </div>
    )
}

export default Map;
