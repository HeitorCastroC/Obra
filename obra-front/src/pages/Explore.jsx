import { useEffect, useState } from 'react'
import { getWorks } from '../api/api'

export default function Explore() {
    const [works, setWorks]     = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    useEffect(() => {
        getWorks()
            .then(r => setWorks(r.data))
            .catch(() => setError('Works couldn`t load'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="page">
            <div className="section-label">explorar obras</div>

            {loading && (
                <p className="empty-dashed">carregando...</p>
            )}

            {error && (
                <p className="empty-dashed">{error}</p>
            )}

            {!loading && !error && works.length === 0 && (
                <div className="empty-box">
                    <p>Nenhuma obra cadastrada ainda.</p>
                    <small>Works will show up here when avaible.</small>
                </div>
            )}

            {!loading && !error && works.length > 0 && (
                <div className="works-grid">
                    {works.map(w => (
                        <div key={w.id} className="work-card">
                            <div className="work-poster">
                                <span className="work-poster-placeholder">&#9635;</span>
                            </div>
                            <p className="work-title">{w.title}</p>
                            <p className="work-meta">{w.workType || 'obra'}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}
