/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProblemVO } from './ProblemVO';
import type { TestInfo } from './TestInfo';
import type { UserVO } from './UserVO';
export type ProblemSubmitVO = {
    code?: string;
    createTime?: string;
    id?: number;
    language?: string;
    problemId?: number;
    problemVO?: ProblemVO;
    testInfo?: TestInfo;
    testStatus?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

