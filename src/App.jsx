import './App.css'
import './output.css'
import Navbar from './components/Navbar'
import SearchInput from './components/SearchInput'
import { Outlet } from 'react-router-dom'
import router from "./main"

function App() {
  const handleSearch = (query, criteria) => {
    router.navigate(`/explore?criteria=${criteria}&query=${query}`);
  }
  return (
    <>
      <Navbar/>
      <main className='flex-1 overflow-y-auto bg-primary px-12 pt-8 max-lg:pb-[40px] max-sm:px-6'>
        <div className='flex max-sm:justify-center'>
          <SearchInput handleSearch={handleSearch}/>
        </div>
        <Outlet/>
      </main>
    </>
  )
}

export default App
