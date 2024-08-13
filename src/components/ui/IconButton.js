import classnames from "classnames";
import Icons from "./Icons";

function IconButton({
  name,
  onClick,
  styleClass,
  size = 32,
  invisible = false,
  active,
}) {
  return (
    <div
      onClick={onClick}
      className={classnames(
        styleClass,
        "d-flex",
        "justify-content-center",
        "align-items-center",
        { "d-none": invisible },
        { option_active: active }
      )}
      id={name}
      type="button"
      data-bs-toggle="tooltip"
      data-bs-html="true"
      data-bs-placement="left"
      aria-label={`Option for ${name}`}
      title="<b>Groups</b>"
    >
      <Icons name={name} size={size} />
    </div>
  );
}
export default IconButton;
