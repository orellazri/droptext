import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as crypto from "../utils/crypto";

const ViewPage = () => {
  const [loading, setLoading] = useState(true);
  const [decrypted, setDecrypted] = useState("");

  const { idAndKey } = useParams();

  const id = idAndKey.split("$")[0];
  const key = idAndKey.split("$")[1];

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("/" + id);
        const encrypted = result.data.content;

        const decryptedContent = crypto.decrypt(encrypted, key);
        if (!decryptedContent.trim()) {
          throw new Error("Could not decrypt content");
        }

        setDecrypted(decryptedContent);
      } catch (e) {
        console.log(e);
        setDecrypted("Could not decrypt content. Perhaps your URL is wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const content = loading ? <>Loading...</> : <>{decrypted}</>;

  return <>{content}</>;
};

export default ViewPage;
