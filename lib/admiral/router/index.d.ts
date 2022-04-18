/// <reference types="react" />
interface CreateRoutesConfig {
    withAuth?: boolean;
}
export declare function createRoutesFrom(modules: any, config?: CreateRoutesConfig): () => JSX.Element;
export {};
