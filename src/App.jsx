import './App.css'
import './output.css'
import Navbar from './components/Navbar'
import SearchInput from './components/SearchInput'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      <main className='flex-1 overflow-y-auto bg-primary'>
        <SearchInput/>
        <Outlet/>
      </main>
    </>
  )
}

export default App
