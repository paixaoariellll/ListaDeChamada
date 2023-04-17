import Link from 'next/link';
import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-5 pb-2 md:px-10">
      <Link href="https://www.fatecguaratingueta.edu.br/" target='_blank' >
        <h5 className="text-center text-[#b20000]">
        Faculdade de Tecnologia de Guaratinguetá
        </h5>
      </Link>
      <p className="text-center text-sm text-gray-500 mt-5">
        &copy; {year} Todos os direitos reservados.
      </p>
    </footer>
  )
}
