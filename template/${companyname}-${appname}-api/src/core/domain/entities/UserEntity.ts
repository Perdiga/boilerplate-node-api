/**
 * Represents a User record
 */
export class UserEntity {
  id?: number;
  name: string;
  middleName: string;
  lastName: string;

  constructor (id: number | undefined, name: string) {
    this.id = id;
    this.name = this.getFirstName(name);
    this.middleName = this.getMiddleName(name);
    this.lastName = this.getLastName(name);
  }

  private getFirstName(name: string): string {
    if (name) {
      return name.split(' ')[0];
    }
    return '';
  }

  private getMiddleName(name: string): string {
    if (name) {
      const fullName = name.split(' ');
      return fullName.filter((element: string, index: number): boolean => index > 0 && index < fullName.length - 1).join(' ');
    }
    return '';
  }

  private getLastName(name: string): string {
    if (name) {
      const fullName = name.split(' ');
      return fullName[fullName.length - 1];
    }
    return '';
  }
}
