import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Services from './pages/Services/Services'
import CaseStudies from './pages/CaseStudies/CaseStudies'
import CaseStudyDetail from './pages/CaseStudies/CaseStudyDetail'
import Packages from './pages/Packages/Packages'
import Process from './pages/Process/Process'
import Blog from './pages/Blog/Blog'
import BlogPost from './pages/Blog/BlogPost'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:id" element={<CaseStudyDetail />} />
          <Route path="packages" element={<Packages />} />
          <Route path="process" element={<Process />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App