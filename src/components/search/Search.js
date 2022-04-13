import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './search.scss';

const Search = ({data, search}) => {

    const [value, setValue] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        content(value);
    }, [data])

    const content = (value) => {
        if (!value) {
            dispatch(search(data));
        } else {
            const filterContent = () => { 
                return data.filter(item => {
                const regex = new RegExp(`${value}`, "i");
                return regex.test(item.title);
            });
        }
        dispatch(search(filterContent()));
        }
    } 

    const onChange = (e) => {
        setValue(e.target.value);
        content(e.target.value);
    }

    return (
        <div className="search container">
            <div className="search__wrapper">
                <input onChange={onChange} value={value ?? ''} type="text" className="search__input" placeholder="Введите название товара" />
            </div>
        </div>
    )
};

export default Search;