import axios from "axios";

const TOKEN = "cn2bispr01qmg1p50pcgcn2bispr01qmg1p50pd0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
