import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Overview.css'

const orders = [
  { id: '#ORD-4821', pharm: 'Аптека №1 — ул. Амира Темура', supplier: 'PARADISE PHARM', amount: '3 240 000 ₸', date: '07.04.2026', status: 'pending' },
  { id: '#ORD-4820', pharm: 'Аптека №5 — пр. Мустакиллик', supplier: 'DRUG-PROMOTION', amount: '1 870 000 ₸', date: '06.04.2026', status: 'active' },
  { id: '#ORD-4819', pharm: 'Аптека №3 — ул. Навои', supplier: 'TURON PHARM', amount: '980 000 ₸', date: '06.04.2026', status: 'active' },
  { id: '#ORD-4818', pharm: 'Аптека №7 — ул. Шота Руставели', supplier: 'VERONA', amount: '2 150 000 ₸', date: '05.04.2026', status: 'done' },
  { id: '#ORD-4817', pharm: 'Аптека №2 — пр. Бунёдкор', supplier: 'PHARMA COSMOS', amount: '560 000 ₸', date: '05.04.2026', status: 'done' },
  { id: '#ORD-4816', pharm: 'Аптека №9 — ул. Катартол', supplier: 'GRAND PHARM', amount: '1 320 000 ₸', date: '04.04.2026', status: 'issue' },
]

const statusLabel = { pending: 'Ожидает', active: 'В доставке', done: 'Завершён', issue: 'Проблема' }

const pharmacies = [
  { initials: 'А1', name: 'Аптека №1', addr: 'ул. Амира Темура, 112', spend: '18.4M', status: 'done' },
  { initials: 'А2', name: 'Аптека №2', addr: 'пр. Бунёдкор, 54', spend: '11.2M', status: 'done' },
  { initials: 'А3', name: 'Аптека №3', addr: 'ул. Навои, 15', spend: '6.1M', status: 'issue' },
  { initials: 'А5', name: 'Аптека №5', addr: 'пр. Мустакиллик, 88', spend: '14.7M', status: 'active' },
  { initials: 'А7', name: 'Аптека №7', addr: 'ул. Шота Руставели, 3', spend: '9.3M', status: 'done' },
  { initials: 'А9', name: 'Аптека №9', addr: 'ул. Катартол, 22', spend: '5.8M', status: 'pending' },
]

const feed = [
  { dot: 'var(--green-500)', text: '<strong>Заказ #ORD-4818</strong> доставлен в Аптеку №7', time: 'Сегодня, 14:32' },
  { dot: 'var(--blue-500)', text: '<strong>Алишер</strong> создал новый заказ на 3.2M ₸', time: 'Сегодня, 11:18' },
  { dot: 'var(--yellow-500)', text: '<strong>PARADISE PHARM</strong> прислал обновлённый прайс', time: 'Сегодня, 09:45' },
  { dot: 'var(--red-500)', text: 'Проблема с доставкой в <strong>Аптеку №9</strong>', time: 'Вчера, 18:03' },
  { dot: 'var(--green-500)', text: '<strong>Заказ #ORD-4817</strong> доставлен в Аптеку №2', time: 'Вчера, 15:27' },
  { dot: 'var(--blue-500)', text: 'Добавлена <strong>Аптека №12</strong> — ул. Юнусабад', time: '05.04.2026' },
]

const suppliers = [
  { name: 'PARADISE PHARM', city: 'Ташкент', pct: 34 },
  { name: 'DRUG-PROMOTION', city: 'Самарканд', pct: 22 },
  { name: 'TURON PHARM INDUSTRY', city: 'Фергана', pct: 18 },
  { name: 'PHARMA COSMOS', city: 'Ташкент', pct: 14 },
  { name: 'VERONA', city: 'Алматы', pct: 7 },
  { name: 'GRAND PHARM TRADE', city: 'Астана', pct: 5 },
]
const suppColors = ['', 'blue', 'green', '', '', '']

