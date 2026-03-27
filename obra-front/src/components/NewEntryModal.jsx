import { useEffect, useState } from 'react'
import { getWorks, createWork, createEntry } from '../api/api'

function Stars({ value, onChange }) {
    return (
        <div className="stars-input" role="radiogroup" aria-labelledby="rating-label">
            {[1,2,3,4,5].map(n => (
                <span
                    key={n}
                    role="radio"
                    aria-checked={n === value}
                    aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
                    tabIndex={n === value || (value === 0 && n === 1) ? 0 : -1}
                    className={n <= value ? 'star filled' : 'star'}
                    onClick={() => onChange(n)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(n)}
                >★</span>
            ))}
        </div>
    )
}

export default function NewEntryModal({ userId, onClose, onSaved }) {
    const [works, setWorks]         = useState([])
    const [search, setSearch]       = useState('')
    const [workId, setWorkId]       = useState(null)
    const [rating, setRating]       = useState(0)
    const [consumeDate, setConsumeDate] = useState('')
    const [favorite, setFavorite]   = useState(false)
    const [saving, setSaving]       = useState(false)

    useEffect(() => {
        getWorks().then(r => setWorks(r.data))
    }, [])

    const filtered = search.trim()
        ? works.filter(w => w.title.toLowerCase().includes(search.toLowerCase()))
        : []

    const exactMatch = works.find(
        w => w.title.toLowerCase() === search.trim().toLowerCase()
    )

    async function handleSubmit() {
        if (!search.trim() || rating === 0) return
        setSaving(true)
        try {
            let finalWorkId = workId

            // cria obra se não existir
            if (!exactMatch) {
                const res = await createWork({ title: search.trim() })
                finalWorkId = res.data.id
            } else {
                finalWorkId = exactMatch.id
            }

            await createEntry({
                user: { id: Number(userId) },
                work: { id: finalWorkId },
                rating,
                consumeDate: consumeDate || null,
                favorite,
            })

            onSaved()
            onClose()
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Nova entry</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {/* busca de obra */}
                <label className="modal-label" htmlFor="obra-input">Obra</label>
                <input
                    id="obra-input"
                    className="modal-input"
                    placeholder="Digite o título..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setWorkId(null) }}
                />
                {filtered.length > 0 && (
                    <ul className="works-suggestions">
                        {filtered.map(w => (
                            <li
                                key={w.id}
                                className={workId === w.id ? 'selected' : ''}
                                onClick={() => { setSearch(w.title); setWorkId(w.id) }}
                            >
                                {w.title}
                            </li>
                        ))}
                    </ul>
                )}
                {search.trim() && !exactMatch && (
                    <p className="modal-hint">✦ "{search.trim()}" será criada como nova obra</p>
                )}

                {/* rating */}
                <label id="rating-label" className="modal-label">Rating</label>
                <Stars value={rating} onChange={setRating} />

                {/* data */}
                <label className="modal-label" htmlFor="consume-date">Data de consumo</label>
                <input
                    id="consume-date"
                    className="modal-input"
                    type="date"
                    value={consumeDate}
                    onChange={e => setConsumeDate(e.target.value)}
                />

                {/* favorita */}
                <div className="modal-toggle-row">
                    <label id="favorita-label" className="modal-label">Favorita</label>
                    <div
                        role="switch"
                        aria-checked={favorite}
                        aria-labelledby="favorita-label"
                        tabIndex={0}
                        className={`toggle ${favorite ? 'on' : ''}`}
                        onClick={() => setFavorite(f => !f)}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFavorite(f => !f)}
                    />
                </div>

                <button
                    className="modal-submit"
                    onClick={handleSubmit}
                    disabled={saving || !search.trim() || rating === 0}
                >
                    {saving ? 'salvando...' : 'salvar'}
                </button>
            </div>
        </div>
    )
}