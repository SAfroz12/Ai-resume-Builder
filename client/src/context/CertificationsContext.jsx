import { createContext, useState ,useEffect} from "react";

export const CertificationsContext = createContext();
const initialCertifications = [
  {
    id: Date.now(),
    name: ""
  }
];
export const CertificationsProvider = ({ children }) => {
 const [certifications, setCertifications] = useState(() => {
    const saved = localStorage.getItem("certifications");

    return saved
      ? JSON.parse(saved)
      : initialCertifications;
  });


  useEffect(() => {
    localStorage.setItem("certifications", JSON.stringify(certifications));
  }, [certifications]);

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { id: Date.now(), name: "" }
    ]);
  };

  const deleteCertification = (id) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  const updateCertification = (id, value) => {
    setCertifications(
      certifications.map(c =>
        c.id === id ? { ...c, name: value } : c
      )
    );
  };
  const fillDummyCertifications = (data) => {
  setCertifications(data);
};
const resetCertifications = () => {
  setCertifications(initialCertifications);
  localStorage.removeItem("certifications");
};

  return (
    <CertificationsContext.Provider
      value={{
        certifications,
        setCertifications,

        addCertification,
        deleteCertification,
        updateCertification,fillDummyCertifications,resetCertifications
      }}
    >
      {children}
    </CertificationsContext.Provider>
  );
};