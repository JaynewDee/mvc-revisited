const loginFormHandler = async function (event) {
  event.preventDefault();

  const passwordEl = document.querySelector("#password-input-login");

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      password: passwordEl.value
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (response.ok) {
    document.location.replace("/create");
  } else {
    console.log(`FAILED TO LOGIN`);
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
