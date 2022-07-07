export const useAuth = () => {
    const me = useState("me", ()=> ({
        me: {}
    }));
    // stateの更新処理
    const setMe = (me) => (user) => {
        me.value = user;
    }

    return {
        me: readonly(me),
        setMe: setMe(me)
    }
}