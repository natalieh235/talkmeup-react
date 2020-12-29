import './SearchMatrix.css'
import {useState} from 'react'

export default function SearchMatrix(props) {
    let [images, videos] = props.data
    let [data, setData] = useState()
    

    let handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.toggle('selected')
    }

    let handleVidClick = (event) => {
        event.preventDefault();
        let vid = document.getElementById(`${event.target.id}-vid`);
        vid.classList.toggle('selected')
    }

    let handleSelect = () => {
        let selected = document.querySelectorAll('.selected')
        let links = []
        
        for (let i = 0; i < selected.length; i++) {
            links.push(selected[i].getAttribute('data-link'))
        }

        let query = document.getElementById('input').value;
        let result = {}
        result[query] = links;

        setData(result)
    }

    return (
        <div id="content">
            <h1>Select interesting items:</h1>
            <div id="grid">
                {images.map(image => {
                    return (
                        <div className="container">
                            <img className='image clickable' src={image.link} data-link={image.link} onClick={handleClick}/>
                            <div className='img-overlay'>
                                <p className='text'>{image.title}</p>
                            </div>
                        </div>)
                })}
                {videos.map(video => {
                    return (
                        <div className='container'>
                            <iframe className='video' width="420" height="315" id={`${video.id.videoId}-vid`}
                            src={`https://www.youtube.com/embed/${video.id.videoId}`} data-link={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
                            </iframe>
                            <div className='vid-overlay'>
                                <button id={video.id.videoId} className='text' onClick={handleVidClick}>Click to Select</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button onClick={handleSelect}>Submit</button>

            {data ? <p>{JSON.stringify(data)}</p> : <></>}
        </div>
    )

}