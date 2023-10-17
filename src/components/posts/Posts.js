import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { Link } from 'react-router-dom';

const Posts = ({ isHomePage }) => {
    const dispatch = useDispatch();
    const { data: posts, status, error } = useSelector((state) => state.posts);

    const [visiblePosts, setVisiblePosts] = useState(4);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const loadMorePosts = () => setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 4);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (!posts || !posts.data) {
        return <div>No posts available</div>;
    }

    const sortedPosts = posts.data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestPosts = sortedPosts.slice(0, visiblePosts);

    function formatDate(isoDate) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(isoDate).toLocaleDateString("en-US", options);
    }

    return (
        <div className="row">
            {latestPosts.map(({ id, img_url, category, created_at, title, content }) => (
                <div key={id} className="card col-6 p-0 post-card side-cards text-start">
                    <div className="position-relative">
                        <img className="card-img-top" src={`https://frontend-case-api.sbdev.nl/storage/${img_url}`} alt="mask img" />
                        <span className="post-category">{category.name}</span>
                        <span className="post-created-date">{formatDate(created_at)}</span>
                    </div>
                    <div className="card-body overflow-hidden">
                     <h4 className="card-title fw-bold">{title.length > 25 ? title.substring(0, 25) + "..." : title}</h4> 
                        <p className="card-text">{isHomePage ? content.substring(0, 100) + "..." : content}</p>
                        {isHomePage && <Link to={`/blog/${id}`} className="button button-primary">Read More</Link>}
                    </div>
                </div>
            ))}
            {visiblePosts < sortedPosts.length && (
                <div className="col-12 load-more-button text-center">
                    <button className="button button-primary big" onClick={loadMorePosts}>Load More</button>
                </div>
            )}
        </div>
    );
};

export default Posts;
