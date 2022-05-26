enum LiquidTransformCondition {
  WATER = "water",
  STEAM = "steam",
  DISTILLATE = "distilate",
}

// Перегонный куб
class Alembic {
  _water: Water;

  constructor(water: Water) {
    this._water = water;
  }

  heat() {
    this._water.temp = 100;
    return this._water.transformTo(LiquidTransformCondition.STEAM);
  }
}

// Холодильник
class Fridge {
  _steam: Steam;

  set steam(steam: Steam) {
    this._steam = steam;
  }

  freeze(temp: number) {
    if (temp >= this._steam.temp)
      throw new Error("Температура должна быть ниже исходной");
    this._steam.temp = temp;
    return this._steam.transformTo(LiquidTransformCondition.DISTILLATE);
  }
}

abstract class Substance {
  protected _volume: number;
  protected _temp: number;

  constructor(volume: number, temp: number) {
    this._volume = volume;
    this._temp = temp;
  }

  transformTo(condition: LiquidTransformCondition): any {
    switch (condition) {
      case LiquidTransformCondition.STEAM:
        return new Steam(this.volume, this.temp);
        break;
      case LiquidTransformCondition.WATER:
        return new Water(this.volume, this.temp);
        break;
      case LiquidTransformCondition.DISTILLATE:
        return new Distillate(this.volume, this.temp);
        break;
      default:
        return this;
        break;
    }
  }

  get volume() {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;
  }

  get temp() {
    return this._temp;
  }

  set temp(value: number) {
    this._temp = value;
  }
}

class Steam extends Substance {
  constructor(volume: number, temp: number) {
    super(volume, temp);
  }
}

class Water extends Substance {
  constructor(volume: number, temp: number) {
    super(volume, temp);
  }
}

class Distillate extends Substance {
  constructor(volume: number, temp: number) {
    super(volume, temp);
  }
}

class AquaDistiller {
  alembic: Alembic;
  fridge: Fridge;

  constructor(alembic: Alembic, fridge: Fridge) {
    this.alembic = alembic;
    this.fridge = fridge;
  }

  run(freezeTemp: number) {
    const steam = this.alembic.heat();
    this.fridge.steam = steam;
    const distillate = this.fridge.freeze(freezeTemp);

    return distillate;
  }
}

// вода - 10л, температура 40
const water = new Water(10, 40);
// создаем перегонный куб и помещаем в него воду
const alembic = new Alembic(water);
// создаем холодильник
const fridge = new Fridge();
// создаем аквадистиллятор, помещаем в него перегонный куб (где уже есть вода) и холодильник. Запускаем процесс, передавая в качестве аргумента температуру до которой позже будем охлаждать
const distiller = new AquaDistiller(alembic, new Fridge()).run(40);

console.log(distiller);
