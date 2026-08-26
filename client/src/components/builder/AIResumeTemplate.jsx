import Template1 from "./Template1";
import Template2 from "./Template2";

function AIResumeTemplate({
  template,
  type,
  data}) {
  if (!data) {
    return null;
  }
  if (template === "template2") {
    return (
      <Template2
        type={type}
        data={data}
      />
    );
  }

  return (
    <Template1
      type={type}
      data={data}
    />
  );
}

export default AIResumeTemplate;