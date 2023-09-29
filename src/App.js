import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

function App() {
  const key = useRef(0);

  const [singers, setSingers] = useState([
    {
      "id": 1,
      "color": "red"
    },
    {
      "id": 2,
      "color": "orange"
    },
    {
      "id": 3,
      "color": "yellow"
    },
    {
      "id": 4,
      "color": "blue"
    }
  ]);

  const [phrase, setPhrase] = useState("");
  const [lyrics, setLyrics] = useState([]);

  const { id } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    setPhrase(e.target.value);
  }

  useEffect(() => {
    setPhrase("");
  }, [id]);

  useEffect(() => {
    if (phrase === "" || !id) return;

    const updatedLyrics = [...lyrics];

    if (updatedLyrics.length > 0) {
      if (updatedLyrics[updatedLyrics.length - 1].singer.id == id) {

        updatedLyrics[updatedLyrics.length - 1].value = phrase;
      } else {
        updatedLyrics.push({
          "singer": singers[id - 1],
          "value": phrase
        });
      }
    } else {
      updatedLyrics.push({
        "singer": singers[id - 1],
        "value": phrase
      });
    }

    setLyrics(updatedLyrics);
  }, [phrase]);

  return (
    <div className="App">
      <div className="selection">
        {singers.map((singer) => (
          <Link key={key.current++} to={`/singers/${singer.id}`}>
            <div
              key={key.current++}
              className={"button " + singer.color}

            >{"Singer " + singer?.id}</div>
          </Link>
        ))}
      </div>
      <div className="form-container">
        <input
          type="text"
          value={phrase}
          className="input-lyrics"
          id="input-lyrics"
          placeholder="Start typing..."
          onChange={handleChange}
        />
      </div>
      <div className="lyrics-container">
        <div className="lyrics">
          {lyrics.map((lyric) => (
            <div className={"phrase " + lyric.singer.color}>{lyric.value}</div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;
