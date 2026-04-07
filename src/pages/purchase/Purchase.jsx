import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Purchase.css'

const allProducts = [
  { id: 1,  name: 'Виброцил кап. назал. фл.-капельн. 15 мл №1',                mfr: 'GSK Consumer Healthcare', country: 'Швейцария',      added: true,  starred: false },
  { id: 2,  name: 'Вольтарен Эмульгель гель 1% туба 100 г №1',                 mfr: 'GSK Consumer Healthcare', country: 'Швейцария',      added: true,  starred: true  },
  { id: 3,  name: 'Отривин для детей кап. назал. 0,05% фл.-капельн. 10 мл №1', mfr: 'GSK Consumer Healthcare', country: 'Швейцария',      added: false, starred: false },
  { id: 4,  name: 'Синекод сироп фл. 200 мл №1',                               mfr: 'GSK Consumer Healthcare', country: 'Швейцария',      added: false, starred: false },
  { id: 5,  name: 'Солпадеин Актив табл. шип. 500 мг + 65 мг',                 mfr: 'GlaxoSmithKline',         country: 'Ирландия',       added: true,  starred: false },
  { id: 6,  name: 'Терафлю при гриппе и простуде со вкусом лимона',            mfr: 'Delpharm Orleans',        country: 'Франция',        added: false, starred: false },
  { id: 7,  name: 'Фенистил гель 0,1% туба 30 г №1',                           mfr: 'GSK Consumer Healthcare', country: 'Швейцария',      added: false, starred: true  },
  { id: 8,  name: 'Витрум Ретинорм капс. №90',                                  mfr: 'Walmark',                 country: 'Чехия',          added: false, starred: false },
  { id: 9,  name: 'Ксефомиелин табл. п/о блистер №30',                         mfr: 'Walmark',                 country: 'Чехия',          added: false, starred: false },
  { id: 10, name: 'Синулан Форте табл. №30',                                    mfr: 'Walmark',                 country: 'Чехия',          added: false, starred: false },
  { id: 11, name: 'Лорагексал табл. 10 мг №10',                                mfr: 'Hexal AG',                country: 'Германия',       added: false, starred: false },
  { id: 12, name: 'Нурофен для детей суспензия апельсин 200 мл',               mfr: 'Reckitt Benckiser',       country: 'Великобритания', added: false, starred: false },
]

