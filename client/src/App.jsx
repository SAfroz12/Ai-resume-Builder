import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import BuilderPage from "./pages/BuilderPage"
import { PersonalInfoProvider } from "./context/PersonalInfoContext";
import { EducationProvider } from './context/EducationContext';
import { ExperienceProvider } from './context/ExperienceContext';
import { SkillsProvider } from "./context/SkillsContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { CertificationsProvider } from './context/CertificationsContext';
//  import Navbar from './components/builder/Navbar';
import { AiPreviewProvider } from './context/AiPreviewContext';
function App() {


  return (
    <>

      <PersonalInfoProvider>
        <EducationProvider>
          <ProjectsProvider>
            <SkillsProvider>
              <ExperienceProvider>
                <CertificationsProvider>
                  <AiPreviewProvider>



                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/homepage" element={<HomePage />} />
                      <Route path='/builder' element={<BuilderPage />} />
                    </Routes>

                  </AiPreviewProvider>
                </CertificationsProvider>
              </ExperienceProvider>
            </SkillsProvider>
          </ProjectsProvider>
        </EducationProvider>
      </PersonalInfoProvider>
    </>
  )
}

export default App
