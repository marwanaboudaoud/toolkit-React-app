import Posts from "../components/posts/Posts"
import CreatePostForm from "../components/posts/CreatePost"

const HomePage = () => {
    return (
        <div className="row p-4">
            <div className="col-lg-6 p-4">
                <CreatePostForm />
            </div>
            <div className="col-lg-6 p-4">
                <Posts />
            </div>
        </div>
    )
}

export default HomePage;