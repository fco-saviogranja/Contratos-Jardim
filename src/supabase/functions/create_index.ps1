# Script PowerShell para criar o arquivo index.tsx da Edge Function make-server-1a8b02da
# Substitui automaticamente "/hello-world" por "/make-server-1a8b02da"

Write-Host "🔄 Criando index.tsx para make-server-1a8b02da..." -ForegroundColor Cyan
Write-Host ""

# Verificar se o arquivo fonte existe
$sourceFile = "./server/index.tsx"
$destFile = "./make-server-1a8b02da/index.tsx"

if (-not (Test-Path $sourceFile)) {
    Write-Host "❌ Erro: Arquivo $sourceFile não encontrado!" -ForegroundColor Red
    Write-Host "   Certifique-se de executar este script da pasta /supabase/functions/" -ForegroundColor Yellow
    exit 1
}

# Criar diretório se não existir
$destDir = Split-Path -Path $destFile
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

# Ler conteúdo, substituir e salvar
$content = Get-Content $sourceFile -Raw -Encoding UTF8
$content = $content -replace '"/hello-world', '"/make-server-1a8b02da'
$content = $content -replace 'Edge Function: server', 'Edge Function: make-server-1a8b02da'
Set-Content -Path $destFile -Value $content -Encoding UTF8

Write-Host "✅ Arquivo criado: $destFile" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Pronto! Agora você pode fazer o deploy:" -ForegroundColor Green
Write-Host "   supabase functions deploy make-server-1a8b02da" -ForegroundColor White
Write-Host ""
