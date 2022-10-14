import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category extends Entity<CategoryProperties> {
  constructor(
    public readonly props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    super(props, id)
    this.description = this.props.description ?? null;
    this.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get description() {
    return this.props.description
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at
  }

  update(name: string, description: string): void {
    this.name = name
    this.description = description
  }

  activate(): void {
    this.props.is_active = true
  }

  desactivate(): void {
    this.props.is_active = false
  }
}