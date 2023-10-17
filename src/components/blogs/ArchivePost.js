import React from "react";

const ArchivePost = ({ post }) => {
    const { img_url, category, created_at, title, content } = post;

    function formatDate(isoDate) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = new Date(isoDate).toLocaleDateString("en-US", options);
        return formattedDate;
    }

    const imageUrl = `https://frontend-case-api.sbdev.nl/storage/${img_url}`;

    return (
        <div className="card p-0 post-card text-start">
            <div className="position-relative">
                <img className="card-img-top" src={imageUrl} alt="post img" />
                <span className="post-category">{category.name}</span>
                <span className="post-created-date">{formatDate(created_at)}</span>
            </div>
            <div className="card-body overflow-hidden">
            <h4 className="card-title fw-bold">{title.length > 25 ? title.substring(0, 25) + "..." : title}</h4> 
                <p className="card-text">{content}</p>
            </div>
        </div>
    );
};

export default ArchivePost;
