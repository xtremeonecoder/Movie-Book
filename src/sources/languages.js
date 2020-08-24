/**
 * Movie Book - Application - languages.js
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const languages = {
  en: "English",
  sv: "Swedish",
  ja: "Japanese",
  ar: "Arabic",
  az: "Azeri (Latin)",
  bg: "Bulgarian",
  bn: "Bengali",
  ca: "Catalan",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  es: "Spanish",
  et: "Estonian",
  fa: "Farsi",
  fi: "Finnish",
  fr: "French",
  he: "Hebrew",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  ms: "Malay",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovenian",
  sq: "Albanian",
  sw: "Swahili",
  th: "Thai",
  tl: "Tagalog",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  vi: "Vietnamese",
  zh: "Chinese",
};

// returns array of object
// contains language name and code
function getLanguages() {
  return languages;
}

export default getLanguages;
