import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MyFavorites = () => {

    const [books, setBooks] = useState([])
    const [toEdit, setToEdit] = useState({
        notes: ''
    })

    useEffect(() => {
        const loadBooks = async () => {
            const { data } = await axios.get('/api/books/getmyfavorites')
            data.map(b => b.showNoteMode = false)
            data.map(b => b.notes === null ? b.notes = '' : b.notes = b.notes)
            data.map(b => b.hasNote = b.notes !== '')
            setBooks(data)
        }

        loadBooks()
    }, [])

    const loadBooks = async () => {
        const { data } = await axios.get('/api/books/getmyfavorites')
        data.map(b => b.showNoteMode = false)
        data.map(b => b.notes === null ? b.notes = '' : b.notes = b.notes)
        data.map(b => b.hasNote = b.notes !== '')
        setBooks(data)
    }

    const onRemoveClick = async key => {
        await axios.post('/api/books/removefromfavorites', { key })
        loadBooks()
    }

    const findBook = key => {
        return books.find(b => b.key === key)
    }

    const onAddEditClick = key => {
        const book = findBook(key)
        book.showNoteMode = false
        setToEdit(book)
    }

    const checkEditState = key => {
        if (toEdit === null) {
            return false
        }
        return toEdit.key === key
    }

    const onCancelClick = () => {
        setToEdit({})
    }

    const ontextChange = e => {
        let copy = { ...toEdit }
        copy.notes = e.target.value
        setToEdit(copy)
    }

    const onSaveClick = async () => {

        if (toEdit.notes !== '') {
            await axios.post("/api/books/savenote", { key: toEdit.key, notes: toEdit.notes })
        }
        loadBooks()
        setToEdit({})
    }

    const onShowHideClick = key => {
        let copy = [...books]
        let book = copy.find(b => b.key === key)
        book.showNoteMode = !book.showNoteMode
        setToEdit({})
        setBooks(copy)
    }



    return <div className="container mt-5">
        <div style={{ marginTop: '80px' }} >
            <div className="container mt-5">
                <h2 className="mb-4 text-primary">My Favorites</h2>
                <div className="row">
                    {!!books && books.map(b => <div className="col-md-4 mb-4" key={b.key}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="position-relative">
                                <img src={b.coverUrl} className="card-img-top" alt={b.title} style={{ height: '200px', objectFit: 'contain' }}></img>
                                <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={() => { onRemoveClick(b.key) }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-truncate">{b.title}</h5>
                                <p className="card-text text-muted">by {b.author}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-outline-primary w-100 mb-2" onClick={() => { onAddEditClick(b.key) }}>{b.hasNote ? 'Edit Note' : 'Add Note'}</button>
                                    {b.hasNote && <button className="btn btn-outline-dark w-100" onClick={() => { onShowHideClick(b.key) }}>{b.showNoteMode?'Hide Note': 'Show Note' }</button>}
                                </div>
                                {checkEditState(b.key) && <div className="mt-3">
                                    <textarea className="form-control" rows="3" placeholder="Add your notes here..." value={toEdit.notes} onChange={ontextChange}></textarea>
                                    <div className="d-flex justify-content-between mt-2">
                                        <button disabled={toEdit.notes === ''} className="btn btn-success" onClick={onSaveClick}>Save Note</button>
                                        <button className="btn btn-outline-secondary ms-2" onClick={onCancelClick}>Cancel</button>
                                    </div>
                                </div>}
                                {b.showNoteMode && <div className="mt-3">
                                    <h6>Note</h6>
                                    <p>{b.notes}</p>
                                </div>}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
}

export default MyFavorites