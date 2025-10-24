import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const { account_code } = useParams(); // Get account_code from URL
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
}
