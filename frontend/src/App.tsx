import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Result from './pages/Result';
import LoadingScreen from './components/LoadingScreen';
import Onboarding from './components/Onboarding';

function App(): JSX.Element {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    const isFromSameSite =
      referrer && referrer.indexOf(window.location.origin) === 0;

    if (!isFromSameSite && !sessionStorage.getItem('visited')) {
      setShowOnboarding(true);
      const timer = setTimeout(() => {
        setShowOnboarding(false);
        sessionStorage.setItem('visited', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {showOnboarding ? (
        <Onboarding />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/result" element={<Result />} />
          </Routes>
          <LoadingScreen />
        </>
      )}
    </>
  );
}

export default App;
