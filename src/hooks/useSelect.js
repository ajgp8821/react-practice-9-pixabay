import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useSelect = ( initialSelect ) => {

    const [ state, setState] = useState(initialSelect);

    const SelectNew = () => (
        <select
            className="custom-select w-50 "
            value={state}
            onChange={ e => setState(e.target.value) }
        >
            <option value="">-- Imágenes por página --</option>
            <option key='25' value="25">25</option>
            <option key='50' value="50">50</option>
            <option key='75' value="75">75</option>
            <option key='100' value="100">100</option>

        </select>
    );

    return [ state, SelectNew ];
}

useSelect.propTypes = {
    initialSelect: PropTypes.array.isRequired,
}
 
export default useSelect;

