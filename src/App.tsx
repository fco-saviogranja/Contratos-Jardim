import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { InitialSetup } from './components/InitialSetup';
import { Toaster } from './components/ui/sonner';
import { localStore } from './utils/localStore';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'gestor';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    // Initialize default user on first load
    localStore.initializeDefaultUser();
    checkSession();
    loadSystemSettings();
  }, []);

  const loadSystemSettings = async () => {
    try {
      // Carregar configurações do localStorage
      const settings = localStore.getSettings();
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    } catch (error) {
      console.log('Erro ao carregar configurações, usando padrão');
      document.documentElement.style.setProperty('--primary-color', '#4a7c59');
      document.documentElement.style.setProperty('--secondary-color', '#6c9a6f');
    }
  };

  const checkSession = async () => {
    try {
      // Check offline session
      const session = localStore.getCurrentSession();

      if (session?.userId) {
        // Get user profile from localStorage
        const profile = localStore.getUser(session.userId);
        
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
          });
          setNeedsSetup(false);
        } else {
          // Session exists but no profile - clear session
          localStore.clearSession();
          setNeedsSetup(localStore.needsSetup());
        }
      } else {
        // No session, check if we need initial setup
        setNeedsSetup(localStore.needsSetup());
      }
    } catch (error) {
      console.log('Erro ao verificar sessão:', error);
      setNeedsSetup(localStore.needsSetup());
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      localStore.clearSession();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSetupComplete = () => {
    setNeedsSetup(false);
    // Recheck session after setup
    checkSession();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {needsSetup ? (
        <InitialSetup onSetupComplete={handleSetupComplete} />
      ) : user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={checkSession} />
      )}
      <Toaster position="top-right" />
    </>
  );
}