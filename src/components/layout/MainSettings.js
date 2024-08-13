import FormSelect from "../ui/FormSelect";

export default function MainSettings({
  setActiveGroup,
  actualSettings,
  CardsData,
  setCardsData,
  MaxCardsInRow,
  setGroupsCount,
  groupsCount,
}) {
  function RefreshHandler(newValue) {
    actualSettings.current = { ...actualSettings.current, refresh: newValue };
    const newData = CardsData.map((c, i) => {
      return { ...c, refreshRate: newValue };
    });
    setCardsData(newData);
  }
  function PointsHandler(newValue) {
    actualSettings.current = { ...actualSettings.current, points: newValue };
    const newData = CardsData.map((c, i) => {
      return { ...c, DataMaxLength: newValue };
    });
    setCardsData(newData);
  }
  function GroupsHandler(newValue) {
    setActiveGroup(Number(newValue) + 1);
    setGroupsCount(Number(newValue));
  }
  function CardsHandler(newValue) {
    actualSettings.current = { ...actualSettings.current, maxCards: newValue };
    MaxCardsInRow.current = newValue;
  }
  function ArchivesHandler(newValue) {
    actualSettings.current = {
      ...actualSettings.current,
      archivesSize: newValue,
    };
  }
  return (
    <div className="card d-Flex flex-column justify-content-start dashboard_settings border">
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center overflow-auto">
        <div className="select_spacer"></div>
        <FormSelect
          Label="Max Fields In Row"
          selected={MaxCardsInRow.current}
          Handler={CardsHandler}
          styleClass={"cardFormSelect"}
          OptionsData={["1", 1, "2", 2, "3", 3, "4", 4, "5", 5, "6", 6]}
        />
        <div className="select_spacer"></div>
        <FormSelect
          Label="Default Data Density"
          selected={actualSettings.current.refresh}
          Handler={RefreshHandler}
          styleClass={"cardFormSelect"}
          OptionsData={["1s", 1, "2s", 2, "5s", 5, "30s", 30, "60s", 60]}
        />
        <div className="select_spacer"></div>
        <FormSelect
          Label="Default Chart Points"
          selected={actualSettings.current.points}
          Handler={PointsHandler}
          styleClass={"cardFormSelect"}
          OptionsData={["15", 15, "30", 30, "50", 50, "100", 100, "200", 200]}
        />
        <div className="select_spacer"></div>
        <FormSelect
          Label="Data Archives Size"
          selected={actualSettings.current.archivesSize}
          Handler={ArchivesHandler}
          styleClass={"cardFormSelect"}
          OptionsData={[
            "200",
            200,
            "500",
            500,
            "1000",
            1000,
            "2000",
            2000,
            "5000",
            5000,
          ]}
        />
        <div className="select_spacer"></div>
        <FormSelect
          Label="Groups Count"
          selected={groupsCount}
          Handler={GroupsHandler}
          styleClass={"cardFormSelect"}
          OptionsData={["2", 2, "3", 3, "4", 4, "5", 5]}
        />
        <div className="select_spacer"></div>
      </div>
    </div>
  );
}
