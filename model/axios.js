import axios from "axios";

export const Headers = {
  language: "zh_CN",
  "Content-Type": "application/json",
};

const RequestOptions = {
  headers: Headers,
  timeout: 30000,
  timeoutErrorMessage: "网络请求超时",
  withCredentials: false,
};

// axios.interceptors.request.use((config) => {
  
//     // 可能某些请求是不需要设置loading的, 就直接设置这个参数为true就好了
//     const RequestConfig = { ...config, ...RequestOptions };

//     // 设置请求头
//     RequestConfig.headers = {
//       ...RequestConfig.headers,
//       ...Headers,
//     };
//     return RequestConfig;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 响应拦截
axios.interceptors.response.use(({ data, status }) => {
    const { code = "", message = "" } = data;
    if (status && status === 401) {
    //   redirectSSO();
    }
    return data
  },
  (error) => {
    console.error("[error]:", error);
  }
);

export default axios;