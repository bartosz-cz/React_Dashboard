import FormSelect from "../ui/FormSelect";

function ChartSettings({ CardData, setCardData }) {
  let selectedFirst = CardData.refreshRate;
  let selectedSecond = CardData.DataMaxLength;
  function RefreshHandler(newValue) {
    setCardData({ ...CardData, refreshRate: newValue }, CardData.FieldId);
    selectedFirst = newValue;
  }
  function PointsHandler(newValue) {
    setCardData({ ...CardData, DataMaxLength: newValue }, CardData.FieldId);
    selectedSecond = newValue;
  }
  return (
    <div className="d-flex flex-fill flex-column justify-content-center align-items-center options">
      <FormSelect
        Label="Data Density"
        selected={selectedFirst}
        Handler={RefreshHandler}
        styleClass={"cardFormSelect"}
        OptionsData={["1s", 1, "2s", 2, "5s", 5, "30s", 30, "60s", 60]}
      />
      <div className="space"></div>
      <FormSelect
        Label="Chart Points"
        selected={selectedSecond}
        Handler={PointsHandler}
        styleClass={"cardFormSelect"}
        OptionsData={["15", 15, "30", 30, "50", 50, "100", 100, "200", 200]}
      />
    </div>
  );
}

export default ChartSettings;
