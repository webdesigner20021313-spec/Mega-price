import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!login.trim()) { setError('Введите логин'); return }
    if (!password) { setError('Введите пароль'); return }

    setLoading(true)
    setTimeout(() => {
      if (login.trim() === 'admin' && password === 'admin') {
        nav('/overview')
      } else {
        setLoading(false)
        setError('Неверный логин или пароль')
      }
    }, 800)
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
        <div className="auth-head">
          <div className="auth-title">Войти в аккаунт</div>
          <div className="auth-desc">Введите логин и пароль для входа</div>
        </div>

        {error && (
          <div className="error-msg show">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="field">
              <div className="field-label">Логин</div>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  className={`input${error && !login.trim() ? ' is-error' : ''}`}
                  type="text"
                  placeholder="Введите логин"
                  autoComplete="username"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-row">
                <div className="field-label">Пароль</div>
                <a href="#" className="field-link">Забыли пароль?</a>
              </div>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  className={`input has-eye${error && !password ? ' is-error' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span className="input-eye" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <label className="check-row">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <span>Запомнить меня</span>
            </label>

            <button className="btn-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span>Входим...</span>
                  <div className="spinner" style={{ display: 'block' }} />
                </>
              ) : (
                <span>Войти</span>
              )}
            </button>
          </div>
        </form>

        <div className="auth-div">или</div>

        <div className="auth-footer">
          Нет аккаунта? <Link to="/auth/register">Оставить заявку</Link>
        </div>
      </div>

      <div className="auth-terms">
        Нажимая «Войти», вы соглашаетесь с <a href="#">Условиями использования</a> и <a href="#">Политикой конфиденциальности</a>
      </div>
    </div>
    </div>
  )
}
