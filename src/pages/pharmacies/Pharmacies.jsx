import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Pharmacies.css'

export default function Pharmacies() {
  return (
    <div className="app">
      <Sidebar active="pharmacies" />
      <div className="main-area">
        <header className="header">
          <div className="header-title">Аптеки</div>
          <div className="header-right"><UserMenu /></div>
        </header>
        <div className="page-empty">
          <p>Раздел в разработке</p>
        </div>
      </div>
    </div>
  )
}
