import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getError } from '../utils/error';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title="Entrar">
      <div className="w-full">
        <div className='card mx-auto w-fit'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="p-5 rounded-lg min-w-fit w-1/3 mx-auto"
          >
            <div className="flex flex-row items-center justify-center">
              <p className="text-lg mb-0 mr-4">Entre com:</p>
              <button
                type="button"
                className="rounded-full border-2 border-gray-200 p-2"
              >
                <FcGoogle className="text-3xl" />
              </button>
            </div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Ou</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className='flex flex-col w-full'>
                  <input
                    className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full"
                    type="email"
                    placeholder="E-mail"
                    {...register('email', {
                      required: "Por favor, digite seu e-mail",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_]+.[a-zA-Z0-9-.]+$/i,
                        message: "Por favor, digite um email válido",
                      }
                    })}
                    autoFocus
                  />
                  {errors.email && (<div className='text-red-500 text-sm'>{errors.email.message}</div >)}
                </div>
                <div className="mx-2 z-10 rounded-full p-2 flex">
                  <HiOutlineMail className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className='flex flex-col w-full'>
                  <input
                    className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    {...register('password', {
                      required: "Por favor, digite sua senha",
                      minLength: { value: 5, message: 'A senha deve ter mais de 5 caracteres' }
                    })}
                    autoFocus
                  />
                  {errors.password && (<div className='text-red-500 text-sm'>{errors.password.message}</div >)}
                </div>
                <div
                  className="cursor-pointer mx-2 z-10 rounded-full p-2 flex"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-2xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="block justify-center w-fit mx-auto text-xl rounded bg-[#b02222] px-12 py-2 font-medium text-white hover:bg-[#002776]"
            >
              Entrar
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <Link
              href={`/register?redirect=${redirect || '/'}`}
              className="text-sm hover:text-blue-500"
            >
              <p className="text-sm">Não possui uma conta?</p>
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
