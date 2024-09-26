import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdComment, MdShare } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Reels = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledPosts, setShuffledPosts] = useState([]);
    const videoRefs = useRef([]);
    const { posts } = useSelector((store) => store.post);

    const handleScroll = (e) => {
        const newIndex = Math.round(e.target.scrollTop / window.innerHeight);
        setCurrentIndex(newIndex);
    };

    const handleVideoClick = (index) => {
        setCurrentIndex(index);
    };
    useEffect(() => {
        // Shuffle posts when the component mounts
        const shuffled = [...posts].sort(() => Math.random() - 0.5);
        setShuffledPosts(shuffled);
    }, [posts]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            currentVideo.play();
        }

        return () => {
            if (currentVideo) {
                currentVideo.pause();
            }
        };
    }, [currentIndex]);
    // const onlyVideos = shuffledPosts.startsWith("data:video/")
    return (
        <div className="flex justify-center items-center">
            <div className="py-10 lg:ml-64 overflow-hidden h-screen bg-black">
                <div className="flex flex-col h-full overflow-y-scroll snap-y snap-mandatory" onScroll={handleScroll}>
                    {shuffledPosts.map((video, index) => (
                        <div key={index} className="snap-start h-screen flex flex-col items-center justify-center">
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                className="w-full h-full object-cover border-b-2"
                                src={video.image}
                                loop
                                onClick={() => handleVideoClick(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reels;
