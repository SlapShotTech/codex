import express from 'express';
import { exec } from 'child_process';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.post('/api/run', (req, res) => {
  const { command } = req.body as { command: string };
  if (!command) {
    res.status(400).json({ error: 'Missing command' });
    return;
  }
  exec(`codex ${command}`, { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.use(express.static('.'));

const port = 3000;
app.listen(port, () => {
  console.log(`Codex Web UI running at http://localhost:${port}`);
});
