import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.resolve(process.cwd(), 'data', 'leads.json');

// Ensure data folder exists
const dataDir = path.dirname(LEADS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readLeadsFromFile(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

function writeLeadsToFile(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads file:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints
  app.get('/api/leads', (req, res) => {
    const leads = readLeadsFromFile();
    res.json({ success: true, count: leads.length, leads });
  });

  app.post('/api/leads/buy', (req, res) => {
    const lead = req.body;
    if (!lead || !lead.customerName || !lead.whatsappNumber) {
      return res.status(400).json({ success: false, error: 'Name and WhatsApp number are required.' });
    }
    const current = readLeadsFromFile();
    const updated = [lead, ...current];
    writeLeadsToFile(updated);
    res.json({ success: true, referenceId: lead.referenceId, lead });
  });

  app.post('/api/leads/sell', (req, res) => {
    const lead = req.body;
    if (!lead || !lead.sellerName || !lead.whatsappNumber || !lead.make) {
      return res.status(400).json({ success: false, error: 'Vehicle make, seller name, and WhatsApp number are required.' });
    }
    const current = readLeadsFromFile();
    const updated = [lead, ...current];
    writeLeadsToFile(updated);
    res.json({ success: true, referenceId: lead.referenceId, lead });
  });

  app.post('/api/leads/agent', (req, res) => {
    const lead = req.body;
    if (!lead || !lead.contactPerson || !lead.whatsappNumber) {
      return res.status(400).json({ success: false, error: 'Contact person and WhatsApp number are required.' });
    }
    const current = readLeadsFromFile();
    const updated = [lead, ...current];
    writeLeadsToFile(updated);
    res.json({ success: true, referenceId: lead.referenceId, lead });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'AutoAce Zed Backend', time: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AutoAce Zed server running on http://localhost:${PORT}`);
  });
}

startServer();
