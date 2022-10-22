import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { changeFiltersVisibility } from '../popups/popupFilters/popupFiltersSlice';

import './search.scss';
import '../../style/button.scss';

import filtersImg from './icon/filters.png';

const Search = ({data, search, filters}) => {

    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const {countFilters} = useSelector(state => state.filters)

    useEffect(() => {
        content(false);
    }, [data]);

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
    };

    const onChange = (e) => {
        setValue(e.target.value);
        content(e.target.value);
    };

    const resetValue = () => {
        setValue('');
        content('');
    };

    const onFiltersVisibility = () => {
        dispatch(changeFiltersVisibility(true));
    };
    
    return (
        <div className="search">
            <div className="search__wrapper">
                <div className='search__input-wrapper'><input name='search' onChange={onChange} value={value ?? ''} type="text" className="search__input" placeholder="Введите название товара" />
                {value ? <div onClick={resetValue} className='search__reset'></div> : null}
                </div>
                {!filters ? null : <button className='button__filters' onClick={onFiltersVisibility}>
                    <div className='button__filters-img'>
                        <img src={filtersImg} alt='filters' />
                    </div>
                    <span>Фильтры</span>
                    {countFilters ? <div className="button__filters-count">{countFilters}</div> : null}
                </button>}
            </div>
        </div>
    )
};

export default Search;