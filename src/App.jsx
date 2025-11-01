
import LanguageToggle from './components/LanguageToggle.jsx';
import Navbar from './components/Navbar.jsx';
import DataFormForFindingProvider from './components/DataFormForFindingProvider.jsx';
import { useState } from 'react';
import Themetoggle from './components/Themetoggle.jsx';


function App() {

  const [selectedTab, setSelectedTab] = useState('community');
  
 

  return (
    <>
      <div className="flex justify-end items-center gap-2 pt-4 pr-4">
        <LanguageToggle /> {/*Language Switcher - used i18n
                          edit from locales/en or si/translational.json*/}
        <Themetoggle/>
      </div>
      
      <Navbar/>  {/*send argument to change tabs*/}

      <DataFormForFindingProvider /> {/*Form to find a service provider or to register as a service provider - refer to the design in figma to get the algo*/}
      
    </>
  );
}

export default App;