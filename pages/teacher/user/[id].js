import axios from "axios";
import { getError } from "../../../utils/error";
import Layout from "../../../components/Layout";
import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

export default function AdminUserEditScreen() {
  const router = useRouter();
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/teacher/users/${userId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("registerId", data.registerId)
        setValue("email", data.email);
        setValue("isTeacher", data.isTeacher);
        setValue("password", data.password);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userId, setValue, successDelete]);
  const submitHandler = async ({ registerId, name, email, isTeacher, password, }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/teacher/users/${userId}`, {
        name,
        email,
        isTeacher,
        registerId,
        password,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("As informações do usuário foram atualizadas com sucesso!");
      router.push("/teacher/users");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const deleteHandler = async (userId) => {
    if (!window.confirm("Você tem certeza?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/teacher/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Usuário deletado com sucesso!");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
    router.push("/teacher/users")
  };

  return (
    <Layout title={`Editar usuário ${userId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-4">
          <h1 className="mb-4 text-center py-2 card text-blue-700 text-2xl">{`Editar Usuário: ${userId}`}</h1>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto text-xl p-10 w-full card "
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="flex justify-between gap-5">
                <div className="mb-4 w-full">
                  <label htmlFor="name" className="text-2xl text-blue-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                    id="name"
                    autoFocus
                    {...register("name", {
                      required: "Por favor, digite seu nome",
                      minLength: {
                        value: 3,
                        message: "Por favor, digite um nome válido",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-600">{errors.name.message}</div>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="registerId" className="text-2xl text-blue-700">
                    RA
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                    id="registerId"
                    autoFocus
                    {...register('registerId', {
                      required: "Por favor, digite seu RA",
                      minLength: { value: 7, message: "Seu Registro de Aluno (RA) precisa ter pelo menos 7 dígitos" },
                      maxLength: { value: 7, message: "Seu Registro de Aluno (RA) precisa ter no máximo 7 dígitos" }
                    })}
                  />
                  {errors.registerId && (
                    <div className="text-red-600">{errors.registerId.message}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="mb-4 flex flex-col">
                  <label htmlFor="isTeacher" className="text-2xl text-blue-700">
                    Torná-lo Professor
                  </label>
                  <select
                    type="boolean"
                    id="isTeacher"
                    {...register("isTeacher")}
                  >
                    <option id="isTeacher" value={false}>Não</option>
                    <option id="isTeacher" value={true}>Sim</option>
                  </select>
                  {errors.isTeacher && (
                    <div className="text-red-600">
                      {errors.isTeacher.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-blue-800  text-2xl">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                  id="email"
                  {...register("email", {
                    required: "Por favor, digite seu e-mail",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Por favor, digite um e-mail válido",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="hidden">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control hidden w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-4 flex justify-between">
                <button
                  onClick={() => `/admin/users`}
                  className="primary-button bg-white border border-solid border-gray-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="bg-blue-800 hover:bg-red-600 text-white border border-solid border-gray-300 w-25"
                  onClick={() => deleteHandler(userId)}
                >
                  Deletar
                </button>
                <button
                  disabled={loadingUpdate}
                  className="primary-button bg-white border border-solid border-gray-300"
                >
                  {loadingUpdate ? "Carregando" : "Atualizar"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout >
  );
}

AdminUserEditScreen.auth = { adminOnly: true };
