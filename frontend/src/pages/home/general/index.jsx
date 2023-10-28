import Post from "../../../components/post";
import {posts} from "../../../data/posts";

export default function General() {
    return (
        <div className="px-5 py-5">
            
            {posts.map(post => <Post post={post} key={post.id}/>)}
            
        
        </div>
    )
}