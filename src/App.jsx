
import LanguageToggle from './components/LanguageToggle.jsx';
import Navbar from './components/Navbar.jsx';
import Community from './tabs/Community.jsx';
import ServiceMarketplace from './tabs/ServiceMarketplace.jsx';
import { useState } from 'react';


function App() {

  const [selectedTab, setSelectedTab] = useState('community');
  
 

  return (
    <>
      <LanguageToggle /> {/*Language Switcher - used i18n
                          edit from locales/en or si/translational.json*/}

      <Navbar onTabChange={setSelectedTab} />  {/*send argument to change tabs*/}
      {selectedTab === 'community' && <Community />}
      {selectedTab === 'marketplace' && <ServiceMarketplace />}
      
    </>
  );
}

export default App;