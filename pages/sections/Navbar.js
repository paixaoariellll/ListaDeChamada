import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Store } from '../../utils/Store';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from '../../components/DropdownLink';

export default function Navbar() {
  const { status, data: session } = useSession();
  const { state } = useContext(Store);
  const { cart } = state;
  // eslint-disable-next-line no-unused-vars
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems);
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <nav id="Navbar" className="bg-[#b20000] shadow-md px-5">
      <div className="mx-auto px-10 py-1 flex items-center justify-between gap-x-5">
        <Link href="/" className="text-white font-medium text-xl" title='Início'>
          <h2 className="text-white font-extrabold flex hover:bg-white hover:text-[#b20000] px-2">
            FATEC
          </h2>
        </Link>
        <div className='flex justify-center gap-x-2'>
          {status === 'loading' ? (
            'Carregando'
          ) :
            session?.user ? (
              <Menu as="div" className="realtive inline-block">
                <Menu.Button className="text-white font-extrabold flex hover:bg-white hover:text-[#b20000] px-2">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute z-50 rigth-10 w-32 rounded-md bg-white origin-top-right">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/profile">
                      Perfil
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <Link className="dropdown-link" href="/login" onClick={logoutClickHandler}>
                      Sair
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <div className='flex gap-x-2'>
                  <Link href="/login" className="text-white font-medium text-xl" title='Entrar'>
                    <h4 className="text-white font-extrabold flex hover:bg-white hover:text-[#b20000] px-2 py-1 rounded-xl">
                      Entrar
                    </h4>
                  </Link>
              </div>
            )
          }
        </div>
      </div>
    </nav >
  )
}
