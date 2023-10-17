import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postSlice';
import ReactPaginate from 'react-paginate';
import ArchivePost from './ArchivePost';

const BlogArchive = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.data);
    const status = useSelector((state) => state.posts.status);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);



    useEffect(() => {
        dispatch(fetchPosts({ page: currentPage }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        setHasPreviousPage(currentPage > 1);
    }, [currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading posts.</div>;
    }

    if (!posts || !posts.data) {
        return <div>No posts available</div>;
    }

    const sortedPosts = posts.data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const renderCustomPreviousLabel = () => {
        if (hasPreviousPage) {
            return <><span className="pagenation-buttons" onClick={() => setCurrentPage(currentPage - 1)}>&larr;</span>
                <span className='d-none d-md-inline'> Vorig pagina</span></>;
        } else {
            return null;
        }
    };

    return (
        <div className='blog-archive'>
            <h1 className='blog-page-title d-none d-md-block'>Blog</h1>
            <div className='row'>
                {sortedPosts.map((post) => (
                    <div key={post.id} className="col-6 col-md-3">
                        <ArchivePost post={post} />
                    </div>
                ))}
            </div>
            <ReactPaginate
                pageCount={posts.last_page}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName="pagination justify-content-center mt-4"
                activeClassName="custom-active"
                forcePage={currentPage - 1}
                previousLabel={renderCustomPreviousLabel()} // Use the custom function for previousLabel
                nextLabel={<><span className='d-none d-md-inline'>Volgende pagina </span><span>&rarr;</span></>}
                pageClassName="custom-page-item"
                pageLinkClassName="custom-page-link"
            />
        </div>
    );
};

export default BlogArchive;
