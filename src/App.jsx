import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
function App() {
  const [text, setText] = useState(0);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  async function GetImage() {
    setLoading(true);
    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'image-alpha-001',
          prompt: text,
          n: 6,
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
        />
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
