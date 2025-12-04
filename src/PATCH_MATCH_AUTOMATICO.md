# 🔧 PATCH: Match Automático de Secretarias

## ⚠️ Código que Precisa Ser Removido Manualmente

No arquivo `/components/ImportarExcelModal.tsx`, nas **linhas 484-503**, remova o código antigo:

```typescript
// ❌ REMOVER ESTAS LINHAS (484-503):
            // Se encontrou match exato (nome ou sigla), está OK
          if (false) {
            // Não encontrou match exato - gerar sugestões inteligentes
            const sugestoes = encontrarSecretariasMaisParecidas(secretaria, secretariasCadastradas, secretariasCompletasLocal);
            
            const secretariaExistente = secretariasProblema.find(s => s.nomeArquivo === secretaria);
            if (secretariaExistente) {
              secretariaExistente.linhas.push(numeroLinha);
            } else {
              secretariasProblema.push({
                nomeArquivo: secretaria,
                linhas: [numeroLinha],
                sugestoes
              });
            }
            temErro = true;
          } else if (matchSiglaExata) {
            // Se encontrou pela sigla, registrar no console para debug
            console.log(`  ✅ Secretaria encontrada pela sigla: \"${secretaria}\" → \"${matchSiglaExata.nome}\"`);
          }
```

## ✅ Substituir Por:

```typescript
// ✅ SUBSTITUIR POR ESTE CÓDIGO:
            // Gerar sugestões inteligentes
            const sugestoes = encontrarSecretariasMaisParecidas(secretaria, secretariasCadastradas, secretariasCompletasLocal);
            
            const secretariaExistente = secretariasProblema.find(s => s.nomeArquivo === secretaria);
            if (secretariaExistente) {
              secretariaExistente.linhas.push(numeroLinha);
            } else {
              secretariasProblema.push({
                nomeArquivo: secretaria,
                linhas: [numeroLinha],
                sugestoes
              });
            }
            temErro = true; // Só marca erro se NÃO encontrou match
          }
```

---

## 📝 Como Aplicar Manualmente

1. Abra o arquivo `/components/ImportarExcelModal.tsx`
2. Vá até a **linha 484** (procure por `// Se encontrou match exato`)
3. Delete as linhas 484-503 (tudo até `console.log(\`✅ Secretaria encontrada pela sigla...`)
4. Cole o código correto acima

---

## 🎯 Estrutura Final Esperada

Após a correção, o código deve ficar assim (linhas 434-505):

```typescript
        // Verificar se secretaria existe (por nome exato, sigla exata, ou similar)
        if (secretaria) {
          // Normalizar para comparação (case-insensitive, sem espaços extras)
          const secretariaNormalizada = secretaria.toLowerCase().trim();
          
          // 1. Verificar match exato de NOME (case-insensitive)
          const matchNomeExato = secretariasCadastradas.some(s => 
            s.toLowerCase().trim() === secretariaNormalizada
          );
          
          // 2. Verificar match exato de SIGLA (case-insensitive)
          const matchSiglaExata = secretariasCompletasLocal.find(s => 
            s.sigla && s.sigla.toLowerCase().trim() === secretariaNormalizada
          );
          
          // 3. Verificar match PARCIAL (secretaria do Excel contém a sigla ou vice-versa)
          const matchParcial = secretariasCompletasLocal.find(s => {
            const siglaNorm = (s.sigla || '').toLowerCase().trim();
            const nomeNorm = s.nome.toLowerCase().trim();
            
            // Se a sigla está vazia, ignorar
            if (!siglaNorm) return false;
            
            // Se a secretaria do Excel contém a sigla
            if (secretariaNormalizada.includes(siglaNorm)) {
              return true;
            }
            
            // Se o nome cadastrado contém a secretaria do Excel
            if (nomeNorm.includes(secretariaNormalizada)) {
              return true;
            }
            
            return false;
          });
          
          // MATCH AUTOMÁTICO: Se encontrou por nome, sigla ou parcial, aceitar automaticamente
          if (matchNomeExato || matchSiglaExata || matchParcial) {
            if (matchSiglaExata) {
              console.log(`  ✅ MATCH AUTOMÁTICO pela SIGLA: \"${secretaria}\" → \"${matchSiglaExata.nome}\"`);
            } else if (matchParcial) {
              console.log(`  ✅ MATCH AUTOMÁTICO PARCIAL: \"${secretaria}\" → \"${matchParcial.nome}\"`);
            } else {
              console.log(`  ✅ MATCH AUTOMÁTICO pelo NOME: \"${secretaria}\"`);
            }
            // NÃO marca como erro - aceita automaticamente!
          } else {
            // NÃO ENCONTROU MATCH: Precisa perguntar ao usuário
            console.log(`  ⚠️ Secretaria NÃO encontrada: \"${secretaria}\" - requer MAPEAMENTO MANUAL`);
            
            // Gerar sugestões inteligentes
            const sugestoes = encontrarSecretariasMaisParecidas(secretaria, secretariasCadastradas, secretariasCompletasLocal);
            
            const secretariaExistente = secretariasProblema.find(s => s.nomeArquivo === secretaria);
            if (secretariaExistente) {
              secretariaExistente.linhas.push(numeroLinha);
            } else {
              secretariasProblema.push({
                nomeArquivo: secretaria,
                linhas: [numeroLinha],
                sugestoes
              });
            }
            temErro = true; // Só marca erro se NÃO encontrou match
          }
        }
        
        // Verificar se contrato já existe
        if (contratado) {
          ...
        }
```

---

## ✅ Teste Rápido

Após aplicar o patch, teste importando uma planilha com:

```
| Secretaria |
|------------|
| SEDUC      |
| CGM        |
| Educação   |
```

**Resultado esperado**:
- ✅ `SEDUC` → Match automático pela sigla
- ✅ `CGM` → Match automático pela sigla
- ✅ `Educação` → Match parcial (contém em "Secretaria de Educação")
- ✅ **NENHUMA** etapa de mapeamento (pula direto para validação)

---

## 🎯 Status

**Implementação**: 95% concluída  
**Pendente**: Remoção manual do código antigo (linhas 484-503)

Após aplicar este patch manualmente, o sistema de match automático estará 100% funcional!
