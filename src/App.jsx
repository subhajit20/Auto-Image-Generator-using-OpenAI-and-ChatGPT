import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

function App() {
  const [text, setText] = useState(0);
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  async function GetImage() {
    setLoading(true);
    console.log(number)
    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'image-alpha-001',
          prompt: text,
          n: parseInt(number),
        }),
      }
    );

    if (!response.ok) {
      setLoading(false);
      throw new Error(`Failed to generate image, status: ${response.status}`);
    } else {
      setLoading(false);
      const imageData = await response.json();
      setImages([...imageData.data]);
    }
  }

  return (
    <div className="App container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        OpenAI Image Generator
      </h1>
      <div class="mb-3">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          style={{marginBottom:'1.3rem'}}
        />
        <select  class="form-select" aria-label="Default select example" onChange={(e)=>setNumber(e.target.value)}>
          <option selected>Select Total Number of Image</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        {loading ? (
          ''
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <button type="button" class="btn btn-primary" onClick={GetImage}>
              Generate Image
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : images.length > 0 ? (
          images.map((pic, i) => {
            return (
              <img
                style={{ maxWidth: '30rem', margin: '2rem' }}
                src={pic.url}
                key={i}
                alt="pics"
                loading="lazy"
              />
            );
          })
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
// api key = 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
export default App;
