import IconButton from "../ui/IconButton";
import FormSelect from "../ui/FormSelect";

function MainCard({ index, cardData, setCardData, setZoomView }) {
  return (
    <div className="d-flex flex-column panel border">
      <Header index={index} name={cardData.name} />
      <MainData cardData={cardData} CardView={cardData.MenuClosed} />
      {cardData.MenuClosed ? (
        <></>
      ) : (
        <ChartSettings cardData={cardData} setCardData={setCardData} />
      )}
      <CardBottomMenu
        cardData={cardData}
        setCardView={setCardData}
        setZoomView={setZoomView}
      />
    </div>
  );
}

function Header({ index, name }) {
  return (
    <div className="d-flex flex-row justify-content-between panel_header">
      <div className="d-flex title_Index">{index + 1}</div>
      <div className="d-flex title">{name}</div>
      <div className="d-flex title_spacer"></div>
    </div>
  );
}

function MainData({ cardData, CardView }) {
  if (CardView) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center flex-fill">
        <div className="d-flex justify-content-center align-items-center panel_value InShadow">
          {cardData.valueBuffor[cardData.valueBuffor.length - 1]}
        </div>
        <div className="panel_unit">{cardData.unit}</div>
      </div>
    );
  }
}

function ChartSettings({ cardData, setCardData }) {
  let selectedFirst = cardData.refreshRate;
  let selectedSecond = cardData.DataMaxLength;
  function RefreshHandler(newValue) {
    setCardData({ ...cardData, refreshRate: newValue }, cardData.FieldId);
    selectedFirst = newValue;
  }
  function PointsHandler(newValue) {
    setCardData({ ...cardData, DataMaxLength: newValue }, cardData.FieldId);
    selectedSecond = newValue;
  }
  return (
    <div className="d-flex flex-fill flex-column justify-content-center align-items-center">
      <FormSelect
        Label="Data Density"
        selected={selectedFirst}
        Handler={RefreshHandler}
        styleClass={"cardFormSelect"}
        OptionsData={["1s", 1, "2s", 2, "5s", 5, "30s", 30, "60s", 60]}
      />
      <div className="select_spacer"></div>
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

function CardBottomMenu({ setCardView, cardData, setZoomView }) {
  function ChartHandler() {
    let newWidth;
    if (cardData.width === 2) {
      newWidth = 6;
    } else {
      newWidth = 2;
    }
    setCardView({ ...cardData, width: newWidth }, cardData.FieldId);
  }
  function chartActive() {
    if (cardData.width === 2) return false;
    else return true;
  }
  return (
    <div className="d-flex flex-row align-items-center justify-content-between panel_menu">
      <IconButton
        name={"menu"}
        styleClass="panel_menu_option"
        size={24}
        onClick={() =>
          setCardView(
            { ...cardData, MenuClosed: !cardData.MenuClosed },
            cardData.FieldId
          )
        }
        active={!cardData.MenuClosed}
      />
      <IconButton
        name={"zoom"}
        styleClass="panel_menu_option"
        size={24}
        onClick={() => setZoomView(cardData.FieldId)}
      />
      <IconButton
        name={"chart"}
        styleClass="panel_menu_option"
        size={24}
        onClick={() => ChartHandler()}
        active={chartActive()}
      />
    </div>
  );
}

export default MainCard;
