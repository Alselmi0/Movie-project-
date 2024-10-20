import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setLanguage, setSortedBy, setWhichMovies } from "../redux/features/navigationBar/navigationBarSlice";
import { getSearchAndQuery } from "../redux/features/searchAndQuery/searchAndQuerySlice";
import logo from "../assets/images/logo.png";

import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";

import "../styles/NavigationBar.css";
import * as Functions from "../localStorage/localStorage";

function NavigationBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentLocation = location.pathname;
    const dispatch = useDispatch();

    const [isClicked, setIsClicked] = useState({
        movies: Functions.fetchWhichMovies(),
        sortedBy: Functions.fetchSortedBy(),
        language: Functions.fetchLanguage()
    });

    const input = useSelector((state) => state.navigationBarReducer.input);
    const language = useSelector((state) => state.navigationBarReducer.language);

    const handleOptionClick = (type, value) => {
        setIsClicked({ ...isClicked, [type]: value });
        switch (type) {
            case "movies":
                dispatch(setWhichMovies(value));
                break;
            case "sortedBy":
                dispatch(setSortedBy(value));
                break;
            case "language":
                dispatch(setLanguage(value));
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        dispatch(setInput(e.target.value));
    };

    const navbarBrandClick = () => {
        if (currentLocation === "/") {
            window.scrollTo(0, 0);
        } else {
            navigate("/");
        }
    };

    const activeStyle = {
        color: "#DC3545",
        fontWeight: "bold",
    };

    return (
        <Navbar fixed="top" expand="lg" className="bg-dark" data-bs-theme="dark">
            <div className="container">
                <Navbar.Brand onClick={navbarBrandClick} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ width: "120px" }} />
                </Navbar.Brand>

                {currentLocation === "/" && (
                    <>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto my-2 my-lg-0">
                                {input === "" && (
                                    <>
                                        <NavDropdown title={language === "en-US" ? "Movie Lists" : "قوائم الأفلام"}>
                                            {["top_rated", "popular", "upcoming", "now_playing"].map((movieType) => (
                                                <NavDropdown.Item
                                                    key={movieType}
                                                    className='dropdown-item'
                                                    onClick={() => handleOptionClick('movies', movieType)}
                                                    style={isClicked.movies === movieType ? activeStyle : {}}
                                                >
                                                    {language === "en-US" ? movieType.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : movieType === "top_rated" ? "الأعلى تقييمًا" : movieType === "popular" ? "شائع" : movieType === "upcoming" ? "قادمة" : "قيد العرض"}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>

                                        <NavDropdown title={language === "en-US" ? "Sorted By IMDb Ratings" : "مرتبة حسب تقييم IMDb"}>
                                            {["default", "descending", "ascending"].map((sortType) => (
                                                <NavDropdown.Item
                                                    key={sortType}
                                                    className='dropdown-item'
                                                    onClick={() => handleOptionClick('sortedBy', sortType)}
                                                    style={isClicked.sortedBy === sortType ? activeStyle : {}}
                                                >
                                                    {language === "en-US" ? sortType.charAt(0).toUpperCase() + sortType.slice(1) : sortType === "default" ? "افتراضي" : sortType === "descending" ? "تنازلي" : "تصاعدي"}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>

                                        <NavDropdown title={language === "en-US" ? "Language" : "اللغة"}>
                                            {["en-US", "ar-SA"].map((lang) => (
                                                <NavDropdown.Item
                                                    key={lang}
                                                    className='dropdown-item'
                                                    onClick={() => handleOptionClick('language', lang)}
                                                    style={isClicked.language === lang ? activeStyle : {}}
                                                >
                                                    {lang === "en-US" ? "English (en-US)" : "العربية (ar-SA)"}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>
                                    </>
                                )}
                            </Nav>
                            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                                <Form.Control
                                    type="search"
                                    placeholder={language === "en-US" ? "Search movie" : "ابحث عن فيلم"}
                                    className="input me-1"
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                    value={input}
                                    spellCheck="false"
                                />
                                <Button className="btn btn-danger text-white" type="submit" onClick={() => dispatch(getSearchAndQuery(input))}>Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </>
                )}
            </div>
        </Navbar>
    );
}

export default NavigationBar;