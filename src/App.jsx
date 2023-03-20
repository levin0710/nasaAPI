import { useState } from 'react'
import './App.css'
import BanBar from './components/BanBar';
import Gallery from './components/Gallery';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setdate] = useState("")
  const [banned, setBanned] = useState([]);
  const [inputs, setInputs] = useState({
    date: "",
    concept_tags: "",
    hd: "",
    thumbs: "",
  });

  const submitForm = () => {
    let yourDate = new Date()
    let defaultValues = {
      date: yourDate.toISOString().split('T')[0],
      concept_tags: "True",
      hd: "True",
      thumbs: "True",
    };
    
      for (const [key, value] of Object.entries(inputs)) {
        if (value == ""){
          inputs[key] = defaultValues[key]
        }
      }
      
      // generate random date
      // set start date to 1995-06-16
      const startDate = new Date('1995-06-16');
      // set end date to today's date
      const endDate = new Date();
      // calculate the number of milliseconds between start and end dates
      const timeRange = endDate.getTime() - startDate.getTime();
      // generate a random number of milliseconds within the time range
      const randomTime = Math.floor(Math.random() * timeRange);
      // create a new date object with the random number of milliseconds added to the start date
      const randomDate = new Date(startDate.getTime() + randomTime);
      inputs['date'] = randomDate.toISOString().split('T')[0]


      makeQuery();  
  }

  const makeQuery = () => {
    let query = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&date=${inputs.date}&concept_tags=${inputs.concept_tags}&hd=${inputs.hd}&thumbs=${inputs.thumbs}`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    
    const response = await fetch(query);
    const json = await response.json();

    if (json.url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json.url);
      setTitle(json.title)
      setdate(inputs.date)
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  
  }

  const reset = () => {
    setInputs({
      date: "",
      concept_tags: "",
      hd: "",
      thumbs: "",
    });
  }

  const banItem = () => {
    if(!banned.includes(date)){
      setBanned(() => [...banned, date]);
    }
    console.log(banned)
  }

  const unbanItem = (dateToRemove) => {
    const arrayWithoutDate = arrayOfLetters.filter(function (d) {
      return d !== dateToRemove;
    });

    setBanned(() => [arrayWithoutDate]);
  }

  return (
    <div>
      <div className="whole-page">
        <h1>NASA Picture Gallery 📸</h1>
        <div>
            <h2> Click on the button for a new image!</h2>
            {currentImage ? (
            <div className='listingContainer'>
              <h4>{title}</h4>
              <button className="to-ban" onClick={banItem}>{date}</button>
              <img
                className="screenshot"
                src={currentImage}
                alt="Screenshot returned"
              />
            </div>
            ) : (
              <div className='listingContainer'></div>
            )}
          </div>
          <br></br>
          <button type="submit" className="button" onClick={submitForm}>
                Take that Pic! 🎞
          </button>
      </div>
      <BanBar banned={banned} unbanItem={unbanItem}></BanBar>
      <Gallery images={prevImages}></Gallery>
    </div>
  )
}

export default App
