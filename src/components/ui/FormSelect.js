var classnames = require("classnames");

function FormSelect({ Handler, Label, OptionsData, selected, styleClass }) {
  let options = [];
  for (let i = 0; i < OptionsData.length; i += 2)
    options.push(
      <option key={i} value={OptionsData[i + 1]}>
        {OptionsData[i]}
      </option>
    );
  return (
    <div
      className={classnames(
        styleClass,
        "InShadow",
        "d-flex",
        "flex-row",
        "FormSelect"
      )}
    >
      <div className="d-flex flex-fill justify-content-center align-items-center FormSelectLabel">
        {Label}
      </div>
      <select
        className="form-select form-select-sm form-control"
        value={selected}
        aria-label="Default select example"
        onChange={(val) => Handler(val.target.value)}
      >
        {options}
      </select>
    </div>
  );
}

export default FormSelect;
