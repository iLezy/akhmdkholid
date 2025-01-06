import AddUser from '@/components/add-user';
import DeleteUser from '@/components/DeleteUser';
import prisma from '@/libs/prisma';

async function fetchUsers() {
  return await prisma.user.findMany();
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div>
      <h2 className="text-xl font-bold my-4 text-center">HALAMAN TAMBAH USER</h2>
      <AddUser />
      <div className="mt-6">
        {
          !users.length ? <div className='text-center'>Belum ada User</div>
          :
        <table className="table-auto w-1/2 mx-auto bg-green-400 text-left border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{i += 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <DeleteUser userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    }
      </div>
    </div>
  );
}
