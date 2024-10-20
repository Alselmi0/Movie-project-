import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../redux/features/images/imagesSlice";

import Carousel from "react-bootstrap/Carousel";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";

import "../styles/Images.css";

function Images(props) {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.navigationBarReducer.language);

    useEffect(() => {
        dispatch(getImages(props.id));
    }, [dispatch, props.id]);

    const file_paths = useSelector((state) => state.imagesReducer.file_paths);
    const loading_images = useSelector((state) => state.imagesReducer.loading);
    const loading_credits = useSelector((state) => state.creditsReducer.loading);
    const loading_movie = useSelector((state) => state.movieReducer.loading);

    const messages = {
        "en-US": {
            title: "Backgrounds",
            noImages: "There are no background images for this movie."
        },
        "ar-SA": {
            title: "الصور الخلفية",
            noImages: "لا توجد صور خلفية لهذا الفيلم."
        }
    };

    const { title, noImages } = messages[language] || messages["en-US"]; // Fallback to English

    return (
        <>
            {(!loading_images && !loading_credits && !loading_movie) && (
                <div className="images-container">
                    <h3>
                        {title}
                        <span style={{ color: "#ffffff99" }}> ({file_paths.length})</span>
                    </h3>
                    {file_paths.length > 0 ? (
                        <Carousel indicators={false}>
                            {file_paths.map((path, index) => (
                                <Carousel.Item key={index} interval={4000}>
                                    <div className="img">
                                        <LazyLoadImage
                                            src={`https://image.tmdb.org/t/p/original/${path}`}
                                            alt={`Slide ${index + 1}`}
                                            placeholderSrc={posterPlaceholder}
                                            placeholder={<div style={{ width: 'auto', height: 'auto', display: 'block' }}></div>}
                                            effect="blur"
                                            width="100%"
                                            height="auto"
                                            style={{ color: "white", aspectRatio: 3 / 2 }}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="text-secondary">
                            <p>{noImages}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Images;