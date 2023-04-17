import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { HiOutlineUserAdd, HiOutlineMail } from 'react-icons/hi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { SlGraduation } from 'react-icons/sl';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';

export default function RegisterScreen() {
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
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const [userType, setUserType] = useState('');
  // eslint-disable-next-line no-unused-vars
  const userRegisterRA = watch(userType);


  const submitHandler = async ({ registerId, name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        registerId,
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        registerId,
        name,
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
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  return (
    <Layout title="Criar conta">
      <div className="w-full">
        <div className='card mx-auto w-fit'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className=" p-6 rounded-lg min-w-fit w-1/3 mx-auto"
          >
            <div className="flex flex-row items-center justify-center">
              <p className="text-lg mb-5 mr-4">Cadastre-se:</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className='flex flex-col w-full'>
                  <select
                    className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full"
                    {...register('userType', {
                      required: "Por favor, selecione seu tipo de usuário",
                    })}
                    autoFocus
                    placeholder='Professor ou Aluno?'
                  >
                    <optgroup value="" disabled label={`Professor ou Aluno?`}></optgroup>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                  </select>
                  {errors.userType && (<div className='text-red-500 text-sm'>{errors.userType.message}</div>)}

                  {watch('userType') !== 'professor' && (
                    <input
                      className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full mt-4"
                      type="text"
                      placeholder="RA"
                      {...register('registerId', {
                        required: "Por favor, digite seu RA",
                        minLength: { value: 7, message: "Seu Registro de Aluno (RA) precisa ter pelo menos 7 dígitos" },
                        maxLength: { value: 7, message: "Seu Registro de Aluno (RA) precisa ter no máximo 7 dígitos" }
                      })}
                    />
                  )}
                  {errors.registerId && (<div className='text-red-500 text-sm'>{errors.registerId.message}</div>)}
                </div>
                <div className="mx-2 z-10 rounded-full p-2 flex">
                  <SlGraduation className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className='flex flex-col w-full'>
                  <input
                    className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full"
                    type="text"
                    placeholder="Nome"
                    {...register('name', {
                      required: "Por favor, digite seu nome",
                      minLength: { value: 3, message: "Seu nome precisa ter pelo menos 3 caracteres" }
                    })}
                    autoFocus
                  />
                  {errors.name && (<div className='text-red-500 text-sm'>{errors.name.message}</div >)}

                </div>
                <div className="mx-2 z-10 rounded-full p-2 flex">
                  <HiOutlineUserAdd className="text-2xl" />
                </div>
              </div>
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
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[!@#$%^&*()\-__+.]).*$/i,
                        minLength: { value: 5, message: 'A senha deve ter pelo menos 5 dígitos' },
                        message: "A senha deve incluir pelo menos uma letra e pelo menos um caractere especial.",
                      },
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
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className='flex flex-col w-full'>
                  <input
                    className="border text-xl border-gray-400 px-5 py-1 rounded-md w-full"
                    placeholder="Confirme sua senha"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    {...register("passwordIsValid", {
                      required:
                        "Por favor, digite a sua senha novamente para confirmação.",
                      validate: (value) => value === getValues("passwordIsValid"),
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[!@#$%^&*()\-__+.]).*$/i,
                        minLength: { value: 5, message: 'A senha deve ter pelo menos 5 dígitos' },
                        message: "A senha deve incluir pelo menos uma letra e um caractere especial.",
                      },
                    })}
                    id="passwordIsValid"
                    autoFocus
                  />
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-600">
                      {errors.passwordIsValid.message}
                    </div>
                  )}
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-600">
                      As senhas digitadas não são iguais!
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer mx-2 z-10 rounded-full p-2 flex"
                  onClick={togglePasswordConfirm}
                >
                  {showPasswordConfirm ? (
                    <AiOutlineEye className="text-2xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl" />
                  )}
                </div>
              </div>
            </div>
            <button
              className="block justify-center w-fit mx-auto text-xl rounded bg-[#b02222] px-12 py-2 font-medium text-white hover:bg-[#002776]"
            >
              Cadastrar-se
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <p className="text-sm">Possui uma conta?</p>
            <Link
              href="/login"
              className="text-sm hover:underline hover:text-blue-500"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
