export const GoogleLogin = () => {
  const onButtonClick = () => {

    const popup = window.open("http://localhost:8082/oauth2/authorization/google", "oauth", "width=600,height=700");

    window.addEventListener("message", (ev) => {
      if (ev.origin !== "http://localhost:8082") return; // validate origin
      const { token } = ev.data || {};
      if (token) {
        console.log("got token", token);
        if (ev.data) {
          fetch('http://localhost:8082/auth/me', { credentials: 'include' }).then(r => r.json()).then(user => console.log(user));
        }
      }
    });
  }
  
  return (
    <div>
      <button onClick={onButtonClick}>Login with google!</button>
    </div>
  );
}; 