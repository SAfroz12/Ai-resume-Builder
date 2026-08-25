import { useContext } from "react";
import { CertificationsContext } from "../../context/CertificationsContext";
import { Trash2, Plus } from "lucide-react";
import "../../styles/certifications.css";

function Certifications() {
  const {
    certifications,
    addCertification,
    deleteCertification,
    updateCertification
  } = useContext(CertificationsContext);

  return (
    <div className="cert-container">

      <h2 className="cert-title">CERTIFICATIONS</h2>

      {certifications.map((cert) => (
        <div key={cert.id} className="cert-row">

          <input
            type="text"
            placeholder="Enter certification details"
            value={cert.name}
            onChange={(e) => updateCertification(cert.id, e.target.value)}
          />

          <Trash2
            size={18}
            className="delete-btn"
            onClick={() => deleteCertification(cert.id)}
          />

        </div>
      ))}
      <div className="center">

        <button className="add-btn" onClick={addCertification}>
          <Plus size={16} /> Add Certification
        </button>
      </div>

    </div>
  );
}

export default Certifications;