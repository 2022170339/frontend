import { users } from '@/config';

type TableProps = {
    selected: number | null;
    onUserSelected: (selected: number | null) => void;
}

export default function Table({
    selected,
    onUserSelected
}: TableProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-xs w-full table-zebra-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="cursor-pointer hover:opacity-70 active:opacity-80" onClick={() => {
                            if (selected === user.id) onUserSelected(null);
                            else onUserSelected(user.id);
                        }}>
                            <th>
                                <div className="form-control">
                                    <input type="checkbox" checked={selected === user.id} className="checkbox checkbox-accent checkbox-xs" />
                                </div>
                            </th>
                            <th>{user.id}</th>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.position}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
