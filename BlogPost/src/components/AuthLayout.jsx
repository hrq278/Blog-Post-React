import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login");
        } else if (!authentication && authStatus) {
            navigate("/");
        } else {
            setLoading(false); // Only set loading to false if no navigation occurs
        }
    }, [authStatus, navigate, authentication]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
}

export default Protected;
