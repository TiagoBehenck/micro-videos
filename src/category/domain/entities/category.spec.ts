import { Category } from './category'
import { omit } from 'lodash'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    let category = new Category({
      name: 'Movie',
    })

    let props = omit(category.props, 'created_at')

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true
    })

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date()

    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at
    })

    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at
    })

    category = new Category({
      name: 'Movie',
      description: 'other description'
    })

    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description'
    })

    category = new Category({
      name: 'Movie',
      is_active: false,
    })

    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: false,
    })

    category = new Category({
      name: 'Movie',
      created_at
    })

    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at
    })
  })

  test('id field', () => {
    const data = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ]

    data.forEach(i => {
      const category = new Category(i.props, i.id)
      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  test('getter of name field', () => {
    const category = new Category({
      name: 'Movie'
    })

    expect(category.name).toBe('Movie')
  })

  test('getter and setter of description field', () => {
    let category = new Category({
      name: 'Movie',
    })

    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
      description: 'test the description field'
    })

    expect(category.description).toBe('test the description field')
  })

  test('getter and setter of is active field', () => {
    let category = new Category({
      name: 'Movie',
    })

    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: true,
    })

    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: false,
    })

    expect(category.is_active).toBeFalsy()
  })

  test('getter of created at field', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at
    })
    expect(category.created_at).toBe(created_at)
  })
});