import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { fetchFilters, addFilters } from "./popupFiltersSlice";

import './popupFilters.scss';

const Filters = ({filters}) => {
    const dispatch = useDispatch();
    const [activeFilters, setActiveFilters] = useState([]);

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
    const onReset = () => {
        setActiveFilters([]);
    }
    useEffect(() => {
        dispatch(fetchFilters()).unwrap();
    }, [])

    const content = () => {
        if (!filters || filters.length === 0) {
            return <h5>фильтров еще нет</h5>
        } else {
       return <div className="popupFilters">
            <div className="popupFilters__wrapper">
                <h5 className="popupFilters__title">Фильтры</h5>
                <div className="popupFilters__close"></div>
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
                        <button onClick={() => addFilters(activeFilters)} className="popupFilters__apply">Применить</button>
                        </div>
            </div>
        </div>
        }
    } 

    return (
        <>
        {content()}
        </>
    )
};

export default Filters;