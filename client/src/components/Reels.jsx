import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Reels = () => {
    const [shuffledPosts, setShuffledPosts] = useState([]);
    const videoRefs = useRef([]);
    const { posts } = useSelector((store) => store.post);

    const handleVideoPlay = (index) => {
        const currentVideo = videoRefs.current[index];
        if (currentVideo) {
            currentVideo.play().catch((error) => console.error('Error playing video:', error));
        }
    };

    const handleVideoPause = (index) => {
        const currentVideo = videoRefs.current[index];
        if (currentVideo) {
            currentVideo.pause();
        }
    };

    useEffect(() => {
        // Shuffle posts when the component mounts
        const shuffled = [...posts].sort(() => Math.random() - 0.5);
        setShuffledPosts(shuffled);
    }, [posts]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75, // Play the video when 75% of it is visible
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const index = entry.target.getAttribute('data-index');
                if (entry.isIntersecting) {
                    handleVideoPlay(index);
                } else {
                    handleVideoPause(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        videoRefs.current.forEach((video, index) => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) {
                    observer.unobserve(video);
                }
            });
        };
    }, [shuffledPosts]);

    // Check if shuffledPosts contains any valid video posts
    const hasVideos = shuffledPosts.some((post) => post.image && post.image.endsWith('.mp4'));

    return (
        <div className="flex justify-center items-center">
            <div className="py-10 sm:m-2 overflow-hidden h-screen bg-black">
                {hasVideos ? (
                    <div className="flex flex-col h-full overflow-y-scroll snap-y snap-mandatory">
                        {shuffledPosts.map((video, index) => (
                            video.image && video.image.endsWith('.mp4') && ( // Check if the post is a video
                                <div key={index} className="snap-start h-screen flex flex-col items-center justify-center">
                                    <video
                                        ref={(el) => (videoRefs.current[index] = el)} // Assign ref for each video
                                        data-index={index} // Add a data attribute to identify the index
                                        className="w-full h-full object-cover border-b-2"
                                        src={video.image}
                                        loop
                                        controls // Video controls added
                                        onError={(error) => console.error('Error loading video:', error)}
                                    />
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col h-full overflow-y-scroll snap-y snap-mandatory">
                        {shuffledPosts.map((post, index) => (
                            post.image && !post.image.endsWith('.mp4') && ( // Check if the post is an image
                                <div key={index} className="snap-start h-screen flex flex-col items-center justify-center">
                                    <img
                                        src={post.image}
                                        alt={`Post ${index}`}
                                        className="w-full h-full object-contain border-b-2"
                                        style={{ maxHeight: '100%', maxWidth: '100%' }} // Ensure full image is visible
                                    />
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reels;
