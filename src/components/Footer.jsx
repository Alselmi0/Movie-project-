function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <div className="container">
            <div className="text-center mt-4 py-4 d-md-flex justify-content-center gap-4">
                <div className="text-white mb-2" style={{ marginTop: "1px" }}>
                    © {currentYear} Abdulmajeed, All rights are reserved.
                </div>
                
                   
            </div>
        </div>
    )
}

export default Footer
