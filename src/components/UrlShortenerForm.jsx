import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from "@mui/material";
import { nanoid } from "nanoid";

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([
    { longUrl: "", shortcode: "", validity: 10 }
  ]);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlInput = () => {
    if (urls.length >= 5) return;
    setUrls([...urls, { longUrl: "", shortcode: "", validity: 10 }]);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let valid = true;
    const newEntries = [];

    urls.forEach((url, index) => {
      if (!url.longUrl || !isValidUrl(url.longUrl)) {
        setErrors((prev) => ({
          ...prev,
          [`longUrl-${index}`]: "Invalid URL"
        }));
        valid = false;
      }

      const validity = Number(url.validity);
      if (!validity || validity <= 0) {
        setErrors((prev) => ({
          ...prev,
          [`validity-${index}`]: "Expiry must be greater than 0"
        }));
        valid = false;
      }

      if (valid) {
        const code = url.shortcode.trim() || nanoid(6);
        const now = Date.now();
        const expiresAt = now + validity * 60 * 1000;

        newEntries.push({
          longUrl: url.longUrl.trim(),
          code,
          createdAt: now,
          expiresAt,
          clicks: 0
        });
      }
    });

    if (!valid) return;

    const existing = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    const updatedData = [...existing, ...newEntries];
    localStorage.setItem("shortUrls", JSON.stringify(updatedData));

    setSuccess(true);
    setUrls([{ longUrl: "", shortcode: "", validity: 10 }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit}>
        {urls.map((input, index) => (
          <Box
            key={index}
            mb={3}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
          >
            <Typography variant="subtitle1" gutterBottom>
              URL #{index + 1}
            </Typography>

            <TextField
              fullWidth
              label="Long URL"
              variant="outlined"
              margin="normal"
              value={input.longUrl}
              onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              error={!!errors[`longUrl-${index}`]}
              helperText={errors[`longUrl-${index}`] || ""}
            />

            <TextField
              fullWidth
              label="Shortcode (Optional)"
              variant="outlined"
              margin="normal"
              value={input.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            />

            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              inputProps={{ min: 1 }}
              variant="outlined"
              margin="normal"
              value={input.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
              error={!!errors[`validity-${index}`]}
              helperText={errors[`validity-${index}`] || ""}
            />
          </Box>
        ))}

        {urls.length < 5 && (
          <Button onClick={addUrlInput} sx={{ mb: 2 }}>
            + Add Another URL
          </Button>
        )}

        <Button type="submit" variant="contained" color="primary">
          Shorten URLs
        </Button>
      </form>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          URLs shortened successfully!
        </Alert>
      )}
    </Box>
  );
};

export default UrlShortenerForm;
