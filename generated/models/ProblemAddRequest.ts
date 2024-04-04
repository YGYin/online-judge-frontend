/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestCase } from './TestCase';
import type { TestConfig } from './TestConfig';
export type ProblemAddRequest = {
    content?: string;
    res?: string;
    tags?: Array<string>;
    testCase?: Array<TestCase>;
    testConfig?: TestConfig;
    title?: string;
};

