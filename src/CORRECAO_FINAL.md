# 🔧 CORREÇÃO FINAL: Remover Código Inválido

## ⚠️ INSTRUÇÕES MANUAIS

No arquivo `/components/ImportarExcelModal.tsx`, você precisa **deletar manualmente** as linhas **498-501**:

### Localização
Procure por:
```typescript
          } else if (matchSiglaExata) {
            // Se encontrou pela sigla, registrar no console para debug
            console.log(`  ✅ Secretaria encontrada pela sigla: \"${secretaria}\" → \"${matchSiglaExata.nome}\"`);
          }
```

### Ação
**DELETE** essas 4 linhas completamente.

### Resultado Esperado
Após deletar, o código deve ficar assim na linha 497:

```typescript
            temErro = true;
          }
        }
        
        // Verificar se contrato já existe
        if (contratado) {
```

---

## ✅ Como Fazer

1. Abra `/components/ImportarExcelModal.tsx`
2. Vá até a **linha 498**
3. Procure por `} else if (matchSiglaExata) {`
4. Selecione as linhas 498-501 (4 linhas no total)
5. DELETE
6. Salve o arquivo

---

## 🎯 Por que isso é necessário?

O código antigo tinha um `if (false)` que já foi removido, mas ficou um `else if` órfão que está causando o erro de sintaxe:

```
ERROR: Unexpected "catch"
```

Esse erro acontece porque a estrutura do `if/else` está quebrada.

---

## ✅ Após a Correção

O sistema terá **Match Automático** completo funcionando:
- ✅ Match por NOME (case-insensitive)
- ✅ Match por SIGLA (case-insensitive)
- ✅ Match PARCIAL (contém)
- ✅ Apenas divergências vão para mapeamento manual

---

## 🚀 Teste Rápido

Após corrigir, importe um Excel com:

```
| Secretaria |
|------------|
| SEDUC      |
| CGM        |
| XYZ        | <-- não existe
```

**Resultado esperado**:
- ✅ SEDUC → Match automático
- ✅ CGM → Match automático
- ⚠️ XYZ → Pede mapeamento manual

---

**STATUS**: Aguardando deleção manual das linhas 498-501
