import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Update with the correct import path
import { nanoid } from '@/utils/uuid';
import * as uuidUtils from '@/utils/uuid';

import { GroupModel } from '../group';

describe('GroupModel', () => {
  let groupData: { name: string };

  beforeEach(() => {
    groupData = {
      name: 'Test Group',
    };
  });

  afterEach(async () => {
    await GroupModel.clear();
  });

  describe('create', () => {
    it('should create a group and return the new group with an id', async () => {
      const spy = vi.spyOn(uuidUtils, 'nanoid');
      const result = await GroupModel.create(groupData);

      expect(spy).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
      expect(result.id).toMatch(/^group-/);
      expect(result).toMatchObject(groupData);

      spy.mockRestore();
    });
  });

  describe('findById', () => {
    it('should find a group by id', async () => {
      const createdGroup = await GroupModel.create(groupData);
      const foundGroup = await GroupModel.findById(createdGroup.id);

      expect(foundGroup).toMatchObject(groupData);
      expect(foundGroup).toHaveProperty('id', createdGroup.id);
    });

    it('should return undefined if the group does not exist', async () => {
      const nonExistentId = 'group-non-existent';
      const foundGroup = await GroupModel.findById(nonExistentId);

      expect(foundGroup).toBeUndefined();
    });
  });

  describe('queryAll', () => {
    it('should return an array of all groups', async () => {
      await GroupModel.create(groupData);
      await GroupModel.create({ name: 'Another Test Group' });

      const groups = await GroupModel.queryAll();

      expect(groups).toHaveLength(2);
      expect(groups[0]).toMatchObject(groupData);
      expect(groups[1]).toMatchObject({ name: 'Another Test Group' });
    });
  });

  describe('delete', () => {
    it('should delete a group by id', async () => {
      const createdGroup = await GroupModel.create(groupData);
      await GroupModel.delete(createdGroup.id);

      const foundGroup = await GroupModel.findById(createdGroup.id);
      expect(foundGroup).toBeUndefined();
    });

    it('should not throw if the group does not exist', async () => {
      const nonExistentId = 'group-non-existent';
      await expect(GroupModel.delete(nonExistentId)).resolves.not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all group records', async () => {
      await GroupModel.create(groupData);
      await GroupModel.create({ name: 'Another Test Group' });

      await GroupModel.clear();
      const groups = await GroupModel.queryAll();

      expect(groups).toHaveLength(0);
    });
  });
});
