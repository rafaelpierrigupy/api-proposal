import Application from "../domain/application";

export default class ApplicationRepository {
  public static applications: Map<number, Application[]> = new Map([
    [1, [new Application(1, 2)]],
    [2, [new Application(2, 100)]],
  ]);
}
