import { useState } from 'react'
import { createUser } from '../api/api'

export default function CreateUserForm({ onUserCreated }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!name.trim() || !email.trim()) {
            setError('Nome e email são obrigatórios')
            return
        }

        setLoading(true)
        try {
            const response = await createUser({ name, email })
            setMessage(`Usuário "${name}" criado com sucesso!`)
            setName('')
            setEmail('')
            if (onUserCreated) onUserCreated(response.data)
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message
            setError(`Erro ao criar usuário: ${errorMsg}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="create-user-form">
            <h2>Criar Novo Usuário</h2>
            
            <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Heitor"
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: heitorcastrocos@gmail.com"
                    disabled={loading}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Usuário'}
            </button>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </form>
    )
}
