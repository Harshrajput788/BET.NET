import { Routes as RouterRoutes, Route } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Home from '../Home/Home'
import Footer from '../../components/Footer/Footer'
import Blogs from '../Blog/Blogs'
import About from '../About/About'
import Contact from '../Contract/Contract'
import Blog from '../Blog/Blog'
import Protect from '../../components/Protect/UserProctet'
import UserProfileById from '../profile/Profile'
import AddBlog from '../Blog/AddBlog'

function AppRoutes() {
    return (
        <div>
            <Header />
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Protect><UserProfileById /></Protect>} />
                <Route path="add-blog" element={<Protect><AddBlog /></Protect>} />
                <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 - Not Found</h1>} />
            </RouterRoutes>
            <Footer/>
        </div>
    )
}

export default AppRoutes