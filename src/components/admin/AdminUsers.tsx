
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const AdminUsers = () => {
  // Dummy data for demo purposes
  const users = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Admin', status: 'Active', lastActive: '2025-04-10' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'User', status: 'Active', lastActive: '2025-04-11' },
    { id: 3, name: 'Michael Brown', email: 'm.brown@example.com', role: 'User', status: 'Inactive', lastActive: '2025-03-22' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', role: 'User', status: 'Active', lastActive: '2025-04-12' },
    { id: 5, name: 'Robert Wilson', email: 'r.wilson@example.com', role: 'Manager', status: 'Active', lastActive: '2025-04-09' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full sm:w-[250px]"
            />
          </div>
          <Button className="bg-wilfred hover:bg-wilfred-accent">
            <Plus className="mr-1 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
