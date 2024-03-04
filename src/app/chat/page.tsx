import { isMobileDevice } from '@/utils/responsive';

import DesktopPage from './(desktop)';
import MobilePage from './(mobile)';
import PersistSetup from './components/PersistSetup';
import SessionHydration from './components/SessionHydration';
import Migration from './features/Migration';

const Page = () => {
  const mobile = isMobileDevice();

  const Page = mobile ? MobilePage : DesktopPage;

  return (
    <>
      <Migration>
        <Page />
      </Migration>
      <SessionHydration />
      <PersistSetup />
    </>
  );
};

export default Page;
