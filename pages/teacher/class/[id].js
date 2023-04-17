import axios from "axios";
import { getError } from "../../../utils/error";
import Layout from "../../../components/Layout";
import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiCloseCircleLine } from "react-icons/ri";

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

export default function AdminClassEditScreen() {
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [createdBy, setCreatedBy] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState(0);
  const [team, setTeam] = useState([]);
  const [group, setGroup] = useState([]);
  const router = useRouter();
  const { query } = useRouter();
  const classId = query.id;
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
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/teacher/classes/${classId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("createdBy", data.createdBy);
        setValue("className", data.className);
        setValue("startHour", data.startHour)
        setValue("endHour", data.endHour)
        setValue("keyWords", data.keyWords);
        setValue("team", data.team);
        setValue("group", data.group);
        setStartHour("startHour", data.startHour);
        setEndHour("endHour", data.endHour);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [classId, setValue, successDelete]);

  const submitHandler = async ({ createdBy, className, startHour, endHour, keyWords, team, group }) => {
    try {
      const timeInMinutes = subtractTime(startHour, endHour);
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/teacher/classes/${classId}`, {
        createdBy,
        className,
        startHour,
        endHour,
        keyWords,
        team,
        group,
        time: timeInMinutes,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("As informações do matéria foram atualizadas com sucesso!");
      router.push("/teacher/classes");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const deleteHandler = async (classId) => {
    if (!window.confirm("Você tem certeza?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/teacher/classes/${classId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Matéria excluída com sucesso!");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
    router.push("/teacher/classes");
  };

  function subtractTime(start, end) {
    const [startHour, startMinutes] = start.split(":");
    const [endHour, endMinutes] = end.split(":");

    const startInMs = (Number(startHour) * 60 + Number(startMinutes)) * 60 * 1000;
    const endInMs = (Number(endHour) * 60 + Number(endMinutes)) * 60 * 1000;
    const diffInMs = endInMs - startInMs;
    const diffInMinutes = Math.floor(diffInMs / (60 * 1000));

    return diffInMinutes;
  }

  console.log(team);
  console.log(group);
  return (
    <Layout title={`${classId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-4">
          <h1 className="mb-4 text-center uppercase font-extrabold py-2 card text-[#b02222] text-2xl">{`Editar Matéria: ${classId}`}</h1>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto text-xl p-10 w-full card"
              onSubmit={handleSubmit(submitHandler)}
            >
              <blockquote className="text-center text-lg text-red-500">A palavra chave é para que possamos auditar a lista de presença e confirmar que o aluno esteve ou não presente caso seja necessário!</blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <div className="mb-4 w-full">
                  <label>Nome da matéria</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                    id="className"
                    autoFocus
                    {...register("className", {
                      required: "Por favor, digite seu nome",
                      minLength: {
                        value: 3,
                        message: "Por favor, digite um nome válido",
                      },
                    })}
                  />
                  {errors.className && (
                    <div className="text-red-600">{errors.className.message}</div>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label>Palavra chave</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                    id="keyWords"
                    autoFocus
                    {...register('keyWords', {
                      required: "Por favor, digite uma palavra chave",
                      minLength: { value: 3, message: "Sua palavra chave precisa ter pelo menos 3 caracteres" },
                    })}
                  />
                  {errors.keyWords && (
                    <div className="text-red-600">{errors.keyWords.message}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <div className="mb-4 w-full">
                  <label>Nome do Professor</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                    id="createdBy"
                    autoFocus
                    {...register('createdBy', {
                      required: "Por favor, digite o nome do professor",
                      minLength: { value: 3, message: "Sua palavra chave precisa ter pelo menos 3 caracteres" },
                    })}
                  />
                  {errors.createdBy && (
                    <div className="text-red-600">{errors.createdBy.message}</div>
                  )}
                </div>
                <div className="flex gap-x-3">
                  <div className="mb-4 w-full">
                    <label>Início da aula</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                      id="startHour"
                      autoFocus
                      {...register('startHour', {
                        required: "Por favor, selecione o horário de início da aula"
                      })}
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label>Término da aula</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                      id="endHour"
                      {...register('endHour', {
                        required: "Por favor, selecione o horário de término da aula"
                      })}
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <div className="flex flex-col mb-4 w-full">
                  <label>Cursos</label>
                  <div className="flex gap-x-3">
                    <select
                      className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                      {...register("selectedTeam")}
                    >
                      <option value="">Selecione um Curso</option>
                      <option value="ADS">Análise e Desenvolvimento de Sistemas</option>
                      <option value="GCOM">Gestão Comercial</option>
                      <option value="GTI">Gestão da Tecnologia da Informação</option>
                    </select>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700"
                      onClick={() => {
                        const selectedTeam = getValues("selectedTeam");
                        if (selectedTeam) {
                          setTeam((prevTeam) => [...prevTeam, selectedTeam]);
                        }
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
                <div>
                  <label>Turmas autorizadas</label>
                  <div className="flex gap-x-3">
                    <select
                      className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                      {...register("selectedGroup")}
                    >
                      <option value="">Selecione uma turma</option>
                      <option value="1">1º Semestre</option>
                      <option value="2">2º Semestre</option>
                      <option value="3">3º Semestre</option>
                      <option value="4">4º Semestre</option>
                      <option value="5">5º Semestre</option>
                      <option value="6">6º Semestre</option>
                    </select>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700"
                      onClick={() => {
                        const selectedGroup = getValues("selectedGroup");
                        if (selectedGroup) {
                          setGroup((prevGroup) => [...prevGroup, selectedGroup]);
                        }
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Cursos</h2>
                <ul className="list-inside flex align-middle">
                  {team.map((teamName, index) => (
                    <li key={index} className="border-2">
                      {teamName}{" "}
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => {
                          setTeam((prevTeam) => [
                            ...prevTeam.slice(0, index),
                            ...prevTeam.slice(index + 1),
                          ]);
                        }}
                      >
                        <RiCloseCircleLine />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Turmas autorizadas</h2>
                <ul className="list-inside flex align-middle">
                  {group.map((groupName, index) => (
                    <li key={index} className="border-2">
                      {groupName}{" "}
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => {
                          setGroup((prevGroup) => [
                            ...prevGroup.slice(0, index),
                            ...prevGroup.slice(index + 1),
                          ]);
                        }}
                      >
                        <RiCloseCircleLine />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4 flex justify-between my-5">
                <button
                  onClick={() => `/teacher/class`}
                  className="primary-button bg-white border border-solid border-gray-300"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="bg-blue-800 hover:bg-red-600 text-white border border-solid border-gray-300 w-25"
                  onClick={() => deleteHandler(classId)}
                >
                  Deletar
                </button>
                <button
                  disabled={loadingUpdate}
                  onClick={() => submitHandler()}
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

AdminClassEditScreen.auth = { adminOnly: true };
