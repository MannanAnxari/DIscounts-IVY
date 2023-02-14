import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Spinner } from '../Spinner';
import { VideoItem } from './VideoItem'

export const Video = () => {


    const { setTitle, APP_NAME, URL } = useContext(AppContext);



    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [img, setImg] = useState('');
    const [videoPath, setVideoPath] = useState('');

    useEffect(() => {
        setTitle(`Video${APP_NAME}`);
        fetch(`${URL}api/web/videos`)
            .then((response) => response.json())
            .then((actualData) => { setVideos(actualData.data); setImg(actualData.thumbnail_path); setVideoPath(actualData.video_path); setIsLoading(false) })
        setIsLoading(false)

    }, [])

    return (
        <>
            <div class="container-fluid">
                <div class="row shadow-sm">
                    <div class="col-md-12 py-3">
                        <h1 class="text-uppercase text-black m-0">Video Show</h1>
                    </div>
                </div>
            </div>
            <div className="container sect py-md-5 py-3 text-start">
                <div className="row">
                    {
                        isLoading ? <Spinner /> :
                            videos && videos.map((item) => {

                                return <VideoItem image={`${img}/${item.thumbnail}`} video={`${videoPath}/${item.video}`} item={item} />

                            })

                    }
                </div>
            </div>
        </>
    )
}
