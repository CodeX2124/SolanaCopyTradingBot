import * as dotenv from 'dotenv'
import { Connection, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

dotenv.config();

const connection = new Connection(process.env.URL || "", 'confirmed');
try {    
    connection.onLogs(new PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM"), 
        async (logs) => {
            const signature = logs.signature;
            const transaction = await connection.getParsedTransaction(signature, {maxSupportedTransactionVersion: 0});
            const accountKeys = transaction?.transaction.message.accountKeys;
            accountKeys?.forEach((e) => {
                console.log(e);
            })                 
        },
        "confirmed"
    );
} catch (error) {
    console.log(error);    
}
