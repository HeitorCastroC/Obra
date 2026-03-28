import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorks } from '../api/api'
import CreateUserForm from '../components/CreateUserForm'

export default function Home() {
    const [works, setWorks] = useState([])
    const navigate = useNavigate()

    useEffect(() => { getWorks().then(r => setWorks(r.data)) }, [])

    return (
        <main className="page">
            <CreateUserForm />
            
            <div className="section-label">feed de atividade</div>
            <div className="empty-box">
                <p>Nada por aqui ainda.</p>
                <small>Quando usuários registrarem obras, elas aparecerão aqui.</small>
            </div>

            {works.length > 0 && (
                <>
                    <div className="divider" />
                    <div className="section-label">obras cadastradas</div>
                    <div className="works-grid">
                        {works.map(w => (
                            <div key={w.id} className="work-card" onClick={() => navigate('/profile/1')}>
                                <div className="work-poster">
                                    <span className="work-poster-placeholder">&#9635;</span>
                                </div>
                                <p className="work-title">{w.title}</p>
                                <p className="work-meta">{w.workType || 'obra'}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}