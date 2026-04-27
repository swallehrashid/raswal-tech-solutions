import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />  {/* This is where each page renders */}
      </main>
      <Footer />
    </>
  )
}

export default Layout