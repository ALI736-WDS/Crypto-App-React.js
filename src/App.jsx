import Layouts from "./components/layouts/Layouts";
import HomePage from "./components/templates/HomePage";

function App() {
  return (
    <div>
      <h1>
        <Layouts>
          <HomePage />
        </Layouts>
      </h1>
    </div>
  );
}

export default App;
