import ValueObject from "../value-objects/value-object"
import { deepFreeze } from "./object"

class StubValueObject extends ValueObject {}

describe('object Unit Tests', () => { 
  it('should not freeze a scalar value', () => { 
    const str = deepFreeze('a')
    expect(typeof str).toBe('string')

    let boolean = deepFreeze(true)
    expect(typeof boolean).toBe('boolean')
    boolean =  deepFreeze(false)
    expect(typeof boolean).toBe('boolean')

    const number = deepFreeze(1)
    expect(typeof number).toBe('number')
  })

  it('should must be a immutable obj', () => { 
    const obj = { prop1: 'value1', deep: { prop2: 'value2', prop3: new Date() }}
    const vo = new StubValueObject(obj)

    expect(() => {(obj.prop1 as any) = 'aaa'}).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
    expect(() => {(obj.deep.prop2 as any) = 'aaa'}).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date)
  })
})