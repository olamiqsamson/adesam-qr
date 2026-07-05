const QRCode = require('qrcode');

const TOTAL_TABLES = 5;
const CHAIRS_PER_TABLE = 8;

(async () => {
    for (let table = 1; table <= TOTAL_TABLES; table++) {

        for (let chair = 1; chair <= CHAIRS_PER_TABLE; chair++) {

            const guestId = `ADESAM Table ${table} Chair ${chair}`;
            const qrUrl = `https://olamiqsamson.github.io/adesam-qr/?table=${table}&chair=${chair}&guest=${guestId}`;
            
            const fileName = `qrcodes/Table_${table}_Chair_${chair}.png`;

            await QRCode.toFile(fileName, qrUrl, {
                width: 600,
                margin: 2
            });

        console.log(`Created ${fileName}`);
    }
}
})();