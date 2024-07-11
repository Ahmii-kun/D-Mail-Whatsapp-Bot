import express from 'express';
import { join } from 'path';
import path from 'path';

const __dirname = path.resolve();

export default class Host {
    constructor(client) {
        this.client = client;
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.startServer();
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use('/', express.static(this.path));
    }

    setupRoutes() {
        this.app.get('/wa/qr', async (req, res) => {
            const { session } = req.query;

            if (!session || !this.client || this.client.config.session !== session) {
                return res.status(404).json({ error: 'Invalid Session' });
            }
            if (!this.client.QR) {
                let text = this.client.condition === 'connected'
                    ? 'You are already connected to WhatsApp'
                    : 'QR not generated';
                return res.status(404).json({ error: text });
            }

            res.status(200).contentType('image/png').send(this.client.QR);
        });

        this.app.get('/wa/code', async (req, res) => {
            const { phoneNumber } = req.query;

            if (this.client.condition === 'connected') {
                return res.status(404).json({ error: 'You are already connected to WhatsApp' });
            }
            if (!phoneNumber) {
                return res.status(400).json({ error: 'Phone number is required' });
            }

            try {
                let code = await this.client.requestPairingCode(phoneNumber);
                res.status(200).json({ code });
            } catch (error) {
                res.status(500).json({ error: 'Failed to get code' });
            }
        });

        this.app.all('*', (req, res) => res.sendStatus(404));
    }

    startServer() {
        const port = this.client.config.PORT;
        this.app.listen(port, () => {
            this.client.log(`Server started on PORT: ${port}`);
        });
    }

    path = path.join(__dirname, 'public');
}
