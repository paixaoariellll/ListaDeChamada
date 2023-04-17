import axios from "axios";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin2Fill, RiFileEditFill } from "react-icons/ri";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, classesWithCreatedByNames: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
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

function AdminClassesScreen() {

  const [{ loading, error, classesWithCreatedByNames, loadingCreate, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      classesWithCreatedByNames: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/teacher/classes`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

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
  };

  const router = useRouter();
  const createHandler = async () => {
    if (!window.confirm("Cadastrar uma nova Matéria?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/teacher/classes`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Matéria criada com sucesso!");
      console.log(data.clas._id);
      router.push(`/teacher/class/${data.clas._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Usuários">
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="grid grid-cols-1 md:col-span-3 p-5">
          <div className="">
            <h2 className="mb-4 w-full text-center uppercase font-extrabold card text-[#b20000]">
              Aulas Criadas
            </h2>
            {loadingDelete && <div>Deletando...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="mb-4 w-full grid-cols-1 text-center card py-1 text-[#b20000] text-2xl"
            >
              {loadingCreate ? (
                "Carregando..."
              ) : (
                <span className="text-3xl ">Adicionar uma nova matéria</span>
              )}
            </button>
          </div>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="p-5 ">
              <table className="min-w-full text-center bg-white rounded-xl py-2 px-1 shadow-xl">
                <thead className="border-b-8 border-[#b20000]">
                  <tr className="text-2xl text-center text-#b20000] ">
                    <th className=" px-5">Criado em</th>
                    <th className=" px-5">Criado por</th>
                    <th className=" p-5">Matéria</th>
                    <th className=" p-5">Início</th>
                    <th className=" p-5">Término</th>
                    <th className=" p-5">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {classesWithCreatedByNames.map((clas) => (
                    <tr
                      key={clas._id}
                      className="border-t border-x text-center border-x-[#b20000] text-xl hover:bg-gray-100"
                    >
                      <td className="p-5">
                        {(clas.createdAt).substring(8, 10)}/
                        {(clas.createdAt).substring(5, 7)}/
                        {(clas.createdAt).substring(0, 4)}
                      </td>
                      <td className="p-5">{clas.createdBy}</td>
                      <td className="p-5">{clas.className}</td>
                      <td className="p-5">{clas.startHour}</td>
                      <td className="p-5">{clas.endHour}</td>
                      <td className="p-5">
                        <Link href={`/teacher/class/${clas._id}`} passHref>
                          <button className="bg-blue-800 border hover:bg-green-600 p-2 rounded-xl text-white border-solid border-gray-300 w-15">
                            <RiFileEditFill />
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          type="button"
                          className="bg-blue-800 hover:bg-red-600 p-2 rounded-xl text-white border border-solid border-gray-300 w-25"
                          onClick={() => deleteHandler(clas._id)}
                        >
                          <RiDeleteBin2Fill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminClassesScreen.auth = { adminOnly: true };

export default AdminClassesScreen;
