import Link from 'next/link'
import React from 'react'

function ClassesItem({ clas }) {
  return (
    <div className="card p-5 flex flex-col justify-between gap-y-5">
      <div className="text-center uppercase font-extrabold text-[#b02222]">
        <p>{clas.className}</p>
        <p>{clas.createdBy}</p>
      </div>
      <div>
        <blockquote className="flex w-full justify-between">
          <p className="font-bold">Início:</p>
          <code>
            {clas.startHour}
          </code>
        </blockquote>
        <div className="flex w-full justify-between">
          <p className="font-bold">Término:</p>
          <code>
            {clas.endHour}
          </code>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Duração:</p>
          <code>
            {clas.time} min
          </code>
        </div>
      </div>
      <button
        className="block text-xl w-full rounded bg-[#b20000] py-1 font-medium text-white hover:bg-[#002776] sm:w-auto"
      >
        <Link className="w-full"
          href={`/class/${clas._id}`}
        >
          Chamada
        </Link>
      </button>
    </div>
  )
}

export default ClassesItem
