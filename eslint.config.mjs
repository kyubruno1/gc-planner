import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // 1. IGNORES GLOBAIS (Sempre primeiro e sozinho)
  {
    ignores: [".next/**/*", "node_modules/**/*", "dist/**/*", "next.config.ts"], 
  },
  
  // 2. JS RECOMENDADO
  js.configs.recommended,
  
  // 3. CONFIGURAÇÃO PARA TYPESCRIPT E NEXT
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
];