import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import { fetchFilters, filteringProducts, changeFiltersVisibility } from "./popupFiltersSlice";

import './popupFilters.scss';
import '../../style/style.scss';

const Filters = ({filters, data}) => {
    const dispatch = useDispatch();
    const [activeFilters, setActiveFilters] = useState([]);
    const { filtersVisibility } = useSelector(state => state.filters);

    const onChangeActive = (filter) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters((state => {
               return state.filter(item => item !== filter)
            }))
        } else {
            setActiveFilters((state) => {
                return state.concat(filter);
             })
        }
    }
console.log(filtersVisibility)
    const onReset = () => {
        setActiveFilters([]);
        dispatch(filteringProducts(data));
    }

    useEffect(() => {
        dispatch(fetchFilters()).unwrap();
    }, [])

    useEffect(() => {
        onFilteringData(activeFilters, data);

    }, [data]);

    const onFilteringData = (active, data) => {
        if (active.length === 0) {
            dispatch(filteringProducts(data));
        } else {
            const res = data.filter(({filters}) => {
                const arr = []
                for (let index = 0; index < active.length; index++) {
                    if (filters.includes(active[index])) {
                        arr.push(true);
                    } else {
                        arr.push(false);
                    }
                }
                if (arr.includes(false)) {
                    return false;
                } else {
                    return true;
                }
            });
     
             dispatch(filteringProducts(res));
        }
        
    };

    const onCloseFilters = () => {
        dispatch(changeFiltersVisibility(false))
    }

    const content = () => {
        if (!filters || filters.length === 0) {
            return <h5>фильтров еще нет</h5>
        } else {
       return <CSSTransition in={filtersVisibility} timeout={500} classNames="visibility">
       <div className="popupFilters">
            <div className="popupFilters__wrapper">
                <h5 className="popupFilters__title">Фильтры</h5>
                <div onClick={onCloseFilters} className="popupFilters__close"></div>
                    { filters.map(({title, filters}) => {
                            return <div key={title} className="popupFilters__block">
                            <h4 className="popupFilters__subTitle">{title}</h4>
                                <div className="popupFilters__filters">
                                    {filters.map((filter) => {
                                        const active = classNames("popupFilters__buttons", {"popupFilters__active": activeFilters.includes(filter)})
                                       return <button onClick={() => onChangeActive(filter)} className={active} key={filter}>{filter}</button>
                                    })}
                                </div>
                        </div>
                    })}
                    <div className="popupFilters__activation">
                        <button onClick={onReset} className="popupFilters__reset">Сбросить</button>
                        <button onClick={() => onFilteringData(activeFilters, data)} className="popupFilters__apply">Применить</button>
                        </div>
            </div>
        </div>
            </CSSTransition>
        }
    } 

    return (
        <>
        {content()}
        </>
    )
};

export default Filters;