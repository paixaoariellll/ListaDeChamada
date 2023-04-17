import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/presente.svg'
import logo_fatec from '../../public/logo_fatec.png'
import { useSession } from 'next-auth/react';

function Hero() {
  const { data: session } = useSession();
  return (
    <section id="Hero" className="card my-5 sm:p-10">
      <div className="px-4 py-0">
        <div className="grid text-center grid-cols-2">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={logo}
              alt="Logo Presente!"
              width={600}
              height={500}
              unoptmized="true"
              className="relative object-contain sm:mx-auto sm:top-0 sm:w-full sm:flex z-0 w-fit h-fit"
            />
          </div>
                    <div className="col-span-2 lg:col-span-1 flex flex-col h-full my-auto justify-center">
            <Image
              src={logo_fatec}
              alt="Logo da amiga"
              width={600}
              height={500}
              unoptmized="true"
              className="relative object-contain z-0 w-fit h-fit sm:px-20 sm:py-10"
            />
            <h1 className="text-[#b20000] font-extrabold">Lista de Presença</h1>
            <h2 className="sm:block text-[#002776] font-bold">
              6º ADS - Guaratinguetá
            </h2>
            <h3 className="mx-auto mt-4">
              Entre já e confirme sua presença!
            </h3>
           
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block text-xl w-full rounded bg-[#b20000] px-12 py-3 font-medium text-white hover:bg-[#002776] sm:w-auto"
                href="/presence"
              >
                {session?.user ? "Responder Chamada" : "Entrar"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero