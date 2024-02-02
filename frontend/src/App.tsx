import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Result from './pages/Result';
import LoadingScreen from './components/LoadingScreen';
import Onboarding from './components/Onboarding';
import NotFound from './pages/NotFound';

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
    <div className="container mx-auto min-h-screen bg-white font-sans">
      {showOnboarding ? (
        <Onboarding />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LoadingScreen />
        </>
      )}
    </div>
  );
}

export default App;
