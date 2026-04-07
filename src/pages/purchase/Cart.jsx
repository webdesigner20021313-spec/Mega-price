import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserMenu from '../../components/UserMenu'
import './Cart.css'

const pharmaciesInit = [
  { id: 1, name: 'MY PHARMACY',    addr: 'Алматы, ул. Абая 42' },
  { id: 2, name: 'MY PHARMACY #2', addr: 'Астана, пр. Республики 15' },
  { id: 3, name: 'MY PHARMACY #3', addr: 'Шымкент, ул. Байтурсынова 7' },
]

const cartItemsInit = [
  { id: 1, pharmId: 1, name: 'Виброцил кап. назал. фл.-капельн. 15 мл №1',    mfr: 'GSK Consumer Healthcare', supplier: 'PARADISE PHARM',       city: 'Самарканд', pay: 'Договорная', days: '',        price: 40000,  qty: 50  },
  { id: 2, pharmId: 1, name: 'Вольтарен Эмульгель гель 1% туба 100 г №1',     mfr: 'GSK Consumer Healthcare', supplier: 'PHARMEX',              city: 'Астана',    pay: '30%',        days: '7 дней',  price: 29500,  qty: 200 },
  { id: 3, pharmId: 1, name: 'Солпадеин Актив табл. шип. 500 мг + 65 мг',     mfr: 'GlaxoSmithKline',         supplier: 'PHARMEX',              city: 'Астана',    pay: '50%',        days: '14 дней', price: 8500,   qty: 100 },
  { id: 4, pharmId: 1, name: 'Нурофен для детей суспензия апельсин 200 мл',    mfr: 'Reckitt Benckiser',       supplier: 'DRUG-PROMOTION',       city: 'Ташкент',   pay: '100%',       days: '',        price: 12000,  qty: 80  },
  { id: 5, pharmId: 2, name: 'Терафлю при гриппе и простуде со вкусом лимона', mfr: 'Delpharm Orleans',        supplier: 'TURON PHARM INDUSTRY', city: 'Фергана',   pay: '50%',        days: '7 дней',  price: 22000,  qty: 120 },
  { id: 6, pharmId: 2, name: 'Синекод сироп фл. 200 мл №1',                   mfr: 'GSK Consumer Healthcare', supplier: 'PARADISE PHARM',       city: 'Самарканд', pay: 'Договорная', days: '',        price: 12500,  qty: 60  },
  { id: 7, pharmId: 2, name: 'Фенистил гель 0,1% туба 30 г №1',               mfr: 'GSK Consumer Healthcare', supplier: 'PARADISE PHARM',       city: 'Самарканд', pay: 'Договорная', days: '',        price: 15500,  qty: 40  },
]

// 1. Цены в узбекских сумах
function fmt(n) {
  return n.toLocaleString('ru-RU') + ' сўм'
}

