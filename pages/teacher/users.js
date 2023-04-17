import axios from "axios";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin2Fill, RiFileEditFill } from "react-icons/ri";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
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

function AdminUsersScreen() {

  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/teacher/users`);
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
  };

  return (
    <Layout title="Usuários">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="md:col-span-3 lg:col-span-6 p-5">
          <h2 className="mb-4 text-center uppercase font-extrabold card text-[#b20000]">
            Usuários cadastrados
          </h2>
          {loadingDelete && <div>Deletando...</div>}
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="p-5 ">
              <table className="min-w-full text-center bg-white rounded-xl py-2 px-1 shadow-xl">
                    <thead className="border-b-8 border-[#b20000]">
                      <tr className="text-2xl text-center text-#b20000] ">
                    <th className=" px-5">Registro</th>
                    <th className=" p-5">Nome</th>
                    <th className=" p-5">E-mail</th>
                    <th className=" p-5">Status</th>
                    <th className=" p-5">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-x text-center border-x-[#b20000] text-xl hover:bg-gray-100"
                    >
                      <td className="p-5">{user.registerId}</td>
                      <td className="p-5">{user.name}</td>
                      <td className="p-5">{user.email}</td>
                      <td className="p-5">{user.isTeacher ? "Professor" : "Aluno"}</td>
                      <td className="p-5">
                        <Link href={`/teacher/user/${user._id}`} passHref>
                          <button className="bg-blue-800 border hover:bg-green-600 p-2 rounded-xl text-white border-solid border-gray-300 w-15">
                            <RiFileEditFill />
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          type="button"
                          className="bg-blue-800 hover:bg-red-600 p-2 rounded-xl text-white border border-solid border-gray-300 w-25"
                          onClick={() => deleteHandler(user._id)}
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

AdminUsersScreen.auth = { adminOnly: true };

export default AdminUsersScreen;
