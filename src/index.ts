import dotenv from "dotenv";
dotenv.config();
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import { providers, Wallet } from "ethers";


const WALLET_PRIVATE_KEY = "mom select hobby trip cherry around clever pact require burger thumb genuine";


const CHAIN_ID = 5;

const provider = new providers.InfuraProvider(CHAIN_ID);
const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";

const wallet = Wallet.fromMnemonic(WALLET_PRIVATE_KEY);

const GWEI = 10n ** 9n;
const ETHER = 10n ** 18n;

async function main() {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT)

    provider.on('block', async(blockNumber) => {
        const bundleSubmitResponse = await flashbotsProvider.sendBundle([{
            transaction: {
                chainId: CHAIN_ID,
                type: 2,
                value: ETHER / 100n * 3n,
                gasLimit: 50000,
                data: "0x1249c58b",
                maxFeePerGas: GWEI * 3n,
                maxPriorityFeePerGas: GWEI * 2n,
                to: "0x20EE855E43A7af19E407E39E5110c2C1Ee41F64D"
            },
            signer: wallet
        }], blockNumber + 1);

        //console.log(bundleSubmitResponse);

        if('error' in bundleSubmitResponse) {
            console.error(bundleSubmitResponse.error.message);
            return;
        }

        console.log(await bundleSubmitResponse.simulate());
    })
}

main();