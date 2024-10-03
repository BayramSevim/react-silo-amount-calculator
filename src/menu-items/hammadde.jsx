// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I3DCubeScan, DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  I3DCubeScan: I3DCubeScan
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const hammadde = {
  id: 'hammadde',
  title: <FormattedMessage id="hammadde" />,
  type: 'group',
  url: '/hammadde',
  icon: icons.I3DCubeScan
};

export default hammadde;
