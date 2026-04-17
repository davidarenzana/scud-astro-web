// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  // Formateo de código
  semi: false, // Sin punto y coma (moderno)
  singleQuote: true, // Comillas simples
  tabWidth: 2, // Indentación de 2 espacios
  useTabs: false, // Usar espacios en lugar de tabs
  trailingComma: "es5", // Comas finales compatible con ES5
  printWidth: 100, // Máximo 100 caracteres por línea
  arrowParens: "always", // Paréntesis en funciones flecha: (x) =>
  endOfLine: "lf", // Saltos de línea Unix (cross-platform)
  bracketSpacing: true, // Espacios en objetos: { foo: bar }
  bracketSameLine: false, // Cierre en nueva línea en JSX

  // Plugin de Astro
  plugins: ["prettier-plugin-astro"],

  // Configuración específica para archivos
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "preserve", // Preserva saltos de línea en markdown
      },
    },
  ],
};
