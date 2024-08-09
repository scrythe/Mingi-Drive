export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
  chargeAttack: Key;
}

export interface Position {
  x: number;
  y: number;
}

export interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowRight: keyof Keys;
  ArrowDown: keyof Keys;
  ArrowLeft: keyof Keys;

  w: keyof Keys;
  d: keyof Keys;
  s: keyof Keys;
  a: keyof Keys;

  " ": keyof Keys;
  Enter: keyof Keys;
}

export interface Screen {
  width: number;
  height: number;
}

export interface CameraInterface {
  pos: Position;
  watch(target: ClientRect): void;
}

