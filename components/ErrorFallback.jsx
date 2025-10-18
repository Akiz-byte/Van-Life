import React from "react";

export default function ErrorFallback({ error, reset }) {
    return (
        <div className="error-fallback">
            <h2>Network Error</h2>
            <p>{error?.message || "Something went wrong. Please try again."}</p>
            {reset && (
                <button className="btn btn-primary" onClick={reset}>
                    Try Again
                </button>
            )}
        </div>
    );
}
