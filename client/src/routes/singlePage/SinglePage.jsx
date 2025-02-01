import Slider from "../../components/slider/Slider"
import "./SinglePage.scss"
import "../../components/slider/Slider"

import DOMPurify from "dompurify"
import Map from "../../components/map/Map"
import {useLoaderData, useNavigate} from "react-router-dom"
import {useContext, useState} from "react"
import {AuthContext} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest"

const SinglePage = () => {
  const post = useLoaderData()
  console.log(post)

  const [saved, setSaved] = useState(post.isSaved)

  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSave = async () => {
    if (!currentUser) navigate("/login")
    setSaved((prev) => !prev)
    try {
      await apiRequest.post("/users/save", {postId: post.id})
    } catch (err) {
      console.log(err)
      setSaved((prev) => !prev)
    }
  }

  return (
    <div className="singlePage">
      {/* Left Side */}
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="address" />
                  <span>{post.address}</span>
                </div>

                <div className="price">$ {post.price}</div>
              </div>

              <div className="user">
                <img
                  src={post.user.avatar || "/noavatar.jpg"}
                  alt="user icon"
                />
                <span>{post.user.username}</span>
              </div>
            </div>

            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="utility icon" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post.postDetail.utilities} responsible</p>
              </div>
            </div>

            <div className="feature">
              <img src="/pet.png" alt="utility icon" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.pet}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="utility icon" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size icon" />
              <span>{post.postDetail.size}</span>
            </div>

            <div className="size">
              <img src="/bed.png" alt="size icon" />
              <span>{post.bedroom} bed</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="size icon" />
              <span>{post.bathroom} bath</span>
            </div>
          </div>

          <p className="title">Near By</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="utility icon" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>

            <div className="feature">
              <img src="/bus.png" alt="utility icon" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>

            <div className="feature">
              <img src="/restaurant.png" alt="utility icon" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>

          <div className="buttons">
            <button>
              <img src="/chat.png" alt="chat icon" />
              Send a message
            </button>

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#999" : "#fff",
              }}
            >
              <img src="/save.png" alt="save icon" />
              {saved ? "Saved Place" : " Save the place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
