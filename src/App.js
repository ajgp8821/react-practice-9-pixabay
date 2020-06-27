import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ImageList from './components/ImageList';
import Spinner from './components/Spinner';
import Error from './components/Error';
import useSelect from './hooks/useSelect';

function App() {

  // State de la app
  const [ search, setSearch ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ actualPage, setActualPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);
  const [ previousButton, setPreviousButton ] = useState(true);
  const [ nextButton, setNextButton ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  const [ imagesPerPage, SelectImagesPerPage ] = useSelect(25);

  useEffect(() => {
    if (search === '') return;
    
    const getApi = async () => {
      setError(false);
      const apiKey = '17200489-59de81e1fba5ddb0a1985731c';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`; //+flowers&image_type=photo&pretty=true
  
      // Mostrar el spinner
      setLoading(true);

      try {
        const resp = await fetch(url);
        const result = await resp.json();
        setImages(result.hits);

        // Calcular el total de páginas
        const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
        setTotalPages(calculateTotalPages);
      }
      catch(error){
        setError(true);
      }
      // ocultar el spinner
      setLoading(false);
    }

    // Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' });

    getApi();

  }, [search, actualPage, imagesPerPage]);

  // Definir la página anterior
  const previousPage = () => {
    const newActualPage = actualPage - 1;
    if (newActualPage === 0) return; 
    setActualPage(newActualPage);
  }

  // Definir la página siguiente
  const nextPage = () => {
    const newActualPage = actualPage + 1;
    if (newActualPage > totalPages) return;
    setActualPage(newActualPage);
  }

  // Habilitar / Deshabilitar botones del paginado
  useEffect(() => {    
    const chkBtn = () => {
      // Botón atras
      (actualPage === 1) ? setPreviousButton(true) : setPreviousButton(false);

      // Botón siguiente
      (actualPage === totalPages) ? setNextButton(true) : setNextButton(false);
      
    }
    chkBtn();
  }, [actualPage, totalPages]);


  // Mostrar spinner o resultado
  const component = (loading) ? <Spinner />
  :
    <div className="row justify-content-center mb-5">
      <ImageList
        images={images}
      />
      <div className="container fixed-bottom bg-white ">
        <div className="row mt-2">
          <div className="form-group col-md-7 d-flex justify-content-center ">
            <button
                type="button"
                className="btn btn-info mr-1"
                onClick={previousPage}
                disabled={previousButton}
            >&laquo; Anterior</button>
            <button
              type="button"
              className="btn btn-info"
              onClick={nextPage}
              disabled={nextButton}
            >Siguiente &raquo;</button>
          </div>
          <div className="form-group col-md-5 d-flex justify-content-center">
            <SelectImagesPerPage />
          </div>
        </div>
      </div>
    </div>
  ;

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de imágenes
        </p>
        {
          error ?
            <Error message="Error Interno, por favor intentelo mas tarde" />
          :
            null
        }
        <Form
          setSearch={setSearch}
        />
      </div>
      {component}
    </div>
  );
}

export default App;
