import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'

export function Header(): JSX.Element {

  return (
    <header className="bg-indigo_dye shadow-2xl w-full">

      <nav className="flex justify-between py-1.5 items-center w-[92%] mx-auto text-platinium">
        <h2 className="font-semibold">Nombre Empresa</h2>

        <ul className="flex items-center gap-[2vw]">
          <li className="hover:text-cerulean cursor-pointer transition-all">
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