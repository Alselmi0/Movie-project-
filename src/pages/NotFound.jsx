import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function NotFound() {
    const language = useSelector((state) => state.navigationBarReducer.language);

    useEffect(() => {
        document.title = `404 Error | Movnite`;
        return () => {
            document.title = "Movnite | Homepage";
        };
    }, []);

    const messages = {
        "en-US": {
            description: "Oops! We can't find the page you're looking for",
            error: "404",
            errorMessage: "ERROR"
        },
        "ar-SA": {
            description: "عذرًا! لا يمكننا العثور على الصفحة التي تبحث عنها",
            error: "٤٠٤",
            errorMessage: "خطأ"
        }
    };

    const { description, error, errorMessage } = messages[language] || messages["en-US"]; // Fallback to English

    return (
        <>
            <Helmet>
                <meta name="description" content={description} />
            </Helmet>
            <div className="container">
                <p className="text-secondary mt-5 pt-5">{description}</p>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <p style={{ fontSize: "50px" }} className="text-secondary">{error}</p>
                    <p style={{ fontSize: "50px" }} className="text-secondary">{errorMessage}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NotFound;