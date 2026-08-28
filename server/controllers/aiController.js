import { mistral1, mistral2 } from "../config/mistral.js";
export const analyzeResume = async (req, res) => {
  try {
    console.log("ANALYZE RESUME REQUEST STARTED");
    const {
      personalInfo = {},
      education = [],
      skills = {},
      projects = [],
      experience = {},
      certifications = [],
    } = req.body;

    const resumeData = {
      personalInfo,
      education,
      skills,
      projects,
      experience,
      certifications,
    };

    console.log(
      "Resume data size:",
      JSON.stringify(resumeData).length,
      "characters"
    );
    const prompt = `
You are an expert ATS resume reviewer and professional resume writer.

Improve the supplied resume professionally.

RULES:
1. Return ONLY valid JSON.
2. Do not return markdown or explanations.
3. Preserve the exact JSON structure and field names.
4. Do not remove existing information.
5. Do not invent companies, projects, dates, skills, certifications, achievements, URLs, or personal information.
6. Improve grammar, clarity, professionalism, and ATS keyword relevance.
7. Keep factual information unchanged.
8. Improve the professional summary to 3-5 strong sentences when a summary exists.
9. Rewrite project descriptions to clearly communicate the problem, features, technologies, and impact without inventing results.
10. Rewrite work experience using strong action verbs and achievement-oriented language without inventing achievements.
11. Keep skills categorized as technical, soft, and tools.
12. Preserve all IDs, URLs, dates, names, and existing fields.
13. Missing values must remain empty.
14. techStack must remain an array of objects with "label" and "value".
15. Skills must remain arrays of objects with "label" and "value".
16. Certifications must remain objects and preserve their existing fields.
17. Do not change the data types of any field.
18. Projects must NEVER contain a "technologies" field.
19. If the input contains "technologies", convert those values into "techStack" objects:
    { "label": "React", "value": "React" }
20. The final project object must use "techStack" only.
IMPORTANT:
Only improve wording.
Do not create information that is not present in the input.

RESUME DATA:
${JSON.stringify(
      {
        personalInfo,
        education,
        skills,
        projects,
        experience,
        certifications,
      },
      null,
      2
    )}
`;

    const response = await mistral1.chat.complete({
      model: "mistral-small-latest",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      response_format: {
        type: "json_object",
      },
      temperature: 0,
      max_tokens: 4000,
    });

    const text = response.choices[0].message.content;

    console.log("Mistral response received");
    console.log(text);

    if (!text) {
      console.error("MISTRAL RETURNED EMPTY RESPONSE");

      return res.status(502).json({
        message: "Mistral returned an empty response",
      });
    }

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (error) {
      console.error("ANALYSIS JSON PARSE FAILED:");
      console.error(error);
      console.error("RAW RESPONSE:");
      console.error(clean);


      return res.status(500).json({
        message: "Mistral returned invalid JSON",
      });
    }
    parsed.personalInfo = parsed.personalInfo || {};

    parsed.education = Array.isArray(parsed.education)
      ? parsed.education
      : [];

    parsed.projects = Array.isArray(parsed.projects)
      ? parsed.projects
      : [];

    parsed.certifications = Array.isArray(parsed.certifications)
      ? parsed.certifications
      : [];

    parsed.skills = parsed.skills || {};

    parsed.skills.technical = Array.isArray(parsed.skills.technical)
      ? parsed.skills.technical
      : [];

    parsed.skills.soft = Array.isArray(parsed.skills.soft)
      ? parsed.skills.soft
      : [];

    parsed.skills.tools = Array.isArray(parsed.skills.tools)
      ? parsed.skills.tools
      : [];

    parsed.experience = parsed.experience || {};
    parsed.projects = parsed.projects.map((project) => {
      let techStack = [];

      // Normal techStack
      if (Array.isArray(project?.techStack)) {
        techStack = project.techStack.map((tech) => {
          if (typeof tech === "string") {
            return {
              label: tech,
              value: tech,
            };
          }

          const techName =
            tech?.value ||
            tech?.label ||
            "";

          return {
            label: techName,
            value: techName,
          };
        });
      }

      // Backward compatibility for "technologies"
      else if (Array.isArray(project?.technologies)) {
        techStack = project.technologies.map((tech) => {
          let techName = "";

          if (typeof tech === "string") {
            techName = tech;
          } else {
            techName =
              tech?.value ||
              tech?.label ||
              "";
          }

          return {
            label: techName,
            value: techName,
          };
        });
      }
      const { technologies, ...rest } = project;

      return {
        ...rest,
        techStack,
      };
    });

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("MISTRAL ANALYSIS ERROR:", error);

    return res.status(500).json({
      message: "Mistral AI failed",
      error: error.message,
    });
  }
};
// Extract resume
export const extractResume = async (req, res) => {
  try {
    const { text, links = [] } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const prompt = `
You are a resume data extraction system.

Extract ONLY information that exists in the resume.

RULES:
1. Return exactly ONE JSON object.
2. The response MUST be valid JSON.
3. Do not return markdown.
4. Do not return explanations before or after the JSON.
5. Do not return multiple JSON objects.
6. Do not add any text outside the JSON object.
7.Do not invent, guess, improve, or rewrite information.
8. If information is missing, use "" for strings, [] for arrays, and {} for objects.
9. Preserve the exact field names and data types shown below.
10. Do not rename fields.
11. Skills must be arrays of objects containing "label" and "value".
12. techStack must be an array of objects containing "label" and "value".
13. For techStack, both label and value must contain the technology name.
14. Preserve all technologies found in the resume.
15. Certifications must remain objects with "id" and "name".
16. Education must be an array.
17. Projects must be an array.
18. Experience must remain an object.
19. Preserve all available information.
IMPORTANT LINK RULES:
- Use the PDF hyperlink URLs supplied below when available.
- For personalInfo.github, use the actual GitHub URL.
- For personalInfo.linkedin, use the actual LinkedIn URL.
- For project.githubUrl, use the actual project GitHub URL when available.
- For project.liveUrl, use the actual live/preview URL when available.
- Never use "GitHub", "LinkedIn", "Live", or "Preview" as a URL.
- Never guess or construct a URL that is not present.
- Preserve the exact URLs supplied in the hyperlink list.

OUTPUT JSON:

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
  "education": [
    {
      "school": "",
      "degree": "",
      "cgpa": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "skills": {
    "technical": [
      {
        "label": "",
        "value": ""
      }
    ],
    "soft": [
      {
        "label": "",
        "value": ""
      }
    ],
    "tools": [
      {
        "label": "",
        "value": ""
      }
    ]
  },
  "projects": [
    {
      "id": "",
      "title": "",
      "liveUrl": "",
      "githubUrl": "",
      "techStack": [
        {
          "label": "",
          "value": ""
        }
      ],
      "description": ""
    }
  ],
  "experience": {
    "company": "",
    "designation": "",
    "startDate": "",
    "endDate": "",
    "current": false,
    "description": ""
  },
  "certifications": [
    {
      "id": "",
      "name": ""
    }
  ]
}

RESUME TEXT:
${text}

PDF HYPERLINKS:
${JSON.stringify(links)}
`;

    const response = await mistral2.chat.complete({
      model: "mistral-small-latest",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
      temperature: 0,
      max_tokens: 6000,
    });

    const rawText = response.choices[0].message.content;

    console.log("RAW MISTRAL EXTRACTION:");
    console.log(rawText);

    const clean = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (error) {
      console.error("EXTRACTION JSON PARSE FAILED:", error);
      console.error("RAW RESPONSE LENGTH:", rawText?.length);
      console.error("RAW RESPONSE END:", rawText?.slice(-1000));
      return res.status(500).json({
        message: "Mistral returned invalid JSON",
      });
    }

    // Make sure these objects always exist
    parsed.personalInfo = parsed.personalInfo || {};

    parsed.skills = parsed.skills || {};
    parsed.skills.technical = Array.isArray(parsed.skills.technical)
      ? parsed.skills.technical
      : [];
    parsed.skills.soft = Array.isArray(parsed.skills.soft)
      ? parsed.skills.soft
      : [];
    parsed.skills.tools = Array.isArray(parsed.skills.tools)
      ? parsed.skills.tools
      : [];

    parsed.education = Array.isArray(parsed.education)
      ? parsed.education
      : [];

    parsed.projects = Array.isArray(parsed.projects)
      ? parsed.projects
      : [];

    parsed.certifications = Array.isArray(parsed.certifications)
      ? parsed.certifications
      : [];

    parsed.experience = parsed.experience || {};
    const githubLink = links.find((link) =>
      /^https?:\/\/(www\.)?github\.com\//i.test(link)
    );

    const linkedinLink = links.find((link) =>
      /^https?:\/\/(www\.)?linkedin\.com\//i.test(link)
    );

    if (githubLink) {
      parsed.personalInfo.github = githubLink;
    }

    if (linkedinLink) {
      parsed.personalInfo.linkedin = linkedinLink;
    }

    // Make sure every project has a techStack array
    parsed.projects = parsed.projects.map((project) => ({
      ...project,
      techStack: Array.isArray(project.techStack)
        ? project.techStack
        : [],
    }));

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("RESUME EXTRACTION ERROR:", error);

    return res.status(500).json({
      message: "Failed to extract resume data",
      error: error.message,
    });
  }
};