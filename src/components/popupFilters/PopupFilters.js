import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchFilters } from "./popupFiltersSlice";

import './popupFilters.scss';

const Filters = ({filters}) => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchFilters()).unwrap();
    }, [])
    const content = () => {
        if (filters.length === 0) {
            return <h5>фильтров еще нет</h5>
        } else {
       return <div className="popupFilters">
            <div className="popupFilters__wrapper">
                <h5 className="popupFilters__title">Фильтры</h5>
                <div className="popupFilters__close">&times;</div>
                    { filters.map(({pizza}) => {
                        return pizza.map(({title, filters}) => {
                            return <div key={title} className="popupFilters__block">
                            <h4 className="popupFilters__subTitle">{title}</h4>
                                <div className="popupFilters__filters">
                                    {filters.map((filter) => {
                                       return <button className="popupFilters__buttons" key={filter}>{filter}</button>
                                    })}
                                </div>
                        </div>
                        })
                        
                    })}
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