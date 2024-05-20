import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MyFavorites = () => {

    const [books, setBooks] = useState()

    useEffect(() => {
        const loadBooks = async () => {
            const { data } = await axios.get('/api/books/getmyfavorites')
            setBooks(data)
        }

        loadBooks()
    }, [])

    return <div className="container mt-5">
        <div style={{ marginTop: '80px' }} >
            <div className="container mt-5">
                <h2 className="mb-4 text-primary">My Favorites</h2>
                <div className="row">
                    {books.map(b => <div className="col-md-4 mb-4" key={b.key}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="position-relative">
                                <img src={b.coverUrl} className="card-img-top" alt={b.title} style={{ height: '200px', objectFit: 'contain' }}></img>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-truncate">{b.title}</h5>
                                <p className="card-text text-muted">by {b.author}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-outline-primary w-100 mb-2">Add Note</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
}

export default MyFavorites