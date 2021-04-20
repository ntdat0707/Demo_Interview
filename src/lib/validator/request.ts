// import axios from 'axios';

// interface IHeaders {
//   [name: string]: string;
// }
// interface IRequestOptions {
//   url: string;
//   method: 'get' | 'post' | 'put' | 'delete';
//   data?: any;
//   headers?: IHeaders;
//   params?: any;
// }

// interface IResponse {
//   status: number;
//   headers: IHeaders;
//   response: {
//     success: boolean;
//     data?: any;
//     errors?: any;
//     message?: string;
//   };
// }

// const request = async (options: IRequestOptions): Promise<IResponse> => {
//   try {
//     const rs = await axios(options);
//     return {
//       status: rs.status,
//       headers: rs.headers,
//       response: rs.data,
//     };
//   } catch (e) {
//     if (e.response) {
//       return {
//         status: e.response.status,
//         headers: e.response.headers,
//         response: e.response.data,
//       };
//     } else {
//       throw e;
//     }
//   }
// };
