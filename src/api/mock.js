import Mock from "mockjs";
import homeApi from "./mockData/home.js";
import userApi from "./mockData/user.js";
import permissionApi from "./mockData/permission";

//首页echarts数据
Mock.mock("/home/getData", homeApi.getStatisticalData);

// 用户管理数据
// Mock.mock('/api/user/getUser', userApi.getUserList)
// Mock.mock(/api\/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/user\/add/, "post", userApi.createUser);
Mock.mock(/user\/edit/, "post", userApi.updateUser);
Mock.mock(/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/user\/del/, "post", userApi.deleteUser);

// 权限相关
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
