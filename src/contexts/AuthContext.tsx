import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { auth } from '../utils/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  checkSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para verificar se a sessão ainda é válida
  const checkSession = (): boolean => {
    const savedUser = auth.getUser();
    const hasToken = auth.isAuthenticated();
    
    if (!savedUser || !hasToken) {
      // Limpar sessão se não houver dados
      if (user) {
        console.warn('⚠️ Sessão inválida detectada, fazendo logout automático...');
        setUser(null);
      }
      return false;
    }
    
    return true;
  };

  // Verificar se já existe sessão ao carregar
  useEffect(() => {
    const savedUser = auth.getUser();
    if (savedUser && auth.isAuthenticated()) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // REMOVIDO: Verificação periódica de sessão que causava loops infinitos
  // A sessão agora é verificada apenas quando necessário (nas chamadas à API)

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      console.log('Tentando login com backend Supabase...');
      
      // Limpar qualquer sessão antiga antes de fazer login
      auth.logout();
      
      const result = await auth.login(email, senha);
      
      if (result.success && result.user) {
        // Mapear dados do backend para o formato User
        const userData: User = {
          id: result.user.id,
          nome: result.user.nome,
          email: result.user.email,
          perfil: result.user.perfil,
          secretaria: result.user.secretaria,
          situacao: 'ativo',
          ultimoAcesso: new Date().toISOString()
        };
        
        setUser(userData);
        console.log('Login bem-sucedido com Supabase!', userData);
        return true;
      }
      
      console.log('Login falhou - credenciais inválidas');
      return false;
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      
      // Sempre limpar sessão em caso de erro
      auth.logout();
      setUser(null);
      
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    console.log('Logout realizado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}