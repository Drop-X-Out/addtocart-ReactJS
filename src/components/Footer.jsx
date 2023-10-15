import React from "react";
// import "../styles/Footer.css";


class Footer extends React.Component
{
    render()
    {
        return(
            <div className="main-footer">
                <div className="container">
                    
                    <div className="row">
                        <p className="col-sm">
                             &copy;{new Date().getFullYear()} DoX Shop | All rights Reserved. 
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;