interface State {
    loading: boolean;
    loaded: boolean;
    authenticated?: boolean;
}
declare const useAuthState: (params?: any) => State;
export default useAuthState;
