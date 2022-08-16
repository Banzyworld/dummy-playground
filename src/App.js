import React from 'react';
import './App.css';
import Header from './Header';
import {useState} from 'react';

function App() {

// UseState
  const [query, setQuery] = useState('Net Ninja');
  const [list, setList] = useState(null);

//  SearchEvent
  const search = (e) => {
    e.preventDefault();
    searchYouTube(query).then(setList);
  };

  return (
    <div className="App">
    <Header />
    <p>Search for a video</p>
    {/* SearchForm */}
    <form onSubmit={search}>
      <input autoFocus value={query} onChange={e => setQuery(e.target.value)} />
      <button>Search Youtube</button>
    </form>
    {/* Terniary Logic */}
    <b> Results;</b>
    {list &&  (list.length === 0 ? <p>No results</p> : (<ul className="items">
      {list.map(item =>( <li className="item" key={item.id}>
        <div>
          <b><a href={item.link}> {item.title} </a></b>
          <p>{item.description}</p>
        </div>
        <ul className="meta">
          <li>By: <a href={item.author.url}>{item.author.name}</a></li>
          <li>Views: {item.views}</li>
          <li>Duration: {item.duration}</li>
          <li>Uploaded: {item.uploadedAt}</li>
        </ul>
        <img className='pixels' alt={item.title} src={item.thumbnails.url} />
      </li>))}
    </ul>
    )
    )}
      
    </div>
  );
}

export default App;


async function searchYouTube(q) {
  q = encodeURIComponent(q);
  const response = await fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": 'bcf06caf7emsh37eb57e5dc451c0p186592jsnbe5b5b42ce03',
    }
  });
  const body = await response.json();
  console.log(body);
  return body.items.filter(item => item.type === 'video');
}

