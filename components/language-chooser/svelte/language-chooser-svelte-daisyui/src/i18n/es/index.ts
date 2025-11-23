import type { Translation } from '../i18n-types'

const es = {
  // App.svelte
  app: {
    title: 'Demostración del Selector de Idiomas',
    languageDisplayName: 'Nombre de visualización del idioma:',
    languageCode: 'Código de idioma:',
    script: 'Alfabeto:',
    region: 'Región:',
    dialect: 'Dialecto:',
    languageTag: 'Etiqueta de idioma:',
    modifyLanguageSelection: 'Modificar selección de idioma',
    chooseTheme: 'Elegir tema:',
    light: 'Claro',
    dark: 'Oscuro'
  },
  
  // LanguageChooser.svelte
  chooser: {
    chooseLanguage: 'Elegir idioma',
    searchPlaceholder: 'Buscar por nombre, código o país',
    selectScript: 'Seleccionar un alfabeto',
    editLanguageTag: 'Editar etiqueta de idioma',
    customize: 'Personalizar',
    unlistedLanguage: 'Idioma no listado',
    displayThisLanguageThisWay: 'Mostrar este idioma de esta manera',
    ok: 'Aceptar',
    cancel: 'Cancelar',
    customLanguageTagPrompt: 'Si esta interfaz de usuario no le ofrece una etiqueta de idioma que usted sabe que es un código ISO 639 válido, puede ingresarlo aquí:',
    invalidBcp47Format: 'Esto no está en un formato IETF BCP 47 válido: {tag}'
  },
  
  // CustomizationModal.svelte
  modal: {
    customLanguageTag: 'Etiqueta de idioma personalizada',
    unlistedLanguageTag: 'Etiqueta de idioma no listado',
    enterCustomTag: 'Ingresar etiqueta personalizada'
  }
} satisfies Translation

export default es
