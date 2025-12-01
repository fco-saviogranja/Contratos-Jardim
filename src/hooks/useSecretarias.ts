import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function useSecretarias() {
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarSecretarias = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/secretarias`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        const data = await response.json();
        if (data.success && data.secretarias) {
          setSecretarias(data.secretarias);
        }
      } catch (err) {
        console.error('Erro ao carregar secretarias:', err);
      } finally {
        setLoading(false);
      }
    };
    carregarSecretarias();
  }, []);

  return { secretarias, loading };
}
