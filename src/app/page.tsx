import Heading from '@/components/Heading';

import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Home() {
  redirect('/list-public');
  return (
    <div>
      <Heading title="Dashboard" />
    </div>
  );
}
