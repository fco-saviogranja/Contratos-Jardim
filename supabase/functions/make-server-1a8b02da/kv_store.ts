// ========================================
// KV STORE - GERENCIAMENTO DE DADOS
// ========================================
// Sistema de armazenamento chave-valor usando Supabase Postgres
// Tabela: kv_store_1a8b02da

import { createClient } from 'jsr:@supabase/supabase-js@2';

// Cliente Supabase com service role para acesso total
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const TABLE_NAME = 'kv_store_1a8b02da';

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

/**
 * GET - Buscar um único valor por chave
 * @param key - Chave do registro
 * @returns Valor armazenado ou null se não existir
 */
export async function get(key: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Registro não encontrado
        return null;
      }
      throw error;
    }

    return data?.value || null;
  } catch (error: any) {
    console.error(`❌ [KV GET] Erro ao buscar chave "${key}":`, error.message);
    return null;
  }
}

/**
 * SET - Armazenar um valor
 * @param key - Chave do registro
 * @param value - Valor a ser armazenado (será convertido para JSON)
 */
export async function set(key: string, value: any): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(
        { key, value },
        { onConflict: 'key' }
      );

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(`❌ [KV SET] Erro ao salvar chave "${key}":`, error.message);
    throw error;
  }
}

/**
 * DEL - Deletar um registro
 * @param key - Chave do registro a ser deletado
 */
export async function del(key: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('key', key);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(`❌ [KV DEL] Erro ao deletar chave "${key}":`, error.message);
    throw error;
  }
}

/**
 * MGET - Buscar múltiplos valores por chaves
 * @param keys - Array de chaves
 * @returns Array de valores na mesma ordem das chaves
 */
export async function mget(keys: string[]): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('key, value')
      .in('key', keys);

    if (error) {
      throw error;
    }

    // Retornar valores na mesma ordem das chaves
    return keys.map(key => {
      const item = data?.find(d => d.key === key);
      return item?.value || null;
    });
  } catch (error: any) {
    console.error('❌ [KV MGET] Erro ao buscar múltiplas chaves:', error.message);
    return keys.map(() => null);
  }
}

/**
 * MSET - Armazenar múltiplos valores
 * @param entries - Array de [chave, valor]
 */
export async function mset(entries: [string, any][]): Promise<void> {
  try {
    const records = entries.map(([key, value]) => ({ key, value }));

    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(records, { onConflict: 'key' });

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('❌ [KV MSET] Erro ao salvar múltiplas chaves:', error.message);
    throw error;
  }
}

/**
 * MDEL - Deletar múltiplos registros
 * @param keys - Array de chaves a serem deletadas
 */
export async function mdel(keys: string[]): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .in('key', keys);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('❌ [KV MDEL] Erro ao deletar múltiplas chaves:', error.message);
    throw error;
  }
}

/**
 * GETBYPREFIX - Buscar todos os valores que começam com um prefixo
 * @param prefix - Prefixo da chave (ex: "user:" retorna todos user:*)
 * @returns Array de valores
 */
export async function getByPrefix(prefix: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('value')
      .like('key', `${prefix}%`)
      .order('key', { ascending: true });

    if (error) {
      throw error;
    }

    return data?.map(d => d.value) || [];
  } catch (error: any) {
    console.error(`❌ [KV GETBYPREFIX] Erro ao buscar prefixo "${prefix}":`, error.message);
    return [];
  }
}

/**
 * COUNT - Contar registros com um prefixo
 * @param prefix - Prefixo da chave (opcional, se vazio conta todos)
 * @returns Número de registros
 */
export async function count(prefix?: string): Promise<number> {
  try {
    let query = supabase
      .from(TABLE_NAME)
      .select('key', { count: 'exact', head: true });

    if (prefix) {
      query = query.like('key', `${prefix}%`);
    }

    const { count, error } = await query;

    if (error) {
      throw error;
    }

    return count || 0;
  } catch (error: any) {
    console.error('❌ [KV COUNT] Erro ao contar registros:', error.message);
    return 0;
  }
}

/**
 * CLEAR - Limpar todos os registros com um prefixo
 * @param prefix - Prefixo das chaves a serem limpas
 */
export async function clear(prefix: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .like('key', `${prefix}%`)
      .select('key');

    if (error) {
      throw error;
    }

    return data?.length || 0;
  } catch (error: any) {
    console.error(`❌ [KV CLEAR] Erro ao limpar prefixo "${prefix}":`, error.message);
    return 0;
  }
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * EXISTS - Verificar se uma chave existe
 * @param key - Chave a ser verificada
 * @returns true se existe, false caso contrário
 */
export async function exists(key: string): Promise<boolean> {
  const value = await get(key);
  return value !== null;
}

/**
 * KEYS - Listar todas as chaves com um prefixo
 * @param prefix - Prefixo das chaves (opcional)
 * @returns Array de chaves
 */
export async function keys(prefix?: string): Promise<string[]> {
  try {
    let query = supabase
      .from(TABLE_NAME)
      .select('key')
      .order('key', { ascending: true });

    if (prefix) {
      query = query.like('key', `${prefix}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data?.map(d => d.key) || [];
  } catch (error: any) {
    console.error('❌ [KV KEYS] Erro ao listar chaves:', error.message);
    return [];
  }
}

console.log('✅ [KV STORE] Módulo carregado com sucesso');
console.log(`📊 [KV STORE] Tabela: ${TABLE_NAME}`);
