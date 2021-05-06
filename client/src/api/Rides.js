import $API from "../api/index";

const fetchRides = async () => {
  const { data } = await $API.get("/rides");
  return data;
};
const createRide = async (newRide) => {
  const { data } = await $API.post("/rides", newRide);
  return data;
};
const updateRide = async (id, updatedRide) => {
  const { data } = await $API.patch(`/rides/${id}`, updatedRide);
  return data;
};
const deleteRide = async (id) => {
  await $API.delete(`/rides/${id}`);
  return id;
};

export { fetchRides, createRide, updateRide, deleteRide };
