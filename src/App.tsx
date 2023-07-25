import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './Pages/Home/HomePage'
import { LoginPage } from './Pages/Login/LoginPage'
import { PAGES } from './utils/const';
import { Header } from './Components/Header';

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* Rutas principales */}
        <Routes>
          
          <Route path={PAGES.HOME} element={ <MainPage /> }/>
          <Route path={PAGES.LOGIN} element={ <LoginPage /> }/>
          <Route path='*' element={ <h1>Not found</h1> }/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
