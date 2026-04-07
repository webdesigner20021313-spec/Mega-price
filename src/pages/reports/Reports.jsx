import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Reports.css'

export default function Reports() {
  return (
    <div className="app">
      <Sidebar active="reports" />
      <div className="main-area">
        <header className="header">
          <div className="header-title">Отчеты</div>
          <div className="header-right"><UserMenu /></div>
        </header>
        <div className="page-empty">
          <p>Раздел в разработке</p>
        </div>
      </div>
    </div>
  )
}
