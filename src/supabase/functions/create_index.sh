#!/bin/bash
# Script para criar o arquivo index.tsx da Edge Function make-server-1a8b02da
# Substitui automaticamente "/hello-world" por "/make-server-1a8b02da"

echo "🔄 Criando index.tsx para make-server-1a8b02da..."
echo

# Verificar se o arquivo fonte existe
if [ ! -f "./server/index.tsx" ]; then
    echo "❌ Erro: Arquivo ./server/index.tsx não encontrado!"
    echo "   Certifique-se de executar este script da pasta /supabase/functions/"
    exit 1
fi

# Criar diretório se não existir
mkdir -p "./make-server-1a8b02da"

# Copiar e substituir
sed 's|"/hello-world|"/make-server-1a8b02da|g; s|Edge Function: server|Edge Function: make-server-1a8b02da|g' ./server/index.tsx > ./make-server-1a8b02da/index.tsx

echo "✅ Arquivo criado: ./make-server-1a8b02da/index.tsx"
echo
echo "🎉 Pronto! Agora você pode fazer o deploy:"
echo "   supabase functions deploy make-server-1a8b02da"
echo