const suppliersData = {
  1: [
    { n: 'PARADISE PHARM',       city: 'Самарканд', exp: '15.05.2026', pay: 'Договорная', days: '',        price: '40 000', qty: 5000, promo: 'Купи 10 — получи 5 бесплатно' },
    { n: 'DRUG-PROMOTION',       city: 'Ташкент',   exp: '14.05.2026', pay: '100%',       days: '',        price: '42 000', qty: 0,    promo: null },
    { n: 'TURON PHARM INDUSTRY', city: 'Фергана',   exp: '13.05.2026', pay: '50%',        days: '7 дней',  price: '44 000', qty: 0,    promo: null },
    { n: 'PHARMA COSMOS',        city: 'Ташкент',   exp: '12.05.2026', pay: '30%',        days: '7 дней',  price: '46 000', qty: 0,    promo: 'Купи 10 — получи 5 бесплатно' },
    { n: 'VERONA',               city: 'Фергана',   exp: '11.05.2026', pay: '25%',        days: '7 дней',  price: '47 000', qty: 0,    promo: null },
    { n: 'ORIYO - MEHR',         city: 'Самарканд', exp: '10.05.2026', pay: '25%',        days: '30 дней', price: '49 000', qty: 0,    promo: null },
    { n: 'FARM LYUKS INVEST',    city: 'Ташкент',   exp: '09.05.2026', pay: 'Договорная', days: '',        price: '50 000', qty: 0,    promo: null },
    { n: 'GRAND PHARM TRADE',    city: 'Фергана',   exp: '08.05.2026', pay: '50%',        days: '7 дней',  price: '51 000', qty: 0,    promo: 'Купи 10 — получи 5 бесплатно' },
    { n: 'PHARMA COSMOS',        city: 'Ташкент',   exp: '07.05.2026', pay: '30%',        days: '7 дней',  price: '53 000', qty: 0,    promo: null },
  ],
  2: [
    { n: 'MEDSERVICE',           city: 'Алматы',    exp: '20.06.2026', pay: '50%',        days: '14 дней', price: '28 000', qty: 0,    promo: null },
    { n: 'PHARMEX',              city: 'Астана',    exp: '18.06.2026', pay: '30%',        days: '7 дней',  price: '29 500', qty: 200,  promo: 'Купи 5 — получи 1 бесплатно' },
    { n: 'TURON PHARM INDUSTRY', city: 'Фергана',   exp: '15.06.2026', pay: 'Договорная', days: '',        price: '31 000', qty: 0,    promo: null },
  ],
  3: [
    { n: 'PARADISE PHARM',       city: 'Самарканд', exp: '10.08.2026', pay: '50%',        days: '7 дней',  price: '15 500', qty: 0,    promo: null },
    { n: 'GRAND PHARM TRADE',    city: 'Фергана',   exp: '08.08.2026', pay: '30%',        days: '14 дней', price: '16 000', qty: 0,    promo: null },
  ],
  4: [
    { n: 'DRUG-PROMOTION',       city: 'Ташкент',   exp: '25.09.2026', pay: '100%',       days: '',        price: '12 000', qty: 0,    promo: null },
    { n: 'PHARMA COSMOS',        city: 'Ташкент',   exp: '22.09.2026', pay: '30%',        days: '7 дней',  price: '12 500', qty: 0,    promo: null },
    { n: 'VERONA',               city: 'Фергана',   exp: '20.09.2026', pay: '25%',        days: '7 дней',  price: '13 200', qty: 0,    promo: 'Купи 20 — скидка 10%' },
  ],
  5: [
    { n: 'PHARMEX',              city: 'Астана',    exp: '30.07.2026', pay: '50%',        days: '14 дней', price: '8 500',  qty: 0,    promo: null },
    { n: 'MEDSERVICE',           city: 'Алматы',    exp: '28.07.2026', pay: 'Договорная', days: '',        price: '9 000',  qty: 0,    promo: null },
  ],
  6: [
    { n: 'TURON PHARM INDUSTRY', city: 'Фергана',   exp: '15.11.2026', pay: '50%',        days: '7 дней',  price: '22 000', qty: 0,    promo: null },
    { n: 'PARADISE PHARM',       city: 'Самарканд', exp: '12.11.2026', pay: 'Договорная', days: '',        price: '23 500', qty: 0,    promo: null },
  ],
}

const posList = [
  { id: 1, name: 'Виброцил кап. назал. фл.-капельн. 15 мл №1',        qty: '500 уп.', urgent: true  },
  { id: 2, name: 'Вольтарен Эмульгель гель 1% туба 100 г №1',          qty: '120 уп.', urgent: false },
  { id: 3, name: 'Синекод сироп фл. 200 мл №1',                         qty: '80 уп.',  urgent: true  },
  { id: 4, name: 'Нурофен для детей суспензия апельсин 200 мл',          qty: '200 уп.', urgent: false },
  { id: 5, name: 'Терафлю при гриппе со вкусом лимона',                  qty: '150 уп.', urgent: false },
  { id: 6, name: 'Лорагексал табл. 10 мг №10',                          qty: '300 уп.', urgent: true  },
  { id: 7, name: 'Фенистил гель 0,1% туба 30 г №1',                     qty: '60 уп.',  urgent: false },
]

