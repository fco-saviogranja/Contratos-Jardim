import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { SetupInicial } from './pages/SetupInicial';
import { SolicitarAcesso } from './pages/SolicitarAcesso';
import { Dashboard } from './pages/Dashboard';
import { MeusContratos } from './pages/MeusContratos';
import { TodosContratos } from './pages/TodosContratos';
import { CadastroContrato } from './pages/CadastroContrato';
import { GerenciarUsuarios } from './pages/GerenciarUsuarios';
import { AlertasPrazos } from './pages/AlertasPrazos';
import { Relatorios } from './pages/Relatorios';
import { ParametrosPerfis } from './pages/ParametrosPerfis';
import { AparenciaLayout } from './pages/AparenciaLayout';
import { ConfiguracoesGerais } from './pages/ConfiguracoesGerais';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showSetup, setShowSetup] = useState(false);
  const [showSolicitarAcesso, setShowSolicitarAcesso] = useState(false);

  if (!isAuthenticated) {
    // Mostrar setup inicial se solicitado
    if (showSetup) {
      return <SetupInicial />;
    }
    // Mostrar página de solicitar acesso
    if (showSolicitarAcesso) {
      return <SolicitarAcesso />;
    }
    return <Login onShowSetup={() => setShowSetup(true)} onShowSolicitarAcesso={() => setShowSolicitarAcesso(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'meus-contratos':
        return <MeusContratos onNavigate={setCurrentPage} />;
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
      case 'parametros':
        return <ParametrosPerfis />;
      case 'aparencia':
        return <AparenciaLayout />;
      case 'configuracoes':
        return <ConfiguracoesGerais />;
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
      <AppContent />
    </AuthProvider>
  );
}