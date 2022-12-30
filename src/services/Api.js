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

  async logout() {
    return HTTP.get("/auth/logout").catch(() => {
      // Do nothing
    });
  },

  async vinylList(params = {}) {
    return HTTP.get("/vinyls", {
      params,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error while fetching vinyls");
        }
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
};
