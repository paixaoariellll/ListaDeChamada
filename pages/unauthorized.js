import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import Denied from '../public/denied.svg';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div className='card flex flex-col'>
        <h2 className="text-center">Acesso negado!</h2>
        <p className='text-center'>De todas as pessoas possíveis, eu não desconfiava de você.</p>
        <div className='w-full flex justify-center my-5'>
          <Image src={Denied} alt="Acesso negado" width={600} height={600} unoptimized className="object-cover bg-blue-100 rounded-t-full" />
        </div>
        {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
      </div>
    </Layout>
  );
}

