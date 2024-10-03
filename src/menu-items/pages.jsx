// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  I24Support,
  MessageProgramming,
  Book,
  Diagram,
  Element,
  Receive,
  Forward,
  HambergerMenu,
  DirectDown,
  Box,
  Layer,
  KeyboardOpen,
  PresentionChart,
  I3Dcube,
  I3DCubeScan,
  ArrowSwapHorizontal,
  Share,
  Chart1
} from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support,
  report: Book,
  product: Diagram,
  element: Element,
  consume: Receive,
  transfer: Forward,
  hamburger: HambergerMenu,
  vakum: DirectDown,
  package: Box,
  silo: Layer,
  equipment: KeyboardOpen,
  trend: PresentionChart,
  malKabul: I3Dcube,
  malCikis: I3DCubeScan,
  transfer: ArrowSwapHorizontal,
  depo: Chart1
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'mamul-silolari',
  title: <FormattedMessage id="mamul-silolari" />,
  type: 'group',
  icon: icons.depo,
  url: '/mamul-silolari'
};

export default pages;
