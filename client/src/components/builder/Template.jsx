import { useSearchParams } from "react-router-dom";

import Template1 from "./Template1";
import Template2 from "./Template2";
function Template({ type, template,data }) {
  const [searchParams] = useSearchParams();
  const selectedType =
    type || searchParams.get("type") || "fresher";

  const selectedTemplate =
    template || searchParams.get("template") || "template1";


  if (selectedTemplate === "template2") {
    return (
      <Template2
        type={selectedType}
           data={data}
      />
    );
  }


  return (
    <Template1
      type={selectedType}
         data={data}
    />
  );
}

export default Template;