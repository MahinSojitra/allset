export class Todo {
  id: number
  title: string
  description: string
  active: boolean

  constructor(id: number, title: string, description: string, active: boolean) {
    this.id = id
    this.title = title
    this.description = description
    this.active = active
  }

}
