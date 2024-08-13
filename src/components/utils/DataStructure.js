class Field {
  constructor() {
    this.FieldId = 0;
    this.width = 2;
    this.name = "";
    this.unit = "";
    this.refreshRate = 1;
    this.timeFromRefresh = 0;
    this.chart = false;
    this.chartdata = [[], [], [], [], [], [], []];
    this.valueBuffor = [];
    this.timeBuffor = [];
    this.DataMaxLength = 15;
    this.occupiedColors = [-1, -1, -1, -1, -1];
    this.chartScales = [0, 0, 0, 0, 0];
    this.updateChart = true;
    this.MenuClosed = true;
    this.ZoomView = false;
  }
}

let Cards;
export default function Data(AllCardsCount) {
  Cards = Array(AllCardsCount)
    .fill()
    .map(() => new Field());
  Cards.forEach((Field, i) => {
    Field.FieldId = i;
  });
  return Cards;
}
