import { z } from 'zod'
import Sdk from '@1inch/cross-chain-sdk'
import * as process from 'node:process'

const bool = z
    .string()
    .transform((v) => v.toLowerCase() === 'true')
    .pipe(z.boolean())

const ConfigSchema = z.object({
    SRC_CHAIN_RPC: z.string().url(),
    DST_CHAIN_RPC: z.string().url(),
    SRC_CHAIN_CREATE_FORK: bool.default('true'),
    DST_CHAIN_CREATE_FORK: bool.default('true')
})

const fromEnv = ConfigSchema.parse(process.env)

export const config = {
    chain: {
        source: {
            chainId: 84532,
            // url: "https://base-sepolia.g.alchemy.com/v2/0XPjrbBAKRJaSJuy6GN8uKX5uy7YquZV",
            url: fromEnv.SRC_CHAIN_RPC,
            // createFork: fromEnv.SRC_CHAIN_CREATE_FORK,
            // limitOrderProtocol: '0x4B715df6F89624dDb2c6DB70304b494d79531d92', // my deploy
            limitOrderProtocol: '0x9f2C105C9b1843019836889539C9F6993D3aa239', // my deploy2
            wrappedNative: '0x75DBDb60C37A9c776206F2e44D2098054222af65', // my deployed
            ownerPrivateKey: '0x639ed7560cbdde79096973912f5c83de86ba08aef2ce6f673dad5bf0a1663801', // my private key 
            tokens: {
                USDC: {
                    address: '0x6756682b6144018deA5416640A0d0e8783e33F60', // erc20 mock deployed
                    donor: '0x1B150538E943F00127929f7eeB65754f7beB0B6d'
                }
            }
        },
        destination: {
            chainId: 10143,
            // url: "https://monad-testnet.g.alchemy.com/v2/0XPjrbBAKRJaSJuy6GN8uKX5uy7YquZV",
            url: fromEnv.DST_CHAIN_RPC,
            // createFork: fromEnv.DST_CHAIN_CREATE_FORK,
            limitOrderProtocol: '0x1f1259C74c1b6aDe7f57f239F77530AEdC6542B9', // my deployed
            wrappedNative: '0x371DfE8527b4fb1Bd0da3317A7250c17726Aa967', // our deployed 
            ownerPrivateKey: '0x639ed7560cbdde79096973912f5c83de86ba08aef2ce6f673dad5bf0a1663801',
            tokens: {
                USDC: {
                    address: '0xEA2bB31EBb0aee264aba3730C8744d6bD76D37d0', // same native
                    donor: '0x1B150538E943F00127929f7eeB65754f7beB0B6d' // 
                }
            }
        }
    }
} as const

export type ChainConfig = (typeof config.chain)['source' | 'destination']