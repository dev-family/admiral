declare type CheckAuth = (params?: any, logoutOnFailure?: boolean, redirectTo?: string) => Promise<any>;
declare const useCheckAuth: () => CheckAuth;
export default useCheckAuth;
