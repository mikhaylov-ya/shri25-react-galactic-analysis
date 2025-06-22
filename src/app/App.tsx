import './App.css'
import  Logo from '../shared/assets/logo.svg';
import Menu from '../shared/ui/Menu/Menu';
import type { MenuItem } from '../shared/ui/Menu';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { routes } from './router/routes';

const routeMenuItems: MenuItem[] = [
  { id: 'csv-analytics', label: "CSV Аналитик" },
  { id: 'csv-generator', label: "CSV Генератор" },
  { id: 'history', label: "История" }
];
function App() {
  const TITLE_TEXT = 'межгалактическая аналитика';
  return (
    <>
    <div className='app-wrapper'>
      <BrowserRouter>
      <div className='toolbar'>
        <div className='title-logo-wrapper'>
        <div className='logo-wrapper'>
          <img className='logo' src={Logo} alt="Yandex Summer School Logo" />
        </div>
        <div className='title-wrapper'>
          {TITLE_TEXT}
        </div>
        </div>
          <Menu items={routeMenuItems}/>
      </div>
      <div className='app-body'>
        <Routes>
          {routes.map((r, i) => <Route {...r} key={i} />)}
        </Routes>
      </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
