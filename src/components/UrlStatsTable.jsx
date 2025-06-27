import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const UrlStatsTable = () => {
  const [showExpired, setShowExpired] = useState(false);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setUrls(stored);
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleExportLogs = () => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    if (!logs.length) return;

    const headers = Object.keys(logs[0]).join(",");
    const rows = logs.map(log =>
      Object.values(log).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "logs.csv";
    a.click();
  };

  const getCountdown = (expiresAt) => {
    const msLeft = expiresAt - Date.now();
    if (msLeft <= 0) return "Expired";

    const mins = Math.floor(msLeft / (1000 * 60));
    const secs = Math.floor((msLeft % (1000 * 60)) / 1000);
    return `${mins}m ${secs}s`;
  };

  const filteredUrls = urls.filter(entry =>
    showExpired ? true : entry.expiresAt > Date.now()
  );

  return (
    <Box className="container">
      <Typography variant="h5" gutterBottom>
        Shortened URL Statistics
      </Typography>

      <Button onClick={() => setShowExpired(!showExpired)} sx={{ mb: 2 }}>
        {showExpired ? "Hide Expired" : "Show Expired"}
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Expires In</TableCell>
              <TableCell className="qr-cell">QR Code</TableCell>
              <TableCell className="copy-cell">Copy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUrls.map((entry, index) => {
              const shortUrl = `${window.location.origin}/short/${entry.code}`;
              return (
                <TableRow key={index}>
                  <TableCell>{entry.longUrl}</TableCell>
                  <TableCell>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                      {shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>{entry.clicks}</TableCell>
                  <TableCell>{getCountdown(entry.expiresAt)}</TableCell>
                  <TableCell className="qr-cell">
                    <QRCodeCanvas value={shortUrl} size={64} />
                  </TableCell>
                  <TableCell className="copy-cell">
                    <IconButton onClick={() => handleCopy(shortUrl)} size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Box mt={3}>
        <Button variant="outlined" onClick={handleExportLogs}>
          Download Logs (.csv)
        </Button>
      </Box>
    </Box>
  );
};

export default UrlStatsTable;
