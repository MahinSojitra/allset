export class Todo {
  id: number
  title: string
  description: string
  active: boolean
  created_at: Date
  updated_at: Date

  constructor(id: number, title: string, description: string, active: boolean, created_at: Date, updated_at: Date) {
    this.id = id
    this.title = title
    this.description = description
    this.active = active
    this.created_at = created_at
    this.updated_at = updated_at
  }

}
