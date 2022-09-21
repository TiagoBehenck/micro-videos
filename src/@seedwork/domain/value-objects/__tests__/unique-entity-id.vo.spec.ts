import { validate as uuidValidate } from 'uuid'

import InvalidUuidError from '../../../errors/invalid-uuid.error'
import UniqueEntityId from '../unique-entity-id.vo'

function spyValidateMethod() { 
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId Unit Tests', () => { 
  it('should throw error when uuid is invalid', () => { 
    const validateSpy = spyValidateMethod()
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => { 
    const validateSpy = spyValidateMethod()
    const uuid = '324ca4b3-f6c7-4126-9667-9bebe5e01298'
    const vo = new UniqueEntityId(uuid)

    expect(vo.value).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid not passed in constructor', () => { 
    const validateSpy = spyValidateMethod()
    const vo = new UniqueEntityId()
    
    expect(uuidValidate(vo.value)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})