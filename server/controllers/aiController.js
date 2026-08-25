import mistral from "../config/mistral.js";

export const analyzeResume = async (req, res) => {
  try {
    const {
      personalInfo = {},
      education = [],
      skills = {},
      projects = [],
      experience = {},
      certifications = []
    } = req.body;

    const prompt = `
You are an expert ATS Resume Reviewer and Professional Resume Writer.

TASK:
Analyze the resume data and improve it professionally.

RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT return code blocks.
4. Keep the exact JSON structure.
5. Do not remove any existing information.
6. Improve grammar, clarity, professionalism, and ATS optimization.
7. Professional Summary should be 3-5 strong sentences.
8. Project descriptions should focus on:
   - Impact
   - Features built
   - Technologies used
   - Problem solved
9. Work Experience descriptions should:
   - Use action verbs
   - Be achievement oriented
   - Sound professional
10. Skills should be organized correctly into:
    - technical
    - soft
    - tools
11. If data is missing, keep it unchanged.
12. Do not invent fake companies, projects, dates, certifications, or personal information.
13. Improve wording only.

OUTPUT FORMAT:

{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "github": "",
    "linkedin": "",
    "summary": ""
  },
  "education": [],
  "skills": {
    "technical": [],
    "soft": [],
    "tools": []
  },
  "projects": [],
  "experience": {},
  "certifications": []
}

RESUME DATA:

${JSON.stringify(
  {
    personalInfo,
    education,
    skills,
    projects,
    experience,
    certifications
  },
  null,
  2
)}`;

    const response = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]

    });

    const text = response.choices[0].message.content;
    console.log("RAW MISTRAL RESPONSE:");
    console.log(text);

    let clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let parsed;

    try {

      parsed = JSON.parse(clean);

    } catch (error) {

      console.error("JSON PARSE FAILED:", error);

      return res.status(500).json({
        message: "Mistral returned invalid JSON"
      });

    }

    res.status(200).json(parsed);


  } catch (error) {

    console.error("MISTRAL ERROR:", error);

    res.status(500).json({
      message: "Mistral AI failed"
    });

  }

};