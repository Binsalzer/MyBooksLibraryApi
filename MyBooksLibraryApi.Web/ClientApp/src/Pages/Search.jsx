import React, { useState } from 'react'
import { useAuthentication } from '../AuthenticationContext'
import axios from 'axios'

const Search = () => {
    const [books, setBooks] = useState([])
    const [searchText, setSearchText] = useState('')
    const { user } = useAuthentication()
    const isLoggedIn = !!user

    const onTextChange = e => {
        setSearchText(e.target.value)
    }

    const onSearchClick = async e => {
        e.preventDefault()
        const { data } = await axios.get(`/api/books/getbooksforsearch?searchtext=${searchText}`)
        console.log(data)
        setBooks(data)
    }

    const onAddClick = async key => {
        console.log(key)
        await axios.post('/api/books/addtofavorites', { key })
        toggleBookFavoriteStatus(key)
    }

    const onRemoveClick = async key => {
        await axios.post('/api/books/removefromfavorites', { key })
        toggleBookFavoriteStatus(key)
    }

    const toggleBookFavoriteStatus = key => {
        let copy = [...books]
        let selected = copy.find(b => b.key === key)
        selected.isFavorite = !selected.isFavorite
        setBooks(copy)
    }

    return (
        <div className="container mt-5">
            <div style={{ marginTop: '80px' }} >
                <div className="container mt-5">
                    <h2>Search for Books</h2>
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter book title, author, or ISBN" onChange={onTextChange} value={searchText}></input>
                            <button className="btn btn-primary" type="submit" onClick={onSearchClick}>Search</button>
                        </div>
                    </form>
                    <div className="row">
                        {books.map(b => <div className='col-md-4 mb-3' key={b.key} >
                            <div className="card h-100">
                                <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }} >
                                    <img src={b.coverUrl} className='card-img-top' alt={b.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}></img>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{b.title}</h5>
                                    <p className="card-text">By {b.author}</p>
                                    {!isLoggedIn && <button disabled className="btn btn-success mt-auto">Sign In to Add to Favorites</button>}
                                    {isLoggedIn && <button className={b.isFavorite ? 'btn btn-danger' : 'btn btn-success'} onClick=
                                        {b.isFavorite ? () => { onRemoveClick(b.key) } : () => { onAddClick(b.key) }}>{b.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>}
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search