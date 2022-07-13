import { useState, useEffect } from 'react';
import Personajes from './Personajes';



function NavPage({ page, setPage }) {
    return (
        <header className="d-flex justify-content-between align-content-center">
            <button className="btn btn-primary btn-sm" onClick={() => setPage(page  - 1)}> Previous</button>
            <p>Page: {page}</p>
            <button className="btn btn-primary btn-sm" onClick={() => setPage(page + 1)}> Next</button>
        </header>
    )
}



const ListaDePersonajes = () => {

    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {

        async function getApi() {
            const result = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await result.json();
            setLoading(false);
            setPersonajes(data.results);

        }

        getApi();
    }, [page])




    return (

        <>
            <NavPage page={page} setPage={setPage} />

            {loading ? (
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

            ) : (

                <div className="row">
                    {
                        personajes.map(personaje => {
                            return (
                                <div className="col-md-4" key={personaje.id}>
                                    <Personajes personaje={personaje} />
                                </div>
                            )
                        })
                    }
                    <NavPage page={page} setPage={setPage} />

                </div>

            )}

        </>
    )
}

export default ListaDePersonajes;


