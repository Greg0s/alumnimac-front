export function calcDuration(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const weekDuration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(weekDuration);
}

export function translateAttribute(attributeName, attributeValue) {
  if (attributeValue == "other") return "Autre";

  switch (attributeName) {
    case "type":
      switch (attributeValue) {
        case "internship":
          return "Stage";
        case "job":
          return "Emploi";
        default:
          return "Autre";
      }
    case "domain":
      switch (attributeValue) {
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
      switch (attributeValue) {
        case "remote":
          return "Distanciel";
        case "on_site":
          return "Présentiel";
        case "hybrid":
          return "Hybride";
      }
    case "paid":
      switch (attributeValue) {
        case true:
          return "Rémunérée";
        case false:
          return "Non-rémunérée";
      }
    case "recommended":
      switch (attributeValue) {
        case true:
          return "Recommandée";
        case false:
          return "Non-recommandée";
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
