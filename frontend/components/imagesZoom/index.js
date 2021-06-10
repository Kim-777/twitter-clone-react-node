import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
    Overlay,
    Global,
    Header,
    SlickWrapper,
    CloseBtn,
    ImgWrapper,
    Indicator,
} from './styles';





const ImagesZoom = ({ images, onClose}) => {

    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <div style={{height: '100%'}}>
                <SlickWrapper>
                    <Slick
                        initialSlide={0}
                        beforeChange={(slide) => setCurrentSlide(slide) }
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {' '}
                            /
                            {' '}
                            {images.length}
                        </div>
                    </Indicator>
                </SlickWrapper>
            </div>
        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom
