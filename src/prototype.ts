import * as assert from "assert";

function countInstances<T extends new (...args: any) => any>(value: T) {
  let instanceCount = 0;
  // The wrapper must be new-callable
  const wrapper = function (...args: any) {
    instanceCount++;
    const instance = new value(...args);
    // Change the instance
    instance.count = instanceCount;
    return instance;
  } as unknown as T;
  wrapper.prototype = value.prototype; // (A)
  return wrapper;
}

@countInstances
class MyClass {
  count = 0;
}


const inst1 = new MyClass();
console.log(MyClass.prototype)
assert.ok(inst1 instanceof MyClass);
assert.equal(inst1.count, 1);

const inst2 = new MyClass();
assert.ok(inst2 instanceof MyClass);
assert.equal(inst2.count, 2);


