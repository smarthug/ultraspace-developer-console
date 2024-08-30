// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-smart-npcs',
      title: 'Smart NPCs',
      type: 'item',
      url: '/smart-npcs',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-create-nfts',
      title: 'Create NFTs',
      type: 'item',
      url: '/create-nfts',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-sell-nfts',
      title: 'Sell NFTs',
      type: 'item',
      url: '/sell-nfts',
      icon: icons.BarcodeOutlined
    },
    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/typography',
    //   icon: icons.FontSizeOutlined
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/color',
    //   icon: icons.BgColorsOutlined
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: icons.BarcodeOutlined
    // },
  ]
};

export default utilities;
