import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useCallback, useRef } from "react";

const WS_URL =
  `${window.location.protocol === "https:" ? "wss:" : "ws:"}//` +
  window.location.host.split(":")[0] +
  "/websocketserver/data";

export default function Websocket({
  CardsData,
  setCardsData,
  actualSettings,
  setCardsCount,
}) {
  const { readyState, sendMessage, lastMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true, // Reconnect automatically on disconnection
    onOpen: () => console.log("WebSocket connection opened"),
    onClose: () => console.log("WebSocket connection closed"),
    onError: (event) => console.error("WebSocket error:", event),
  });
  const lastProcessedMessage = useRef(null);
  const handleWebSocketOpen = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage("config");
    }
  }, [readyState, sendMessage]);

  useEffect(() => {
    handleWebSocketOpen();
  }, [handleWebSocketOpen]);

  const updateDataStructure = useCallback(
    (message) => {
      let dataArray = message.data.split(",");
      let date = getTime();
      let index = 0;

      const Cards = CardsData.map((Field) => {
        if (dataArray[0] !== "C") {
          if (Field.valueBuffor.length > actualSettings.current.archivesSize) {
            Field.valueBuffor.shift();
            Field.timeBuffor.shift();
          }
          Field.valueBuffor.push(dataArray[index]);
          Field.timeBuffor.push(" " + date + " ");
          index++;
        } else {
          setCardsCount((dataArray.length - 1) / 2);
          index++;
          Field.name = dataArray[index];
          Field.unit = dataArray[index + 1];
          index++;
        }
        return Field;
      });
      setCardsData(Cards);
    },
    [CardsData, setCardsData, actualSettings, setCardsCount]
  );

  useEffect(() => {
    if (
      lastMessage &&
      (!lastProcessedMessage.current ||
        lastProcessedMessage.current.data !== lastMessage.data)
    ) {
      updateDataStructure(lastMessage);
      lastProcessedMessage.current = lastMessage;
    }
  }, [lastMessage, updateDataStructure]);

  return null;
}

function getTime() {
  const date = new Date();
  return date.toLocaleTimeString("en-US", { hour12: false });
}