export default function Purchase() {
  const nav = useNavigate()
  const [products, setProducts] = useState(allProducts)
  const [selectedId, setSelectedId] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [filterMfr, setFilterMfr] = useState('')
  const [showFavOnly, setShowFavOnly] = useState(false)
  const [activeTab, setActiveTab] = useState('manual')
  const [supQtys, setSupQtys] = useState({})
  const [filterDist, setFilterDist] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const fileRef = useRef(null)

  const filteredProducts = products.filter(p =>
    (!filterText || p.name.toLowerCase().includes(filterText.toLowerCase())) &&
    (!filterMfr || p.mfr.includes(filterMfr)) &&
    (!showFavOnly || p.starred)
  )

  function toggleStar(e, id) {
    e.stopPropagation()
    setProducts(ps => ps.map(p => p.id === id ? { ...p, starred: !p.starred } : p))
  }

  function selectProduct(id) {
    setSelectedId(id)
  }

  function selectPosItem(id) {
    setSelectedId(id)
  }

  function switchTab(tab) {
    setActiveTab(tab)
    setSelectedId(null)
  }

  function chQty(key, delta) {
    setSupQtys(q => ({ ...q, [key]: Math.max(0, (q[key] || 0) + delta) }))
  }

  function setQtyVal(key, val) {
    setSupQtys(q => ({ ...q, [key]: Math.max(0, parseInt(val) || 0) }))
  }

  const currentSups = selectedId ? (suppliersData[selectedId] || []) : []
  const filteredSups = currentSups.filter(s =>
    (!filterDist || s.n === filterDist) &&
    (!filterCity || s.city === filterCity)
  )

  const selectedProd = selectedId ? products.find(p => p.id === selectedId) : null
  const selectedPos = selectedId ? posList.find(p => p.id === selectedId) : null

  return (
    <div className="app">
      <Sidebar active="purchase" />
      <div className="main-area">
        <header className="header">
          <div className="header-search" onClick={() => document.getElementById('srch').focus()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="srch" className="header-search-input" type="text" placeholder="Поиск по разделам..." autoComplete="off" />
            <span className="header-search-kbd">⌘K</span>
          </div>
          <div className="header-right">
            <button className="header-lang">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>RU</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '.625rem', height: '.625rem' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="hdr-btn" title="Уведомления">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="hdr-dot" />
            </button>
            <UserMenu initials="АД" name="Администратор" role="admin@megaprice.kz" />
          </div>
        </header>

        <div className="cart-bar">
          <select className="pharmacy-sel cart-pharmacy">
            <option>MY PHARMACY — Алматы, ул. Абая 42</option>
            <option>MY PHARMACY #2 — Астана, пр. Республики 15</option>
            <option>MY PHARMACY #3 — Шымкент, ул. Байтурсынова 7</option>
          </select>
          <div className="cart-right">
            <button
              className={`bar-icon-btn${showFavOnly ? ' active' : ''}`}
              title="Избранные"
              onClick={() => setShowFavOnly(v => !v)}
            >
              <svg viewBox="0 0 24 24" fill={showFavOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            <button className="btn-checkout" onClick={() => nav('/purchase/cart')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Корзина
            </button>
          </div>
        </div>

        <div className="purchase-body">
          <div className="col-left">
            <div className="col-left-tabs">
              <div className="load-tabs">
                <button className={`load-tab${activeTab === 'manual' ? ' active' : ''}`} onClick={() => switchTab('manual')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Вручную
                </button>
                <button className={`load-tab${activeTab === 'pos' ? ' active' : ''}`} onClick={() => switchTab('pos')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  POS
                  <span className="tab-badge">7</span>
                </button>
                <button className={`load-tab${activeTab === 'excel' ? ' active' : ''}`} onClick={() => switchTab('excel')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Excel
                </button>
              </div>
            </div>
            <div className="col-left-filters">
              <div className="search-row">
                <div className="search-wrap">
                  <span className="search-ico-abs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </span>
                  <input className="search-input" type="text" placeholder="Поиск по названию..."
                    value={filterText} onChange={e => setFilterText(e.target.value)} />
                </div>
                <select className="filter-sel-sm" value={filterMfr} onChange={e => setFilterMfr(e.target.value)}>
                  <option value="">Производитель</option>
                  <option>GSK Consumer Healthcare</option>
                  <option>GlaxoSmithKline</option>
                  <option>Walmark</option>
                  <option>Delpharm Orleans</option>
                  <option>Reckitt Benckiser</option>
                  <option>Hexal AG</option>
                </select>
              </div>
            </div>

            {activeTab === 'manual' && (
              <div className="tab-pane active">
                <div className="products-scroll">
                  {filteredProducts.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Ничего не найдено</div>
                  ) : filteredProducts.map(p => (
                    <div
                      key={p.id}
                      className={`prod-row${selectedId === p.id ? ' selected' : ''}`}
                      onClick={() => selectProduct(p.id)}
                    >
                      <div className="prod-actions">
                        <button
                          className="prod-act-btn"
                          onClick={e => toggleStar(e, p.id)}
                          title="Избранное"
                          style={{ color: p.starred ? '#F59E0B' : 'var(--text-muted)' }}
                        >
                          <svg viewBox="0 0 24 24" fill={p.starred ? '#F59E0B' : 'none'} stroke={p.starred ? '#F59E0B' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </button>
                      </div>
                      <div className="prod-info">
                        <div className="prod-name">{p.name}</div>
                        <div className="prod-mfr">{p.mfr} ({p.country})</div>
                      </div>
                      {p.added && (
                        <div className="prod-check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pos' && (
              <div className="tab-pane active">
                <div className="pos-scroll">
                  {posList.map((p, i) => (
                    <div key={p.id} className={`pos-row${selectedId === p.id ? ' selected' : ''}`} onClick={() => selectPosItem(p.id)}>
                      <span className="pos-num">{i + 1}</span>
                      <span className="pos-name">{p.name}</span>
                      <span className="pos-qty">{p.qty}</span>
                      {p.urgent && <span className="pos-urgent">Срочно</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'excel' && (
              <div className="tab-pane active">
                <div className="excel-wrap">
                  <div className="excel-drop" onClick={() => fileRef.current && fileRef.current.click()}>
                    <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <div className="excel-drop-title">Загрузить список закупок</div>
                    <div className="excel-drop-desc">Перетащите .xlsx или .xls файл сюда, или нажмите для выбора</div>
                    <button className="btn-upload" onClick={e => { e.stopPropagation(); fileRef.current && fileRef.current.click() }}>Выбрать файл</button>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Поддерживаются: .xlsx, .xls, .csv</div>
                </div>
              </div>
            )}
          </div>

          <div className="col-right">
            {!selectedId ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <div className="empty-title">Выберите товар</div>
                <div className="empty-desc">Нажмите на товар слева, чтобы увидеть предложения поставщиков с актуальными ценами и условиями</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div className="col-right-head">
                  <div className="sel-prod-name">
                    {activeTab === 'pos' && selectedPos ? selectedPos.name : (selectedProd ? selectedProd.name : '')}
                  </div>
                  <div className="sel-prod-mfr">
                    {activeTab === 'pos' && selectedPos
                      ? `Из POS · ${selectedPos.qty}`
                      : (selectedProd ? `${selectedProd.mfr} (${selectedProd.country})` : '')}
                  </div>
                </div>
                <div className="sup-filters">
                  <div className="sup-filter-chips">
                    <select className="filter-chip-select" value={filterDist} onChange={e => setFilterDist(e.target.value)}>
                      <option value="">Дистрибьютор</option>
                      <option>PARADISE PHARM</option>
                      <option>DRUG-PROMOTION</option>
                      <option>TURON PHARM INDUSTRY</option>
                      <option>PHARMA COSMOS</option>
                      <option>VERONA</option>
                      <option>GRAND PHARM TRADE</option>
                    </select>
                    <select className="filter-chip-select" value={filterCity} onChange={e => setFilterCity(e.target.value)}>
                      <option value="">Город</option>
                      <option>Самарканд</option>
                      <option>Ташкент</option>
                      <option>Фергана</option>
                      <option>Алматы</option>
                      <option>Астана</option>
                    </select>
                    {(filterDist || filterCity) && (
                      <button className="filter-clear show" onClick={() => { setFilterDist(''); setFilterCity('') }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '.75rem', height: '.75rem' }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Очистить фильтр
                      </button>
                    )}
                  </div>
                </div>
                <div className="sup-scroll">
                  <table className="sup-table">
                    <thead>
                      <tr>
                        <th>ДИСТРИБЬЮТОР</th>
                        <th className="sort">ГОДЕН ДО <span className="sort-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></span></th>
                        <th>ТИП ОПЛАТЫ</th>
                        <th className="sort">ЦЕНА С НДС <span className="sort-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></span></th>
                        <th>КОЛИЧЕСТВО</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSups.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Нет предложений от поставщиков</td></tr>
                      ) : filteredSups.map((s, i) => {
                        const key = `${selectedId}-${i}`
                        const qty = supQtys[key] || s.qty || 0
                        return (
                          <tr key={i}>
                            <td>
                              <div className="sup-name">{s.n}</div>
                              <div className="sup-city">{s.city}</div>
                              {s.promo && <div className="sup-promo">{s.promo}</div>}
                            </td>
                            <td><div className="expiry">{s.exp}</div></td>
                            <td>
                              <div className="pay-type">{s.pay}</div>
                              {s.days && <div className="pay-days">{s.days}</div>}
                            </td>
                            <td><div className="price">{s.price} ₸</div></td>
                            <td>
                              <div className="qty-ctrl">
                                <button className="qty-btn" onClick={() => chQty(key, -1)}>−</button>
                                <input
                                  className={`qty-input${qty > 0 ? ' has-val' : ''}`}
                                  type="text"
                                  value={qty}
                                  onChange={e => setQtyVal(key, e.target.value)}
                                />
                                <button className="qty-btn" onClick={() => chQty(key, 1)}>+</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
