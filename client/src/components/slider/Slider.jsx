import {useState} from "react"
import "./Slider.scss"

const Slider = ({images}) => {
  const [imageIndex, setImageIndex] = useState(null)

  const changeSlide = (direction) => {
    direction === "right"
      ? imageIndex < images.length - 1
        ? setImageIndex(imageIndex + 1)
        : setImageIndex(images.length - 1)
      : imageIndex > 0
      ? setImageIndex(imageIndex - 1)
      : setImageIndex(0)
  }

  return (
    <div className="slider">
      {imageIndex !== null && (
        // big slider when click to image
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="arrow" />
          </div>

          <div className="imgContainer">
            <img src={images[imageIndex]} alt="slide image" />
          </div>

          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" alt="arrow" className="right" />
          </div>

          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className="bigImage">
        <img
          src={images[0]}
          alt="image post"
          onClick={() => setImageIndex(0)}
        />
      </div>

      <div className="smallImage">
        {images.slice(1).map((img, index) => (
          <img
            src={img}
            alt="Image Post"
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
