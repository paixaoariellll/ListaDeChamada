import Image from 'next/image'
import logo from '../../public/amiga.jpg'

function Final() {
  return (
    <section id="Hero" className="card my-5 sm:p-10">
      <div className="grid text-center grid-cols-2 py-10">
        <div className="col-span-2 lg:col-span-1">
          <Image
            src={logo}
            alt="Logo da amiga"
            width={700}
            height={600}
            unoptmized="true"
            className="relative object-contain sm:mx-auto sm:top-0 sm:w-full sm:flex z-0"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="flex flex-col md:flex-row gap-x-5 justify-center">
            <div className="flex flex-col gap-x-5 justify-center">
              <h1 className="text-[#002776] font-extrabold text-center">A.M.I.G.A</h1>
              <h2 className="sm:block text-[#c59131] font-bold text-center">
                Unidos Somos Fortes
              </h2>
              <h3 className="text-[#002776] mt-4">
                Prezado Veterano
              </h3>
              <p>Estamos honrados com sua participação no <strong>XIX Encontro de Veteranos EEAR</strong>.</p>
              <p>Em caso de dúvidas entre em contato conosco:</p>
              <p>WhatsApp: (12) 99701-9674</p>
              <p>E-mail: encontrao@amigafa.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Final