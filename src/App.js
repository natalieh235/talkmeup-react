import './App.css';
import {useState} from 'react';
import SearchMatrix from './SearchMatrix'

function App() {

  const [loading, setLoading] = useState(false)
  const [imgs, setImgs] = useState()
  const [vids, setVids] = useState()

  let handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(document.getElementById("search-form")).get('query')

    setLoading(true)

    fetchData(data).then(() => {
      setLoading(false)
    })
  }

  let fetchData = async (query) => {
    const image_uri = 'https://www.googleapis.com/customsearch/v1?'
    const image_params = new URLSearchParams({
      'key': process.env.REACT_APP_SEARCH_KEY,
      'q': query,
      'cx': process.env.REACT_APP_SEARCH_ENGINE,
      'searchType': 'image'
    })

    await fetch(image_uri+image_params.toString(), {
      method: 'GET',
    }).then((result) => result.json()).then(r => setImgs(r.items.slice(0, 7)))

    const vid_uri = 'https://www.googleapis.com/youtube/v3/search?'
    const vid_params = new URLSearchParams({
      'key': process.env.REACT_APP_SEARCH_KEY,
      'part': 'snippet',
      'q': query,
      'type': 'video'
    })

    await fetch(vid_uri+vid_params.toString(), {
      method: 'GET',
    }).then((result) => result.json()).then(r => setVids(r.items.slice(0, 2)))
  }

  return (
    <div id="content">
      <h1>Enter a search term: </h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <input name="query" id="input" type="text" />
        <input type="submit" />
      </form>
      {loading ? <p>Loading...</p> : <></>}
      {!loading && imgs && vids ? <SearchMatrix data={[imgs, vids]}/> : <></>}
    </div>
  );
}

export default App;
