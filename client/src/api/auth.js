import $host from "./index";

const handleResult = async (route, userData) => {
  try {
    const answer = await $host.post(route, userData);
    if (answer.status === 200) {
      localStorage.setItem("profile", JSON.stringify({ ...answer.data }));
      window.location = "/";
      return answer.data;
    } else {
      throw new Error(answer);
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const signUp = async (userData) => {
  handleResult("signUp", userData);
};

export const signIn = async (userData) => {
  handleResult("signIn", userData);
};
