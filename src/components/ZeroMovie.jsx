import { useSelector } from "react-redux";

function ZeroMovie() {
    const language = useSelector((state) => state.navigationBarReducer.language);

    const customStyle = {
        fontSize: "20px",
        height: "100vh"
    };

    const messages = {
        "en-US": "There are no movies that matched your query.",
        "ar-SA": "لا توجد أفلام تطابق استفسارك."
    };

    return (
        <h3 style={customStyle} className="d-flex justify-content-center align-items-center text-center text-secondary">
            {messages[language] || messages["en-US"]} {/* Default to English if language not found */}
        </h3>
    );
}

export default ZeroMovie;