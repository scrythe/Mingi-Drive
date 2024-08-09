interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const requestPermission = (
  DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
).requestPermission;

type Key = { pressed: boolean };

interface Keys {
  up: Key;
  left: Key;
  right: Key;
}

interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowLeft: keyof Keys;
  ArrowRight: keyof Keys;

  w: keyof Keys;
  a: keyof Keys;
  d: keyof Keys;
}

const keyMap: KeyMap = {
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowRight: "right",

  w: "up",
  a: "left",
  d: "right",
};

function isOfKeyMap(key: string): key is keyof KeyMap {
  return key in keyMap;
}

class InputHandler {
  private _beta: number;
  private _gamma: number;
  private _keys: Keys;

  constructor() {
    this._beta = 0;
    this._gamma = 0;
    this._keys = {
      up: { pressed: false },
      left: { pressed: false },
      right: { pressed: false },
    };
    this.requestDeviceMotion();
  }

  motionInput(e: DeviceOrientationEvent) {
    if (!e.beta) return;
    this._beta = e.beta;
    if (!e.gamma) return;
    this._gamma = e.gamma;
  }

  keyBoardInput({ key, type }: KeyboardEvent) {
    if (!isOfKeyMap(key)) return;
    const pressedKey = keyMap[key];
    if (type == "keyup") this._keys[pressedKey].pressed = true;
    else if (type == "keydown") this._keys[pressedKey].pressed = false;
  }

  async requestDeviceMotion() {
    if (typeof requestPermission === "function") {
      const permissionResponse = await requestPermission();
      if (permissionResponse == "granted")
        addEventListener("deviceorientation", (e) => this.motionInput(e));
    } else addEventListener("deviceorientation", (e) => this.motionInput(e));
  }

  get beta() {
    return this._beta;
  }

  get gamma() {
    return this._gamma;
  }

  get keys() {
    return this._keys;
  }
}

export default InputHandler;
