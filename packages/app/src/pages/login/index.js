import React from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import BackendURL from "../../constants/api-url";
import { login as loginAction } from "../../redux/actions/auth";
import LoadingButton from "../../components/loading-button";
import Header from "../../components/header";
import Footer from "../../components/footer";

import "./style.css";

function Login() {
  // This state is used to indicate to the user when the login is happening though a Spinner.
  // See the `LoadingButton` component below in the return statement.
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    // Get the value of both inputs
    const email = event.target.email.value.trim().toLowerCase();
    const password = event.target.password.value;

    // Validation
    if (!email) return toast.error("Você deve fornecer um e-mail");
    if (!password) return toast.error("Você deve fornecer uma senha");
    if (password.length < 8)
      return toast.error("Sua senha deve ter no mínimo 8 caracteres");

    try {
      setIsLoggingIn(true); // Activates Spinner
      const action = await loginAction(email, password); // Makes the actual request
      dispatch(action); // Sends the response to Redux
    } catch (e) {
      // `catch` won't do anything because the API should handle network-related errors.
      console.error(e);
    } finally {
      setIsLoggingIn(false); // Deactivates Spinner
    }
  }

  return (
    <div className="login-page-container">
      <Header />
      <main className="main-container">
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <label>
            <p>E-mail</p>
            <input name="email" />
          </label>
          <label>
            <p>Senha</p>
            <input type="password" name="password" />
          </label>
          <LoadingButton
            className="form-button login"
            isLoading={isLoggingIn}
            type="submit"
          >
            Entrar
          </LoadingButton>
          {/* <a className="form-button login-usp" href={BackendURL + '/auth'}>
						Ou entrar com Login USP
					</a> */}
          {/* Links are used instead of buttons for SPA navigation */}
          <Link className="form-button forgot-password" to="/reset-password">
            Esqueci minha senha
          </Link>
          <p>
            Não tem conta? <Link to="/signup">Crie uma agora!</Link>
          </p>
        </form>
        <aside>
          Obrigado por se interessar no nosso evento! <br /> <br />A Semcomp é
          100% construída e pensada por alunos da{" "}
          <strong>Universidade de São Paulo, do campus São Carlos</strong>, dos
          cursos de{" "}
          <strong>Sistemas de informação e Ciências da Computação</strong>. Ela
          ocorre todo ano no
          <strong>
            {" "}
            ICMC - Instituto de Ciências Matemáticas e Computação
          </strong>
          , um evento presencial cheio de palestras, minicursos, aprendizado e
          muita comida.
          <br />
          <br />
          Infelizmente por conta da pandemia, não pudemos realizar o evento
          presencial e estamos nos reinventando com muito empenho para ainda
          trazer a Semcomp pertinho de você! Esperamos que todos vocês gostem e
          aguardem para mais informações. <br />
          <br />
          Com carinho, Equipe Semcomp!
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Login;