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
      id: 'util-manage-nfts',
      title: 'Manage NFTs',
      type: 'item',
      url: '/manage-nfts',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-upload-to-ipfs',
      title: 'Upload to IPFS',
      type: 'item',
      url: '/upload-to-ipfs',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-manage-ipfs',
      title: 'Manage IPFS',
      type: 'item',
      url: '/manage-ipfs',
      icon: icons.BarcodeOutlined
    }
    
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
