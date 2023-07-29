import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './Pages/Login/LoginPage'
import { CotizacionesPage } from './Pages/ProcesoCotizacion/CotizacionesPage';
import { PAGES } from './utils/const';
import { Header } from './Components/Header';
import HomePage from './Pages/Home/HomePage';
import { CarritoProvider } from './Hooks/Carritos';

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <CarritoProvider>

          <Header />
          {/* Rutas principales */}
          <Routes>
            
            <Route path={PAGES.HOME} element={ <HomePage /> }/>
            <Route path={PAGES.LOGIN} element={ <LoginPage /> }/>
            <Route path={PAGES.ADD} element={ <CotizacionesPage /> }/>
            <Route path='*' element={ <h1>Not found</h1> }/>

          </Routes>
          
        </CarritoProvider>

      </BrowserRouter>
    </>
  )
}

export default App
