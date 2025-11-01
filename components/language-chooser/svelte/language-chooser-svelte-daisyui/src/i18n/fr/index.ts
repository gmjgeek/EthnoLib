import type { Translation } from '../i18n-types'

const fr = {
  // App.svelte
  app: {
    title: 'Démonstration du Sélecteur de Langue',
    languageDisplayName: 'Nom d\'affichage de la langue :',
    languageCode: 'Code de langue :',
    script: 'Écriture :',
    region: 'Région :',
    dialect: 'Dialecte :',
    languageTag: 'Étiquette de langue :',
    modifyLanguageSelection: 'Modifier la sélection de langue',
    chooseTheme: 'Choisir le thème :',
    light: 'Clair',
    dark: 'Sombre'
  },
  
  // LanguageChooser.svelte
  chooser: {
    chooseLanguage: 'Sélectionnez une langue',
    searchPlaceholder: 'Rechercher par nom, code ou pays',
    selectScript: 'Sélectionner une écriture',
    editLanguageTag: 'Modifier l\'étiquette de langue',
    customize: 'Personnaliser',
    unlistedLanguage: 'Langue non répertoriée',
    displayThisLanguageThisWay: 'Afficher cette langue de cette façon',
    ok: 'OK',
    cancel: 'Annuler',
    customLanguageTagPrompt: 'Si cette interface utilisateur ne vous propose pas une étiquette de langue que vous savez être un code ISO 639 valide, vous pouvez la saisir ici :',
    invalidBcp47Format: 'Ceci n\'est pas dans un format IETF BCP 47 valide : {tag}'
  },
  
  // CustomizationModal.svelte
  modal: {
    customLanguageTag: 'Étiquette de langue personnalisée',
    unlistedLanguageTag: 'Étiquette de langue non répertoriée',
    enterCustomTag: 'Entrer une étiquette personnalisée'
  }
} satisfies Translation

export default fr
