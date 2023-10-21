import { useState } from "react";
import axios from "axios";

export function useRequest({ url, method = "get", body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  async function doRequest() {
    setErrors(null);

    try {
      const data = (await axios[method](url, body)).data;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return {
    doRequest,
    errors,
  };
}
