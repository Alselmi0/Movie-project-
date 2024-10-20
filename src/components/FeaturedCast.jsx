import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCredits } from "../redux/features/credits/credits";

import Slider from "react-slick";
import { settings } from "../helpers/sliderSettings";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import personPlaceholder from "../assets/images/person.png";

import "../styles/FeaturedCast.css";

function FeaturedCast(props) {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.navigationBarReducer.language);

    useEffect(() => {
        dispatch(getCredits(props.id));
    }, [dispatch, props.id]);

    const { cast } = useSelector((state) => state.creditsReducer.credits);
    const loading_credits = useSelector((state) => state.creditsReducer.loading);
    const loading_movie = useSelector((state) => state.movieReducer.loading);

    const messages = {
        "en-US": "Featured Cast",
        "ar-SA": "الطاقم المميز",
    };

    return (
        <>
            {cast?.length >= 9 && (
                <>
                    {!loading_credits && !loading_movie && (
                        <div className="container">
                            <div className="featured-cast-container">
                                <h3>
                                    {messages[language] || messages["en-US"]} {/* Fallback to English */}
                                    <span style={{ color: "#ffffff99" }}> ({cast.length})</span>
                                </h3>
                                <Slider {...settings}>
                                    {cast.map((member, index) => (
                                        <div className="cast" key={index}>
                                            <div className="img">
                                                <LazyLoadImage
                                                    src={member.profile_path ? `https://image.tmdb.org/t/p/w300/${member.profile_path}` : personPlaceholder}
                                                    alt={`${member.name} image`}
                                                    placeholderSrc={personPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="auto"
                                                    style={{ color: "white", aspectRatio: "3/5" }}
                                                />
                                            </div>
                                            <div className="name">{member.name}</div>
                                            <div className="character">{member.character}</div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default FeaturedCast;