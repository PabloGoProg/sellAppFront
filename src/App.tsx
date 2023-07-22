import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './Pages/MainPage'
import { LoginPage } from './Pages/LoginPage'
import { PAGES } from './const';

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
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
