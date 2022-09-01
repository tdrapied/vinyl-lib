import { HTTP } from "@/config/http-common";

export default {
  async me() {
    return HTTP.get("/auth/me")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
};
