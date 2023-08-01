
export class FunctionsService {
  async getObjectById<T>(id: number) {
    return { id } as T
  }
}