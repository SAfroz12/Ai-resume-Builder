import { createContext, useState } from "react";

export const AiPreviewContext = createContext();

export const AiPreviewProvider = ({ children }) => {

  const [aiPreviewData, setAiPreviewData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const resetAiPreview = () => {
    setAiPreviewData(null);
    setLoadingAI(false);
  };

  return (
    <AiPreviewContext.Provider
      value={{
        aiPreviewData,
        setAiPreviewData,
        loadingAI,
        setLoadingAI,
        resetAiPreview
      }}
    >
      {children}
    </AiPreviewContext.Provider>
  );
};