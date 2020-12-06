import React from 'react';
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import { PASSWORD_RESET } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyParam = params.get('key');
    const loginParam = params.get('login');
    if (keyParam) setKey(keyParam);
    if (loginParam) setLogin(loginParam);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value
    });
    const { response } = await request(url, options);
    if (response.ok) navigate('/login');
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password" {...password} />
        <Button>Resetar</Button>
      </form>
    </section>
  );
};

export default LoginPasswordReset;
