import React from 'react';
import arrow from '../img/arrow.svg';
import bookmark from '../img/bookmark.svg';

import '../styles/css/Guide.css';

const Guide = () => {
    return (
        <>
            <div className="descr">
                <div className="container">
                    <div className="descr__inner">
                        <div className="descr__arrow">
                            <img className="descr__arrow-img" src={arrow} alt="Arrow" />
                        </div>
                        <div className="descr__text">Начните вводить город, например, <span className="descr__text-example">Ижевск</span></div>
                    </div>
                </div>
            </div>

            <div className="bookmark">
                <div className="container">
                    <div className="bookmark__inner">
                        <div className="bookmark__text">Используйте значок «закладки», чтобы закрепить город на главной</div>
                        <div className="bookmark__icon"><img className="bookmark__icon-img" src={bookmark} alt="Bookmark" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Guide;
