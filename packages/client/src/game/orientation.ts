interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const requestPermission = (
  DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
).requestPermission;

class InputHandler {
  private _eulerAngles: number[];

  constructor() {
    this.requestDeviceMotion();
    this._eulerAngles = [];
  }

  motionInput(e: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = e;
  // https://stackoverflow.com/a/75897568
    this._eulerAngles = this.getEulerAngles(
      this.getRotationMatrix(alpha!, beta!, gamma!),
    );
  }

  getRotationMatrix(alpha: number, beta: number, gamma: number) {
    const degtorad = Math.PI / 180; // Degree-to-Radian conversion
    var cX = Math.cos(beta * degtorad);
    var cY = Math.cos(gamma * degtorad);
    var cZ = Math.cos(alpha * degtorad);
    var sX = Math.sin(beta * degtorad);
    var sY = Math.sin(gamma * degtorad);
    var sZ = Math.sin(alpha * degtorad);

    var m11 = cZ * cY - sZ * sX * sY;
    var m12 = -cX * sZ;
    var m13 = cY * sZ * sX + cZ * sY;

    var m21 = cY * sZ + cZ * sX * sY;
    var m22 = cZ * cX;
    var m23 = sZ * sY - cZ * cY * sX;

    var m31 = -cX * sY;
    var m32 = sX;
    var m33 = cX * cY;
    return [m13, m11, m12, m23, m21, m22, m33, m31, m32];
  }

  getEulerAngles(matrix: number[]) {
    var radtodeg = 180 / Math.PI; // Radian-to-Degree conversion
    var sy = Math.sqrt(matrix[0] * matrix[0] + matrix[3] * matrix[3]);

    var singular = sy < 1e-6; // If

    if (!singular) {
      var x = Math.atan2(matrix[7], matrix[8]);
      var y = Math.atan2(-matrix[6], sy);
      var z = Math.atan2(matrix[3], matrix[0]);
    } else {
      var x = Math.atan2(-matrix[5], matrix[4]);
      var y = Math.atan2(-matrix[6], sy);
      var z = 0;
    }
    return [radtodeg * x, radtodeg * y, radtodeg * z];
  }

  async requestDeviceMotion() {
    if (typeof requestPermission === "function") {
      const permissionResponse = await requestPermission();
      if (permissionResponse == "granted")
        addEventListener("deviceorientation", (e) => this.motionInput(e));
    } else addEventListener("deviceorientation", (e) => this.motionInput(e));
  }

  get eulerAngles() {
    return this._eulerAngles;
  }
}

export default InputHandler;
