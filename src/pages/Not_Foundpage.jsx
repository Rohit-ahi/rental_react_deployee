

import React from 'react'

export default function NotFoundPage() {

  return (
    <>
        <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "white",
    fontFamily: "'Poppins', sans-serif",
    color: "#343a40"
}}>
    <div style={{
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ffffff ",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        maxWidth: "600px",
        width: "90%"
    }}>
        <h1 style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#ff6f61"
        }}>
            404 - Page Not Found
        </h1>
        <p style={{
            fontSize: "18px",
            marginBottom: "20px",
            color: "#6c757d"
        }}>
            The page you’re looking for doesn’t exist or has been moved.
        </p>
        <p style={{
            fontSize: "16px",
            color: "#6c757d"
        }}>
            Redirecting to Home Page <strong></strong>...
        </p>
        <a href="/" style={{
            display: "inline-block",
            marginTop: "20px",
            textDecoration: "none",
            color: "#ffffff",
            backgroundColor: "#007bff",
            padding: "10px 20px",
            borderRadius: "4px",
            fontWeight: "500",
            transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>
            Back to Home
        </a>
    </div>
</div>

    </>
  )
}
