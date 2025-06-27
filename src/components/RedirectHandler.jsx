import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logEvent } from "../utils/logger";

const RedirectHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    const entry = list.find((item) => item.code === code);

    if (!entry) {
      alert("Short URL not found.");
      navigate("/");
      return;
    }

    if (Date.now() > entry.expiresAt) {
      alert("Link expired.");
      navigate("/");
      return;
    }

    // Count click
    entry.clicks += 1;
    localStorage.setItem("shortUrls", JSON.stringify(list));

    logEvent("REDIRECT", { code, longUrl: entry.longUrl });

    window.location.href = entry.longUrl;
  }, [code, navigate]);

  return null;
};

export default RedirectHandler;
