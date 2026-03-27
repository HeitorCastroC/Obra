import { useEffect, useState } from 'react'
import { getWorks, createWork, createEntry } from '../api/api'

function Stars({ value, onChange }) {
    return (
        <div className="stars-input">
            {[1,2,3,4,5].map(n => (
                <span
                    key={n}
                    className={n <= value ? 'star filled' : 'star'}
                    onClick={() => onChange(n)}
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
                userId: Number(userId),
                workId: finalWorkId,
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
                <label className="modal-label">Obra</label>
                <input
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
                <label className="modal-label">Rating</label>
                <Stars value={rating} onChange={setRating} />

                {/* data */}
                <label className="modal-label">Data de consumo</label>
                <input
                    className="modal-input"
                    type="date"
                    value={consumeDate}
                    onChange={e => setConsumeDate(e.target.value)}
                />

                {/* favorita */}
                <div className="modal-toggle-row">
                    <label className="modal-label">Favorita</label>
                    <div
                        className={`toggle ${favorite ? 'on' : ''}`}
                        onClick={() => setFavorite(f => !f)}
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