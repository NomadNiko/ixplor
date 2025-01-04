import "./feed.css";
import Avatar from "../Avatar/Avatar";
import { useState, useEffect } from "react";

const FeedItem = ({ date }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const response = await fetch("https://picsum.photos/600");
                setImageUrl(response.url);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchRandomImage();
    }, []); // Empty dependency array ensures this runs once per component

    return (
        <div>
            <div className="feed_date">
                <Avatar />
                <p>{date}</p>
            </div>
            <div className="feed_img">
                {imageUrl && <img src={imageUrl} alt="feed_image" />}
            </div>
            <div className="feed_content">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                    corporis expedita quae, non exercitationem magnam recusandae commodi
                    sed. Voluptate facilis amet voluptatem, a nesciunt distinctio magni
                    nemo eligendi deleniti nulla provident, officiis quam neque ut hic.
                </p>
            </div>
        </div>
    );
};

const Feed = () => {
    return (
        <div className="feed">
            <FeedItem date="12/30/2024" />
            <FeedItem date="12/31/2024" />
            <FeedItem date="01/01/2025" />
        </div>
    );
};

export default Feed;