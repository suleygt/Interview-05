import React, { useEffect, useState, useRef } from "react";

function App() {
  // KODUNU BURAYA GELECEK
  const [inputValue, setInputValue] = useState("");
  const [texts, setTexts] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddText = () => {
    if (inputValue.trim()) {
      setTexts([...texts, inputValue]);
      setInputValue("");
    }
  };

  const handleTextClick = (text) => {
    setSelectedText(text);
    setModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedText(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Metin girin"
          className="text-input"
        />
        <button onClick={handleAddText} className="add-button">Ekle</button>
      </div>
      <ul className="text-list">
        {texts.map((text, index) => (
          <li key={index} onClick={() => handleTextClick(text)} className="text-item">
            {text.length < 6 ? text : `${text.slice(0, 5)}...`}
          </li>
        ))}
      </ul>
      {selectedText && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle} ref={modalRef}>
            {selectedText}
          </div>
        </div>
      )}
      {!selectedText && <div className="black-square"></div>}
    </div>
  );
}

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
};


export default App;
