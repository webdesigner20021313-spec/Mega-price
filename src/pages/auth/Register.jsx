import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({
    org: '', country: '', region: '', city: '', address: '', inn: '', contact: '', phone: '', terms: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleRegister(e) {
    e.preventDefault()
    const { org, country, region, city, address, inn, phone, terms } = form
    if (!org || !country || !region || !city || !address || !inn || !phone) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }
    if (!terms) {
      alert('Необходимо согласиться с условиями использования')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  return (
    <div className="auth-page">
    <div className="auth-wrap">
      <div className="auth-logo">
        <div className="auth-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <span className="auth-logo-name">MegaPrice</span>
      </div>

      <div className="auth-card">
        {!success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="auth-head">
              <div className="auth-title">Оставить заявку</div>
              <div className="auth-desc">Заполните форму — наш оператор свяжется с вами и подключит аккаунт</div>
            </div>

            <div className="info-banner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              После отправки заявки оператор рассмотрит её и вручную создаст доступ к вашему аккаунту. Обычно это занимает 1 рабочий день.
            </div>

            <form onSubmit={handleRegister} noValidate>
              <div className="fields">
                <div className="field">
                  <div className="field-label">Наименование организации</div>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </span>
                    <input className="input" type="text" placeholder='ТОО "Аптека Плюс"' autoComplete="organization"
                      value={form.org} onChange={e => set('org', e.target.value)} />
                  </div>
                </div>

                <div className="fields-row">
                  <div className="field">
                    <div className="field-label">Страна</div>
                    <select className="select" value={form.country} onChange={e => set('country', e.target.value)}>
                      <option value="">Выберите страну</option>
                      <option>Казахстан</option>
                      <option>Узбекистан</option>
                      <option>Кыргызстан</option>
                      <option>Таджикистан</option>
                      <option>Туркменистан</option>
                      <option>Россия</option>
                    </select>
                  </div>
                  <div className="field">
                    <div className="field-label">Регион</div>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </span>
                      <input className="input" type="text" placeholder="Алматинская область"
                        value={form.region} onChange={e => set('region', e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="fields-row">
                  <div className="field">
                    <div className="field-label">Район / Город</div>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                      </span>
                      <input className="input" type="text" placeholder="Алматы"
                        value={form.city} onChange={e => set('city', e.target.value)} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-label">ИНН</div>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </span>
                      <input className="input" type="text" placeholder="123456789012"
                        value={form.inn} onChange={e => set('inn', e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-label">Адрес</div>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <input className="input" type="text" placeholder="ул. Абая 42, офис 5" autoComplete="street-address"
                      value={form.address} onChange={e => set('address', e.target.value)} />
                  </div>
                </div>

                <div className="fields-row">
                  <div className="field">
                    <div className="field-label">Контактное лицо</div>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input className="input" type="text" placeholder="Алибек Сейткали" autoComplete="name"
                        value={form.contact} onChange={e => set('contact', e.target.value)} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-label">Номер телефона</div>
                    <div className="input-wrap">
                      <span className="input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.97-.97a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </span>
                      <input className="input" type="tel" placeholder="+7 (777) 000-00-00" autoComplete="tel"
                        value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                  </div>
                </div>

                <label className="check-row">
                  <input type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)} />
                  <span>Я согласен с <a href="#">Условиями использования</a> и <a href="#">Политикой конфиденциальности</a></span>
                </label>

                <button className="btn-submit" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span>Отправляем...</span>
                      <div className="spinner" style={{ display: 'block' }} />
                    </>
                  ) : (
                    <span>Отправить заявку</span>
                  )}
                </button>
              </div>
            </form>

            <div className="divider" />
            <div className="auth-footer">
              Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
            </div>
          </div>
        ) : (
          <div className="success-state" style={{ display: 'flex' }}>
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="success-title">Заявка отправлена!</div>
            <div className="success-desc">
              Спасибо! Наш оператор рассмотрит вашу заявку и свяжется с вами по указанному телефону или email в течение 1 рабочего дня.
            </div>
            <Link to="/auth/login" className="btn-reg-back">Вернуться ко входу</Link>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
