import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = (newPhone) => axios.post(baseUrl, newPhone);

const getAll = () => axios.get(baseUrl);

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newPhone) => axios.put(`${baseUrl}/${id}`, newPhone);

const phoneService = { create, getAll, remove, update };

export default phoneService;
