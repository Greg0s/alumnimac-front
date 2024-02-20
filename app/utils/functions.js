export function calcDuration(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const weekDuration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(weekDuration);
}

export function translate(name, value) {
  if (value == "other") return "Autre";

  switch (name) {
    case "type":
      switch (value) {
        case "internship":
          return "Stage";
        case "job":
          return "Emploi";
        default:
          return "Autre";
      }
    case "domain":
      switch (value) {
        case "audiovisual":
          return "Audiovisuel";
        case "graphic-design":
          return "Graphisme";
        case "project-management":
          return "Gestion de projet";
        case "programming":
          return "Programmation";
        case "web-dev":
          return "Dev web/mobile";
        default:
          return "Autre";
      }
    case "mode":
      switch (value) {
        case "remote":
          return "Distanciel";
        case "on_site":
          return "Présentiel";
        case "hybrid":
          return "Hybride";
      }
    case "paid":
      switch (value) {
        case true:
          return "Rémunéré";
        case false:
          return "Non-rémunéré";
      }
    case "recommended":
      switch (value) {
        case true:
          return "Recommandée";
        case false:
          return "Non-recommandée";
      }
    case "error":
      switch (value) {
        case "Email or Username are already taken":
          return "Email déjà utilisé";
        case "password must be at least 6 characters":
          return "Le mot de passe doit faire au moins 6 caractères";
        case "Invalid identifier or password":
          return "Email ou mot de passe incorrect";
      }
  }
}

export function changeDateFormat(date) {
  const dateObj = new Date(date);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

export const descrPlaceholder =
  "Tu peux décrire le travail, les technos et outils utilisés, l'ambiance... \nDans le cas d'une mauvaise expérience, nous te conseillons de rester courtois vis à vis de ton entreprise pour éviter tout problème.";
