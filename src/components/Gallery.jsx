import './Gallery.css'
const Gallery = ({ images, descriptions }) => {

    return (
      <div className="history-bar">
        <div>
          <h2> Your Gallery!</h2>
          <div className="image-container">
          {images && images.length > 0 ? (
              images.map((pic, index) => (
                  <li className="gallery" key={index}>
                    <img
                      className="gallery-screenshot"
                      src={pic}
                      alt="Undefined screenshot from query"
                      width="150"
                      height="100"
                    />
                    <p>{descriptions[index].substring(0, descriptions[index].indexOf(".") + 1)}</p>
                  </li>
                )
                 
              )
          ) : (
              <div>
              <h3>You haven't made a screenshot yet!</h3>
              </div>
          )}
          </div>
        </div>  
      </div>
    );
  };
  
  export default Gallery;