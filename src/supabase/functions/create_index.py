#!/usr/bin/env python3
"""
Script para criar o arquivo index.tsx da Edge Function make-server-1a8b02da
Substitui automaticamente "/hello-world" por "/make-server-1a8b02da"
"""

import os

# Caminhos dos arquivos
SOURCE_FILE = "./server/index.tsx"
DEST_FILE = "./make-server-1a8b02da/index.tsx"

def main():
    print("🔄 Criando index.tsx para make-server-1a8b02da...")
    print(f"   Origem: {SOURCE_FILE}")
    print(f"   Destino: {DEST_FILE}")
    print()
    
    # Ler arquivo original
    try:
        with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        print(f"✅ Arquivo original lido: {len(content)} caracteres")
    except FileNotFoundError:
        print(f"❌ Erro: Arquivo {SOURCE_FILE} não encontrado!")
        print("   Certifique-se de executar este script da pasta /supabase/functions/")
        return
    
    # Fazer substituições
    original_count = content.count('"/hello-world')
    content = content.replace('"/hello-world', '"/make-server-1a8b02da')
    print(f"✅ Substituídas {original_count} ocorrências de '/hello-world'")
    
    # Substituir também a mensagem de log
    content = content.replace(
        "console.log('🚀 Edge Function: server');",
        "console.log('🚀 Edge Function: make-server-1a8b02da');"
    )
    print("✅ Atualizada mensagem de log do servidor")
    
    # Criar diretório se não existir
    os.makedirs(os.path.dirname(DEST_FILE), exist_ok=True)
    
    # Escrever arquivo novo
    with open(DEST_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Arquivo criado: {DEST_FILE}")
    print()
    print("🎉 Pronto! Agora você pode fazer o deploy:")
    print("   supabase functions deploy make-server-1a8b02da")
    print()

if __name__ == "__main__":
    main()
