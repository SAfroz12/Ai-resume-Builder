# ResumeIQ – AI-Powered Resume Builder

ResumeIQ is a full-stack AI-powered resume builder designed to help users create professional, structured, and recruiter-friendly resumes with the assistance of AI.

Users can upload an existing resume, automatically extract its information, edit and improve the content, preview the resume using professional templates, and export the final resume as a PDF.

## 🎥 Demo
[https://github.com/user-attachments/assets/6bf3bb0c-9fb6-4fea-930e-588ff4aa9c46](https://drive.google.com/file/d/1_qenH_KB716a49UP2n05mbYSDRE1YDBq/view?usp=sharing)

## 🚀 Live Demo

https://ai-resume-builder-omega-pearl.vercel.app/

## ✨ Features

- **AI-Powered Resume Extraction**
  - Upload an existing resume and automatically extract personal information, education, skills, projects, experience, and certifications.
  - Uses the Mistral API to process and structure resume content.

- **AI Resume Enhancement**
  - Generate and improve resume content based on the user's existing information.
  - Improves wording, clarity, and professional presentation while preserving the original facts.

- **Resume Editor**
  - Edit extracted or manually entered resume information through a structured resume editor.
  - Manage personal information, education, skills, projects, experience, and certifications.

- **Editor Score**
  - Evaluates the completeness of the resume based on the information provided.

- **Professional Resume Templates**
  - Multiple resume layouts designed for clean and professional presentation.
  - Responsive preview for different screen sizes.

- **PDF Export**
  - Export the completed resume as a professional PDF using `html2pdf.js`.

- **Secure Backend APIs**
  - REST APIs built with Node.js and Express.js.
  - Handles resume processing, AI integration, and document extraction.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- HTML
- Vite
- html2pdf.js

### Backend
- Node.js
- Express.js
- REST APIs
- Multer
- PDF Parser

### AI
- Mistral API

### Tools & Deployment
- Git
- GitHub
- Vercel
- Render

## Project Architecture
ResumeIQ
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── templates/
│   ├── services/
│   
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
🔄 How It Works
Upload Resume
      ↓
Extract Resume Text
      ↓
Mistral AI Processing
      ↓
Structured Resume Data
      ↓
Resume Editor
      ↓
AI Content Enhancement
      ↓
Professional Resume Template
      ↓
PDF Export
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/SAfroz12/Ai-resume-Builder.git
cd Ai-resume-Builder
2. Install frontend dependencies
cd client
npm install
3. Install backend dependencies

Open another terminal:

cd server
npm install
4. Configure environment variables

Create a .env file inside the server directory:

PORT=5000
MISTRAL_API_KEY=your_mistral_api_key

For the frontend, create a .env file inside the client directory:

VITE_API_URL=http://localhost:5000
5. Start the backend
cd server
npm start
6. Start the frontend
cd client
npm run dev

The application will then be available through the Vite development server.

📌 Key Highlights
Full-stack MERN application
AI-powered resume data extraction
AI-assisted resume content generation
Resume upload and PDF parsing
Structured resume editor
Multiple professional resume templates
Resume comparison functionality
PDF generation using html2pdf.js
RESTful backend architecture
Deployed frontend and backend
🔗 Project Links

GitHub:
https://github.com/SAfroz12/Ai-resume-Builder

Live Application:
https://ai-resume-builder-omega-pearl.vercel.app/


## 🔮 Future Enhancements

### Phase 2 – Resume Intelligence & Comparison

- **Resume Compare:** Compare the uploaded resume with the AI-enhanced resume side by side and highlight changes, missing information, and improved sections.
- **Job Description Analysis:** Allow users to paste a job description and analyze how well their resume matches the required skills and keywords.
- **Resume Suggestions:** Provide section-wise suggestions for improving summaries, projects, skills, and experience.
- **More Resume Templates:** Add additional professional and modern resume templates with different layouts and styles.
- **Enhanced Resume Customization:** Allow users to customize fonts, spacing, colors, section ordering, and other resume formatting options.
- **Additional Resume Sections:** Support sections such as achievements, languages, coursework, interests, publications, and extracurricular activities.
- **Resume Version Management:** Allow users to create and manage multiple versions of their resume for different job applications.

### Phase 3 – Advanced Career Features

- **Job-Specific Resume Generation:** Generate tailored resume content based on a specific job description.
- **Keyword & Skill Gap Analysis:** Identify missing skills and keywords from a job description and compare them against the user's resume.
- **Resume Scoring Improvements:** Provide more detailed scoring across individual resume sections.
- **Multiple Resume Profiles:** Allow users to maintain different resume profiles for different roles and industries.
- **AI Career Suggestions:** Provide recommendations for relevant skills, projects, and areas of improvement based on the user's profile.
- 
👨‍💻 Author

Afroz Shaik

GitHub: https://github.com/SAfroz12

LinkedIn: https://www.linkedin.com/in/afroz-sk-26429b278/
