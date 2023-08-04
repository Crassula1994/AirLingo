import instance from "./instance";
import processApiResponse from "@/utils/api";

const getConcurrentUser = async ({ responseFunc }) => {
    try {
        const response = await instance.get(`/api/matching/concurrent-users`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postMatching = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(`/api/matching`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postOpenviduToken = async ({ responseFunc, data }) => {
    if (!("sessionId" in data)) return {};
    try {
        const response = await instance.post(`/matching/${data.sessionId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export { getConcurrentUser, postMatching, postOpenviduToken };