export default function Cart() {
  const nav = useNavigate()
  const [cartItems, setCartItems] = useState(cartItemsInit)
  const [activePharmId, setActivePharmId] = useState(1)
  // 3. Модальное окно успеха
  const [showSuccess, setShowSuccess] = useState(false)

  function pharmItems(id) { return cartItems.filter(i => i.pharmId === id) }
  function pharmTotal(id) { return pharmItems(id).reduce((s, i) => s + i.price * i.qty, 0) }

  function selectPharm(id) { setActivePharmId(id) }

  function chQty(itemId, delta) {
    setCartItems(items => items.map(i => i.id === itemId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  function setQty(itemId, val) {
    setCartItems(items => items.map(i => i.id === itemId ? { ...i, qty: Math.max(1, parseInt(val) || 1) } : i))
  }

  function removeItem(itemId) {
    setCartItems(items => items.filter(i => i.id !== itemId))
  }

  function clearPharm() {
    const items = pharmItems(activePharmId)
    if (!items.length) return
    if (window.confirm('Очистить все товары для этой аптеки?')) {
      setCartItems(items => items.filter(i => i.pharmId !== activePharmId))
    }
  }

  function submitAll() {
    if (!cartItems.length) { alert('Корзина пуста'); return }
    setShowSuccess(true)
  }

  const activePharm = pharmaciesInit.find(p => p.id === activePharmId)
  const activeItems = pharmItems(activePharmId)

  const groups = {}
  const groupOrder = []
  activeItems.forEach(item => {
    if (!groups[item.supplier]) {
      groups[item.supplier] = { city: item.city, items: [] }
      groupOrder.push(item.supplier)
    }
    groups[item.supplier].items.push(item)
  })

  const totalPositions = cartItems.length
  const grandTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const activePharms = pharmaciesInit.filter(p => pharmItems(p.id).length > 0)
  const totalDists = new Set(cartItems.map(i => i.supplier)).size
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="app">
      <Sidebar active="purchase" />
      <div className="main-area">

        {/* HEADER */}
        <header className="header">
          {/* 2. Правильный стиль кнопки назад */}
          <button className="btn-back" onClick={() => nav('/purchase')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            К закупке
          </button>
          <div className="header-title">Корзина</div>
          <span className="header-badge">{totalPositions} позиц.</span>
          <div className="header-right">
            <button className="hdr-btn" title="Уведомления">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            {/* 4. UserMenu как в закупке */}
            <UserMenu initials="АФ" name="Алишер Фозилов" role="Менеджер закупок" />
          </div>
        </header>

        <div className="cart-body">

          {/* LEFT: pharmacy list */}
          <div className="pharm-panel">
            <div className="pharm-panel-head">
              <span className="pharm-panel-label">Аптеки</span>
            </div>
            <div className="pharm-list">
              {pharmaciesInit.map(p => {
                const items = pharmItems(p.id)
                const total = pharmTotal(p.id)
                const isActive = p.id === activePharmId
                return (
                  <div key={p.id} className={`pharm-item${isActive ? ' active' : ''}`} onClick={() => selectPharm(p.id)}>
                    <div className="pharm-item-name">{p.name}</div>
                    <div className="pharm-item-addr">{p.addr}</div>
                    {items.length > 0 ? (
                      <div className="pharm-item-stats">
                        <span className="pharm-item-count">{items.length} позиц.</span>
                        <span className="pharm-item-total">{fmt(total)}</span>
                      </div>
                    ) : (
                      <div className="pharm-item-empty">Нет товаров</div>
                    )}
                  </div>
                )
              })}
            </div>
            {/* 5. Кнопка "Добавить товары" убрана */}
          </div>

          {/* CENTER: items */}
          <div className="cart-main">
            <div className="cart-main-head">
              <div>
                <div className="cart-main-pharm">{activePharm ? activePharm.name : '—'}</div>
                <div className="cart-main-addr">{activePharm ? activePharm.addr : ''}</div>
              </div>
              <div className="cart-main-sep" />
              <div className="cart-main-meta">
                {activeItems.length > 0 ? `${activeItems.length} позиц. · ${fmt(pharmTotal(activePharmId))}` : 'Нет товаров'}
              </div>
              <div className="cart-main-actions">
                <button className="btn-sm-outline" onClick={clearPharm}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                  </svg>
                  Очистить аптеку
                </button>
              </div>
            </div>

            <div className="cart-scroll">
              {activeItems.length === 0 ? (
                <div className="pharm-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <div className="pharm-empty-title">Для этой аптеки нет товаров</div>
                  <div className="pharm-empty-desc">Вернитесь к закупке и выберите нужные товары</div>
                  <button className="btn-add-items" onClick={() => nav('/purchase')}>К закупке</button>
                </div>
              ) : (
                groupOrder.map(suppName => {
                  const g = groups[suppName]
                  const subtotal = g.items.reduce((s, i) => s + i.price * i.qty, 0)
                  const totalQtyGroup = g.items.reduce((s, i) => s + i.qty, 0)
                  return (
                    <div key={suppName} className="dist-group">
                      <div className="dist-header">
                        <div className="dist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="3" width="15" height="13"/>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                            <circle cx="5.5" cy="18.5" r="2.5"/>
                            <circle cx="18.5" cy="18.5" r="2.5"/>
                          </svg>
                        </div>
                        <div>
                          <div className="dist-name">{suppName}</div>
                          <div className="dist-city">{g.city}</div>
                        </div>
                        <span className="dist-count">{g.items.length} поз. · {totalQtyGroup} уп.</span>
                        <span className="dist-subtotal">{fmt(subtotal)}</span>
                        <button className="dist-send-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                          Отправить
                        </button>
                      </div>
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th style={{ width: '28px' }}>#</th>
                            <th>ТОВАР</th>
                            <th>ОПЛАТА</th>
                            <th>ЦЕНА С НДС</th>
                            <th>КОЛ-ВО</th>
                            <th>ИТОГО</th>
                            <th style={{ width: '36px' }} />
                          </tr>
                        </thead>
                        <tbody>
                          {g.items.map((item, idx) => {
                            const rowTotal = item.price * item.qty
                            const payStr = item.pay + (item.days ? ' · ' + item.days : '')
                            return (
                              <tr key={item.id}>
                                <td><span className="row-num">{idx + 1}</span></td>
                                <td>
                                  <div className="item-name">{item.name}</div>
                                  <div className="item-mfr">{item.mfr}</div>
                                </td>
                                <td><span className="pay-badge">{payStr}</span></td>
                                <td><span className="price-cell">{fmt(item.price)}</span></td>
                                <td>
                                  <div className="qty-ctrl">
                                    <button className="qty-btn" onClick={() => chQty(item.id, -1)}>−</button>
                                    <input className="qty-input" type="text" value={item.qty}
                                      onChange={e => setQty(item.id, e.target.value)} />
                                    <button className="qty-btn" onClick={() => chQty(item.id, 1)}>+</button>
                                  </div>
                                </td>
                                <td><span className="total-cell">{fmt(rowTotal)}</span></td>
                                {/* 6. Иконка удаления — корзина */}
                                <td>
                                  <button className="del-btn" onClick={() => removeItem(item.id)} title="Удалить">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"/>
                                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                      <path d="M10 11v6M14 11v6"/>
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* RIGHT: summary */}
          <div className="cart-summary">
            <div className="summary-head">
              <div className="summary-head-title">Итог заказа</div>
            </div>
            <div className="summary-body">
              <div className="s-row"><span className="s-label">Аптек в заказе</span><span className="s-val">{activePharms.length}</span></div>
              <div className="s-row"><span className="s-label">Дистрибьюторов</span><span className="s-val">{totalDists}</span></div>
              <div className="s-row"><span className="s-label">Позиций</span><span className="s-val">{totalPositions}</span></div>
              <div className="s-row"><span className="s-label">Упаковок</span><span className="s-val">{totalQty}</span></div>
              <div className="s-sep" />
              {pharmaciesInit.map(p => {
                const items = pharmItems(p.id)
                if (!items.length) return null
                const total = pharmTotal(p.id)
                const dists = [...new Set(items.map(i => i.supplier))]
                return (
                  <div key={p.id} className="s-pharm-block">
                    <div className="s-pharm-name">{p.name}</div>
                    <div className="s-pharm-detail">{items.length} поз. · {dists.length} дистриб.</div>
                    <div className="s-pharm-amount">{fmt(total)}</div>
                  </div>
                )
              })}
              <div className="s-sep" />
              <div className="s-row"><span className="s-total-label">Итого</span><span className="s-total-val">{fmt(grandTotal)}</span></div>
            </div>
            <div className="summary-footer">
              <button className="btn-submit" onClick={submitAll}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Отправить все заказы
              </button>
              <button className="btn-draft">Сохранить черновик</button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Модальное окно успеха */}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-anim">
              <div className="success-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
            <div className="success-title">Заказы отправлены!</div>
            <div className="success-desc">
              Все заказы успешно отправлены дистрибьюторам.<br />
              Вы можете отслеживать статус в разделе «Заказы».
            </div>
            <div className="success-stats">
              <div className="success-stat">
                <div className="success-stat-val">{totalPositions}</div>
                <div className="success-stat-label">позиций</div>
              </div>
              <div className="success-stat-sep" />
              <div className="success-stat">
                <div className="success-stat-val">{totalDists}</div>
                <div className="success-stat-label">дистрибьюторов</div>
              </div>
              <div className="success-stat-sep" />
              <div className="success-stat">
                <div className="success-stat-val">{fmt(grandTotal)}</div>
                <div className="success-stat-label">общая сумма</div>
              </div>
            </div>
            <div className="success-actions">
              <button className="success-btn-orders" onClick={() => nav('/orders')}>
                Перейти к заказам
              </button>
              <button className="success-btn-close" onClick={() => setShowSuccess(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
