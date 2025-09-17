const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/auth/signup`,
    method: "post"
  },
  login: {
    url: `${backendDomain}/api/auth/login`,
    method: "post"
  }
};

export default SummaryApi;
