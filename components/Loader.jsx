import React from "react";

export default function Loader() {
    return (
        <div className="loader-container">
            <img
                src="/spinner.gif"
                alt="Loading..."
                className="loader-spinner"
            />
        </div>
    );
}
