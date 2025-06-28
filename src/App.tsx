import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", disableContextMenu);
    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <main className="">
      <h1>Hello</h1>
    </main>
  );
}

export default App;
