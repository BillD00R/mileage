import $host from "./index";

const handleResult = async (route, userData, history) => {
  const answer = await $host.post(route, userData);
  if (answer.status === 200) {
    localStorage.setItem("profile", JSON.stringify({ ...answer?.data }));
    history.push("/");
    return answer?.data;
  } else {
    throw new Error(answer);
  }
};

export const signUp = async (userData, history) => {
  handleResult("signIn", userData, history);
};

export const signIn = async (userData, history) => {
  handleResult("signIn", userData, history);
};
