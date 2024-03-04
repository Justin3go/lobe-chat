// 检查存储是否已持久化
export const isStoragePersisted = () => {
  return navigator.storage && navigator.storage.persisted
    ? navigator.storage.persisted()
    : undefined;
};

// 尝试将存储转换为持久化存储
export const persist = () => {
  return navigator.storage && navigator.storage.persist ? navigator.storage.persist() : undefined;
};

// 查询可用磁盘配额
export const showEstimatedQuota = async () => {
  if (navigator.storage && navigator.storage.estimate) {
    const estimation = await navigator.storage.estimate();
    console.log(`Quota: ${estimation.quota}`);
    console.log(`Usage: ${estimation.usage}`);
  } else {
    console.error('StorageManager not found');
  }
};

export const persistSetup = async () => {
  const isPersisted = await isStoragePersisted();
  if (isPersisted) {
    console.log('Storage is successfully persisted.');
  } else {
    console.log('Storage is not persisted.');
    console.log('Trying to persist..:');
    // 尝试将存储转换为持久化存储
    if (await persist()) {
      console.log('We successfully turned the storage to be persisted.');
    } else {
      console.log('Failed to make storage persisted');
    }
  }
  // 显示可用磁盘配额
  await showEstimatedQuota();
};

export const tryPersistWithoutPromtingUser = async () => {
  if (!navigator.storage || !navigator.storage.persisted) {
    return 'never';
  }
  let persisted = await navigator.storage.persisted();
  if (persisted) {
    return 'persisted';
  }
  if (!navigator.permissions || !navigator.permissions.query) {
    return 'prompt'; // It MAY be successful to prompt. Don't know.
  }
  const permission = await navigator.permissions.query({
    name: 'persistent-storage',
  });
  if (permission.state === 'granted') {
    persisted = await navigator.storage.persist();
    if (persisted) {
      return 'persisted';
    } else {
      throw new Error('Failed to persist');
    }
  }
  if (permission.state === 'prompt') {
    return 'prompt';
  }
  return 'never';
};
