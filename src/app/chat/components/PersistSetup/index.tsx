'use client';

import { useEffect } from 'react';

import { tryPersistWithoutPromtingUser } from '@/utils/persist';

const initStoragePersistence = async () => {
  const persist = await tryPersistWithoutPromtingUser();
  switch (persist) {
    case 'never': {
      console.log('Not possible to persist storage');
      break;
    }
    case 'persisted': {
      console.log('Successfully persisted storage silently');
      break;
    }
    case 'prompt': {
      console.log('prompt...');
      // 显示确认弹窗
      if (confirm('您确定要执行这个操作吗？')) {
        // 如果用户点击确定，执行以下代码
        console.log('操作已确认');
        const persisted = await navigator.storage.persisted();
        console.log('persisted:', persisted);
        // 在这里添加您要执行的操作
      } else {
        // 如果用户点击取消，执行以下代码
        console.log('操作已取消');
      }

      break;
    }
  }
};

const PersistSetup = () => {
  useEffect(() => {
    initStoragePersistence();
  }, []);

  return null;
};

export default PersistSetup;
