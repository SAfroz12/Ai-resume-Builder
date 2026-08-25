export const calculateScore = ({
  personalInfo,
  educations,
  skills,
  projects,
  certifications
}) => {
  let score = 0;
//personal infp
  
  if (personalInfo.fullName) score += 5;
  if (personalInfo.email) score += 5;
  if (personalInfo.phone) score += 5;
  if (personalInfo.summary) score += 5;

  //  education//
  if (educations?.length > 0 && educations[0].school) score += 20;
 //skills//

  if (skills.technical.length > 0) score += 10;
  if (skills.soft.length > 0) score += 10;
//projects//
  if (projects.length > 0 && projects[0].description) score += 20;

//  certifications//
  if (certifications.length > 0 && certifications[0].name) score += 10;

  return Math.min(score, 100); 
};