import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

import { Networks, Wallet, XRPLClient } from '@nice-xrpl/react-xrpl';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <XRPLClient network={Networks.Testnet}>
      <Wallet seed="sEdTbpveZCMG7HCxTF2mk439tWSkHUS">
        <ThemeCustomization>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </ThemeCustomization>
      </Wallet>
    </XRPLClient>
  );
}
