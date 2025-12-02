import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { SolicitarAcesso } from './pages/SolicitarAcesso';
import { Dashboard } from './pages/Dashboard';
import { TodosContratos } from './pages/TodosContratos';
import { CadastroContrato } from './pages/CadastroContrato';
import { GerenciarUsuarios } from './pages/GerenciarUsuarios';
import { GerenciarSecretarias } from './pages/GerenciarSecretarias';
import { AlertasPrazos } from './pages/AlertasPrazos';
import { Relatorios } from './pages/Relatorios';
import { ParametrosPerfis } from './pages/ParametrosPerfis';
import { AparenciaLayout } from './pages/AparenciaLayout';
import { ConfiguracoesGerais } from './pages/ConfiguracoesGerais';
import { Ajuda } from './pages/Ajuda';
import { Toaster } from 'sonner@2.0.3';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showSolicitarAcesso, setShowSolicitarAcesso] = useState(false);

  if (!isAuthenticated) {
    // Mostrar página de solicitar acesso
    if (showSolicitarAcesso) {
      return <SolicitarAcesso />;
    }
    return <Login onShowSolicitarAcesso={() => setShowSolicitarAcesso(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'todos-contratos':
        return <TodosContratos onNavigate={setCurrentPage} />;
      case 'cadastro-contrato':
        return <CadastroContrato onNavigate={setCurrentPage} />;
      case 'alertas':
        return <AlertasPrazos />;
      case 'relatorios':
        return <Relatorios />;
      case 'usuarios':
        return <GerenciarUsuarios />;
      case 'secretarias':
        return <GerenciarSecretarias />;
      case 'parametros':
        return <ParametrosPerfis />;
      case 'aparencia':
        return <AparenciaLayout />;
      case 'configuracoes':
        return <ConfiguracoesGerais />;
      case 'ajuda':
        return <Ajuda />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <AppContent />
    </AuthProvider>
  );
}