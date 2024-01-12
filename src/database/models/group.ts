import { DB_Group, DB_GroupSchema } from '@/database/schemas/group';
import { nanoid } from '@/utils/uuid';

import { BaseModel } from '../core';

class _GroupModel extends BaseModel<'groups'> {
  constructor() {
    super('groups', DB_GroupSchema);
  }

  async create(group: DB_Group) {
    const id = nanoid();

    return this._add(group, `group-${id}`);
  }

  async findById(id: string) {
    return this.table.get(id);
  }

  async queryAll() {
    return this.table.toArray();
  }

  async delete(id: string) {
    return this.table.delete(id);
  }

  async clear() {
    return this.table.clear();
  }
}

export const GroupModel = new _GroupModel();
