const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const TOTAL_TABLES = 120;
const GUESTS_PER_TABLE = 5;
const QR_DIR = path.join(__dirname, 'qrcodes');

if (!fs.existsSync(QR_DIR)) {
    fs.mkdirSync(QR_DIR, { recursive: true });
}

const existingFiles = fs.readdirSync(QR_DIR).filter(file => file.endsWith('.png'));
for (const file of existingFiles) {
    fs.unlinkSync(path.join(QR_DIR, file));
}

(async () => {
    for (let table = 1; table <= TOTAL_TABLES; table++) {
        for (let guest = 1; guest <= GUESTS_PER_TABLE; guest++) {
            const guestId = `Table ${table} Guest ${guest}`;
            const qrUrl = `https://olamiqsamson.github.io/adesam-qr/?table=${table}&guest=${encodeURIComponent(guestId)}`;
            const fileName = path.join(QR_DIR, `Table_${table}_Guest_${guest}.png`);

            await QRCode.toFile(fileName, qrUrl, {
                width: 600,
                margin: 2
            });

            console.log(`Created ${fileName}`);
        }
    }
})();