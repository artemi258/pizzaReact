import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import {
  fetchFilters,
  changeFiltersVisibility,
  countFilters,
} from "./popupFiltersSlice";

import "./popupFilters.scss";
import "../../../style/style.scss";

const Filters = ({ filters, data, action }) => {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState([]);
  const [triggerFiltersApplied, setTriggerFiltersApplied] = useState(false);
  const [triggerFiltersReset, setTriggerFiltersReset] = useState(false);
  const { filtersVisibility } = useSelector((state) => state.filters);

  const onChangeActive = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters((state) => {
        return state.filter((item) => item !== filter);
      });
    } else {
      setActiveFilters((state) => {
        return state.concat(filter);
      });
    }
  };
  const onReset = () => {
    bodyOverflowVisibility();
    dispatch(countFilters(null));
    dispatch(changeFiltersVisibility(false));
    setActiveFilters([]);
    setTriggerFiltersReset(true);
    dispatch(action(data));
  };

  useEffect(() => {
    dispatch(fetchFilters()).unwrap();
  }, []);

  useEffect(() => {
    onFilteringData(activeFilters, data);
  }, [data]);

  const onFilteringData = (active, data) => {
    dispatch(countFilters(activeFilters.length));
    dispatch(changeFiltersVisibility(false));
    if (active.length === 0) {
      dispatch(action(data));
    } else {
      const res = data.filter(({ filters }) => {
        const arr = [];
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

      dispatch(action(res));
    }
  };

  const bodyOverflowHidden = () => {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();
    document.querySelector("body").style.marginRight = `${scrollWidth}px`;
    document.querySelector("body").style.overflowY = "hidden";
  };
  const bodyOverflowVisibility = () => {
    document.querySelector("body").style.overflowY = "";
    document.querySelector("body").style.marginRight = ``;
  };

  const onCloseFilters = () => {
    bodyOverflowVisibility();
    dispatch(changeFiltersVisibility(false));
  };

  const content = () => {
    if (!filters || filters.length === 0) {
     return <CSSTransition
              in={filtersVisibility}
              timeout={500}
              classNames="visibility"
            >
              <div className="popupFilters">
                  <h4 className="popupFilters__subTitle popupFilters__noFilters">фильтров еще нет</h4>
                        </div>
            </CSSTransition>
    } else {
      return (
        <CSSTransition
          in={filtersVisibility}
          timeout={500}
          classNames="visibility"
        >
          <div className="popupFilters">
            <div className="popupFilters__wrapper">
              <h5 className="popupFilters__title">Фильтры</h5>
              <div
                onClick={onCloseFilters}
                className="popupFilters__close"
              ></div>
              {filters.map(({ title, filters }) => {
                return (
                  <div key={title} className="popupFilters__block">
                    <h4 className="popupFilters__subTitle">{title}</h4>
                    <div className="popupFilters__filters">
                      {filters.map((filter) => {
                        const active = classNames("popupFilters__buttons", {
                          popupFilters__active: activeFilters.includes(filter),
                        });
                        return (
                          <button
                            onClick={() => onChangeActive(filter)}
                            className={active}
                            key={filter}
                          >
                            {filter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="popupFilters__activation">
                <button
                  disabled={activeFilters.length ? false : true}
                  onClick={onReset}
                  className="popupFilters__reset"
                >
                  Сбросить
                </button>
                <button
                  disabled={activeFilters.length ? false : true}
                  onClick={() => {
                    setTriggerFiltersApplied(true);
                    onFilteringData(activeFilters, data);
                  }}
                  className="popupFilters__apply"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      );
    }
  };

  const filtersApplied = () => {
    return (
      <CSSTransition
        in={triggerFiltersApplied}
        timeout={500}
        classNames="filtersChange"
      >
        <div className="filtersApplied">
          <span>Фильтры применены</span>
        </div>
      </CSSTransition>
    );
  };
  const filtersReset = () => {
    return (
      <CSSTransition
        in={triggerFiltersReset}
        timeout={500}
        classNames="filtersChange"
      >
        <div className="filtersReset">
          <span>Фильтры сброшены</span>
        </div>
      </CSSTransition>
    );
  };

  if (triggerFiltersApplied) {
    bodyOverflowVisibility();
    setTimeout(() => {
      setTriggerFiltersApplied(false);
    }, 5000);
  }
  if (triggerFiltersReset) {
    setTimeout(() => {
      setTriggerFiltersReset(false);
    }, 5000);
  }

  if (filtersVisibility) {
    bodyOverflowHidden();
  }

  const renderBackground = () => {
    return (
      <CSSTransition
        in={filtersVisibility}
        timeout={300}
        classNames="fadeBackground"
      >
        <div
          onClick={onCloseFilters}
          className="popupFilters__background"
        ></div>
      </CSSTransition>
    );
  };

  return (
    <>
      {renderBackground()}
      {filtersReset()}
      {filtersApplied()}
      {content()}
    </>
  );
};

export default Filters;
