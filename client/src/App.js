import './App.css';
import Navigation from "./components/nav/Navigation"
import Button from "react-bootstrap/Button"
import React from "react"

function App() {
  return (
    <React.Fragment>
    <Navigation />
    <Button>This is a button</Button>
    </React.Fragment>
  );
}

export default App;
