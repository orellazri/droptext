import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPage = () => {
  const { idAndKey } = useParams();

  const id = idAndKey.split("$")[0];
  const key = idAndKey.split("$")[1];

  useEffect(async () => {
    const result = await axios.get("/" + id);
    console.log(result.data);
  }, []);

  return <>Hi!</>;
};

export default ViewPage;
