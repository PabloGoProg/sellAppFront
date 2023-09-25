import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAuth } from '../Hooks/Auth'
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../utils/const';

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const { logged } = useAuth();

  return (
    <Fragment>
      {
        logged && (
          <header className="bg-indigo_dye shadow-2xl w-full">

            <nav className="flex justify-between py-1.5 items-center w-[92%] mx-auto text-platinium">
              <h2 className="font-semibold">Nombre Empresa</h2>

              <ul className="flex items-center gap-[2vw]">
                <li className="hover:text-cerulean cursor-pointer transition-all"
                  onClick={() => {navigate(PAGES.HOME)}}>
                  <HomeIcon sx={{ fontSize: 30 }}/>
                </li>
                <li className="hover:text-cerulean cursor-pointer transition-all">
                  <AccountBoxIcon sx={{ fontSize: 30 }}/>
                </li>
                <li className="hover:text-cerulean cursor-pointer transition-all">
                  <SettingsIcon sx={{ fontSize: 30 }}/>
                </li>
              </ul>
            </nav>

          </header>
        )
      }
    </Fragment>
  )

}