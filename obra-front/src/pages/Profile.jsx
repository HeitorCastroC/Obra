import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUsers, getEntries, getFavorites } from '../api/api'
import NewEntryModal from '../components/NewEntryModal'

const TABS = ['obras', 'entries', 'reviews', 'favoritas']



function Stars({ n }) {
    return <span className="entry-stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

function WorkPoster() {
    return (
        <div className="work-poster">
            <span className="work-poster-placeholder">&#9635;</span>
        </div>
    )
}

export default function Profile() {
    const { id } = useParams()
    const [user, setUser]         = useState(null)
    const [entries, setEntries]   = useState([])
    const [favorites, setFavorites] = useState([])
    const [tab, setTab]           = useState('obras')
    const [showModal, setShowModal] = useState(false)  // ← mover pra cá

    function reload() {                                 // ← mover pra cá
        getEntries(id).then(r => setEntries(r.data))
        getFavorites(id).then(r => setFavorites(r.data))
    }

    useEffect(() => {
        getUsers().then(r => setUser(r.data.find(u => u.id === Number(id))))
        getEntries(id).then(r => setEntries(r.data))
        getFavorites(id).then(r => setFavorites(r.data))
    }, [id])

    if (!user) return <div className="page">carregando...</div>

    const initials = user.name.slice(0, 2).toUpperCase()

    return (
        <main className="page">
            <div className="profile-header">
                <div className="avatar lg">{initials}</div>
                <div>
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-email">{user.email}</p>
                    <div className="profile-stats">
                        <div><strong>{entries.length}</strong> entries</div>
                        <div><strong>{favorites.length}</strong> favoritas</div>
                        <div>
                            <strong>
                                {entries.length
                                    ? (entries.reduce((s, e) => s + e.rating, 0) / entries.length).toFixed(1)
                                    : '—'}
                            </strong>
                            média
                        </div>
                    </div>
                    <button className="btn-new-entry" onClick={() => setShowModal(true)}>
                        + nova entry
                    </button>
                </div>
            </div>

            <div className="tabs">
                {TABS.map(t => (
                    <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                        {t}
                    </div>
                ))}
            </div>

            {tab === 'obras' && (
                <div className="works-grid">
                    {entries.map(e => (
                        <div key={e.id} className="work-card">
                            <WorkPoster />
                            <p className="work-title">{e.work.title}</p>
                            <p className="work-meta">{e.consumeDate || '—'}</p>
                            <p className="work-rating"><Stars n={e.rating} /></p>
                        </div>
                    ))}
                    {entries.length === 0 && <p className="empty-dashed">nenhuma obra registrada.</p>}
                </div>
            )}

            {tab === 'entries' && (
                <div>
                    {entries.map(e => (
                        <div key={e.id} className="entry-row">
                            <div className="entry-thumb">&#9635;</div>
                            <div className="entry-info">
                                <p className="entry-title">{e.work.title}</p>
                                <p className="entry-dates">
                                    consumida em {e.consumeDate || '—'} · registrada em {e.registerDate?.slice(0,10)}
                                </p>
                            </div>
                            <div className="entry-score">
                                <Stars n={e.rating} />
                                {e.favorite && <p className="entry-fav">favorita</p>}
                            </div>
                        </div>
                    ))}
                    {entries.length === 0 && <p className="empty-dashed">nenhuma entry ainda.</p>}
                </div>
            )}

            {tab === 'reviews' && (
                <p className="empty-dashed">nenhuma review escrita ainda.</p>
            )}

            {tab === 'favoritas' && (
                <div className="works-grid">
                    {favorites.map(e => (
                        <div key={e.id} className="work-card">
                            <WorkPoster />
                            <p className="work-title">{e.work.title}</p>
                            <p className="work-rating"><Stars n={e.rating} /></p>
                        </div>
                    ))}
                    {favorites.length === 0 && <p className="empty-dashed">nenhuma favorita ainda.</p>}
                </div>
            )}
            {showModal && (
                <NewEntryModal
                    userId={id}
                    onClose={() => setShowModal(false)}
                    onSaved={reload}
                />
            )}
        </main>

    )
}