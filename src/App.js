import { MainContent } from "./Components/MainContent/MainContent";
import { Outlet} from 'react-router-dom'

function App() {
  return (
    <div className="AppContent">
      <Outlet/>
      {/* <MainContent/> */}
    </div>
  );
}

export default App;
