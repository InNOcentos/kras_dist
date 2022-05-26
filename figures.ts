class Point {
  _coordinates: Record<string, number> = {};
  _coordLimit = 1;

  constructor(name: string, value: number) {
    this._coordinates[name] = value;
  }

  get coordinates() {
    return this._coordinates;
  }

  setCoordinate(name: string, value: number) {
    const isOutOfLimit =
      Object.keys(this._coordinates).length >= this._coordLimit &&
      !(name in this._coordinates);
    if (typeof this._coordLimit === "number" && isOutOfLimit) {
      console.log(
        `Для ${this.constructor.name} фигуры невозможно добавить еще одну координату`
      );
      return;
    }
    this._coordinates[name] = value;
  }
}

class ColoredPoint extends Point {
  _color: string;

  constructor(name: string, value: number, color: string) {
    super(name, value);
    this._color = color;
  }

  set color(color: string) {
    this._color = color;
  }

  get color() {
    return this._color;
  }
}

class Line extends Point {
  _coordLimit = 2;

  constructor(name: string, value: number) {
    super(name, value);
  }
}

class ColoredLine extends Line {
  _color: string;
  constructor(name: string, value: number, color: string) {
    super(name, value);
    this._color = color;
  }

  set color(color: string) {
    this.color = color;
  }

  get color() {
    return this.color;
  }
}

class PolyLine extends Line {
  _coordLimit = Infinity;

  constructor(name: string, value: number) {
    super(name, value);
  }
}

// в зависимости от типа фигуры она дает/ не дает добавлять новые координаты
const point = new Point("x", 100);
const coloredPoint = new ColoredPoint("x", 100, "red");
const line = new Line("x", 100);
const coloredLine = new ColoredLine("x", 100, "red");
const polyLine = new PolyLine("x", 100);

point.setCoordinate("y", 200);
line.setCoordinate("y", 200);

console.log("point: ", point.coordinates);
console.log("line: ", line.coordinates);
