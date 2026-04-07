import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Orders.css'

export default function Orders() {
  return (
    <div className="app">
      <Sidebar active="orders" />
      <div className="main-area">
        <header className="header">
          <div className="header-title">Заказы</div>
          <div className="header-right"><UserMenu /></div>
        </header>
        <div className="orders-empty">
          <p>Раздел в разработке</p>
        </div>
      </div>
    </div>
  )
}
