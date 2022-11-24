import * as lightning from 'lightning';
import LightningAuth from './enums/LightningAuth.js'

class LightningWallet {

  static getLightningRpcNodeAdmin = async ()
  :Promise<lightning.AuthenticatedLnd> => {
    const { lnd } = lightning.authenticatedLndGrpc({
      cert: LightningAuth.TLS,
      macaroon: LightningAuth.Macaroon,
      socket: LightningAuth.Socket,
    });
    // lnd is necessry arg for most of methods
    return lnd as lightning.AuthenticatedLnd;
  }

  static getNodeWalletInfo = async (lnd: lightning.AuthenticatedLnd)
  :Promise<lightning.GetWalletInfoResult> => {
    const wallet : lightning.GetWalletInfoResult = await lightning.getWalletInfo({lnd});
    // wallet of lnd
    return wallet;
  }

  static createInvoice = async (lnd: lightning.AuthenticatedLnd)
  :Promise<lightning.CreateInvoiceResult> => {
    /*
      there's no "address" in lightning network
      only way to transfer is by creating invoice,
      which expires in 72 hours
    */
    const invoice : lightning.CreateInvoiceResult = await lightning.createInvoice({lnd});
    // invoice to show client
    return invoice;
  }

  static createChannel =  async (
    lnd: lightning.AuthenticatedLnd, publicKey: string, channelSize: number)
  :Promise<lightning.OpenChannelResult> => {
    /*
      MyPublicKey = "029a566b8195283ebf34b10ee3e4b687ab618c1a7856a29dd58ba12a63abba7518";
      channelSize must be >= 1000000;
    */
    const channel : lightning.OpenChannelResult = await lightning.openChannel(
      {lnd, local_tokens: channelSize, partner_public_key: publicKey});

    return channel;
  }

}

export default LightningWallet;