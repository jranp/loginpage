import { useState } from "react";
import "./App.css";

function App() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrPhoneError, setEmailOrPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailValidate = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const phoneValidate = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handleValidation = () => {
    let isValid = true;

    if (!emailValidate(emailOrPhone) && !phoneValidate(emailOrPhone)) {
      setEmailOrPhoneError("Please enter a valid email or phone number");
      isValid = false;
    } else {
      setEmailOrPhoneError("");
    }

    if (password.length < 4 || password.length > 60) {
      setPasswordError(
        "Your password must contain between 4 and 60 characters"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test41");
    if (handleValidation()) {
      try {
        const response = await fetch("http://localhost:5001/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhone.includes("@") ? emailOrPhone : "",
            phone: emailOrPhone.includes("@") ? "" : emailOrPhone,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Submit done");
          setShowModal(true);
          console.log("Valid input:", { emailOrPhone, password });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              className="form-input"
            />
            {emailOrPhoneError && (
              <p className="form-error">{emailOrPhoneError}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
            {passwordError && <p className="form-error">{passwordError}</p>}
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
