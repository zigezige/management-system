import axios from "./request";

// 获取侧边栏数据
export const getMenu = (data) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data
  });
};

// 获取echart数据
export const getData = () => {
  return axios.request({
    url: "/home/getData"
  });
};

// 获取用户列表数据
export const getUser = (params) => {
  return axios.request({
    url: "/user/getUser",
    method: "get",
    params
  });
};