const barData = {
  spend:  { vals: [42, 51, 38, 67, 72, 58, 84], hi: 6 },
  orders: { vals: [12, 21, 15, 19, 24, 18, 18], hi: 6 },
  pharma: { vals: [8,  9,  9, 10, 11, 11, 12], hi: 6 },
  supp:   { vals: [5,  6,  5,  6,  7,  7,  7], hi: 6 },
}

function KpiBar({ id }) {
  const { vals, hi } = barData[id]
  const max = Math.max(...vals)
  return (
    <div className="kpi-bar">
      {vals.map((v, i) => {
        const h = Math.round((v / max) * 100)
        const cls = i === hi ? 'hi' : (i === vals.length - 1 ? 'active' : '')
        return <div key={i} className={`kpi-bar-col ${cls}`} style={{ height: `${h}%` }} />
      })}
    </div>
  )
}

function getDate() {
  const d = new Date()
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  const days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
  return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
}

export default function Overview() {
  const nav = useNavigate()

  return (
    <div className="app">
      <Sidebar active="overview" />
      <div className="main-area">
        <header className="header">
          <div>
            <div className="header-title">Обзор</div>
          </div>
          <div className="header-date">{getDate()}</div>
          <div className="header-right">
            <button className="header-lang">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>RU</span>
            </button>
            <button className="hdr-btn">
              <div className="hdr-dot" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <UserMenu />
          </div>
        </header>

        <div className="content">
          <div className="page-hd">
            <div className="page-hd-left">
              <div className="page-hd-title">Добро пожаловать, Алишер</div>
              <div className="page-hd-sub">Вот что происходит в вашей сети аптек сегодня</div>
            </div>
            <button className="btn-primary" onClick={() => nav('/purchase')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Новая закупка
            </button>
          </div>

          <div className="alerts-row">
            <div className="alert-card warn">
              <div className="alert-icon warn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div className="alert-body">
                <div className="alert-title">3 заказа требуют подтверждения</div>
                <div className="alert-desc">Заказы от PARADISE PHARM ожидают вашего одобрения более 24 часов</div>
                <div className="alert-action" onClick={() => nav('/orders')}>Перейти к заказам →</div>
              </div>
            </div>
            <div className="alert-card info">
              <div className="alert-icon info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="alert-body">
                <div className="alert-title">Новые предложения поставщиков</div>
                <div className="alert-desc">DRUG-PROMOTION обновил прайс-лист. Доступны акционные позиции.</div>
                <div className="alert-action" onClick={() => nav('/purchase')}>Смотреть предложения →</div>
              </div>
            </div>
            <div className="alert-card danger">
              <div className="alert-icon danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="alert-body">
                <div className="alert-title">Остаток по 5 позициям критически низкий</div>
                <div className="alert-desc">Аптека №3 (ул. Навои, 15) — требуется срочная закупка</div>
                <div className="alert-action" onClick={() => nav('/purchase')}>Создать закупку →</div>
              </div>
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-label">Закупки в этом месяце</div>
                <div className="kpi-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
              </div>
              <div className="kpi-value">84.2M</div>
              <KpiBar id="spend" />
              <div className="kpi-footer">
                <span className="kpi-delta up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                  +12.4%
                </span>
                <span className="kpi-delta-label">к прошлому месяцу</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-label">Активных заказов</div>
                <div className="kpi-icon yellow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
              </div>
              <div className="kpi-value">18</div>
              <KpiBar id="orders" />
              <div className="kpi-footer">
                <span className="kpi-delta down">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  −3
                </span>
                <span className="kpi-delta-label">к вчерашнему дню</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-label">Аптек в сети</div>
                <div className="kpi-icon green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
              </div>
              <div className="kpi-value">12</div>
              <KpiBar id="pharma" />
              <div className="kpi-footer">
                <span className="kpi-delta up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                  +1
                </span>
                <span className="kpi-delta-label">новая за месяц</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-label">Поставщиков активных</div>
                <div className="kpi-icon red">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
              </div>
              <div className="kpi-value">7</div>
              <KpiBar id="supp" />
              <div className="kpi-footer">
                <span className="kpi-delta-label">из 12 партнёров</span>
              </div>
            </div>
          </div>

          <div className="qa-grid">
            <button className="qa-btn" onClick={() => nav('/purchase')}>
              <div className="qa-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
              <div className="qa-btn-label">Новая закупка</div>
              <div className="qa-btn-sub">Выбрать товары и поставщиков</div>
            </button>
            <button className="qa-btn" onClick={() => nav('/purchase/cart')}>
              <div className="qa-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div className="qa-btn-label">Корзина</div>
              <div className="qa-btn-sub">Просмотр и отправка заказов</div>
            </button>
            <button className="qa-btn" onClick={() => nav('/orders')}>
              <div className="qa-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div className="qa-btn-label">Заказы</div>
              <div className="qa-btn-sub">Требуют действий: 3</div>
            </button>
            <button className="qa-btn" onClick={() => nav('/reports')}>
              <div className="qa-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div className="qa-btn-label">Отчеты</div>
              <div className="qa-btn-sub">Аналитика за апрель</div>
            </button>
          </div>

          <div className="dash-grid">
            <div className="card">
              <div className="card-head">
                <div className="card-title">Последние заказы</div>
                <span className="card-link" onClick={() => nav('/orders')} style={{ cursor: 'pointer' }}>
                  Все заказы
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>АПТЕКА / ПОСТАВЩИК</th>
                    <th>СТАТУС</th>
                    <th>СУММА</th>
                    <th>ДАТА</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} onClick={() => nav('/orders')} style={{ cursor: 'pointer' }}>
                      <td>
                        <div className="order-pharm">{o.pharm}</div>
                        <div className="order-supplier">{o.id} · {o.supplier}</div>
                      </td>
                      <td><span className={`badge ${o.status}`}>{statusLabel[o.status]}</span></td>
                      <td><div className="order-amount">{o.amount}</div></td>
                      <td><div className="order-date">{o.date}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="card-title">Аптеки сети</div>
                <span className="card-link" onClick={() => nav('/pharmacies')} style={{ cursor: 'pointer' }}>
                  Все
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
              <div className="pharm-list">
                {pharmacies.map(p => (
                  <div key={p.initials} className="pharm-row" onClick={() => nav('/pharmacies')}>
                    <div className="pharm-av">{p.initials}</div>
                    <div className="pharm-info">
                      <div className="pharm-name">{p.name}</div>
                      <div className="pharm-addr">{p.addr}</div>
                    </div>
                    <div className="pharm-stat">
                      <div className="pharm-stat-val">{p.spend} ₸</div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3px' }}>
                        <span className={`badge ${p.status}`}>{statusLabel[p.status]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
            <div className="card">
              <div className="card-head">
                <div className="card-title">Активность</div>
              </div>
              <div className="feed-list">
                {feed.map((f, i) => (
                  <div key={i} className="feed-item">
                    <div className="feed-dot-wrap">
                      <div className="feed-dot" style={{ background: f.dot }} />
                      <div className="feed-line" />
                    </div>
                    <div className="feed-body">
                      <div className="feed-text" dangerouslySetInnerHTML={{ __html: f.text }} />
                      <div className="feed-time">{f.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="card-title">Топ поставщиков по объёму</div>
              </div>
              <div>
                {suppliers.map((s, i) => (
                  <div key={s.name} className="prog-row">
                    <div className="prog-row-top">
                      <div className="prog-name">
                        {s.name} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· {s.city}</span>
                      </div>
                      <div className="prog-val">{s.pct}%</div>
                    </div>
                    <div className="prog-bar">
                      <div className={`prog-fill ${suppColors[i] || ''}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
