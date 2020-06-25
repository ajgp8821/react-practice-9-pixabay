import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({ setSearch }) => {

    const [ term, setTerm ] = useState('');
    const [ error, setError ] = useState(false);

    const searchImages = e => {
        e.preventDefault();

        // Validar
        if (term.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // Enviar el térnimo de búsqueda hacia el componente principal
        setSearch(term);
    }


    return (
        <form
            onSubmit={searchImages}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={ e => setTerm(e.target.value) }
                    />
                    
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />

                </div>
            </div>
            { error ? <Error message="Agregar un término de búsqueda" /> : null }
        </form>
    );
}

Form.propTypes = {
    setSearch: PropTypes.func.isRequired,
}
 
export default Form;
