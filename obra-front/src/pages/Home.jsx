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
            
            <div className="section-label">Activities feed page</div>
            <div className="empty-box">
                <p>Nothing here for now :/</p>
                <small>The works will show up here when the Users register it.</small>
            </div>

            {works.length > 0 && (
                <>
                    <div className="divider" />
                    <div className="section-label">Registered works</div>
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