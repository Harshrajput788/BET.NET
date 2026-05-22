import BlogCard from '../../components/card/BlogCard'
import { useBlogQuery } from "./useBlogQuery";
import { useBlogs } from "../../hook/Blog";

const Blogs = () => {
    const { query } = useBlogQuery();
    const { data, isLoading } = useBlogs(query);


    return (
        <section className="min-h-screen bg-orange-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-80 bg-white rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.data?.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blogs;