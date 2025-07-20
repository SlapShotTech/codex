import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  async function runCommand() {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    const data = await res.json();
    setOutput(data.output);
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Codex Web UI
      </Typography>
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          label="Codex command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button variant="contained" onClick={runCommand}>
          Run
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Output</Typography>
        <Box
          component="pre"
          p={2}
          sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}
        >
          {output}
        </Box>
      </Box>
    </Container>
  );
}
