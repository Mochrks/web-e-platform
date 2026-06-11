import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export type Ticket = {
  id: string;
  title: string;
  status: string;
  priority: string;
  date: string;
  desc: string;
};

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TKT-1042',
    title: 'VPN Connection Drop',
    status: 'Open',
    priority: 'High',
    date: 'Oct 20, 2026',
    desc: 'My VPN drops every 10 minutes when connected to the NY server.',
  },
  {
    id: 'TKT-1039',
    title: 'Request New Monitor',
    status: 'In Progress',
    priority: 'Low',
    date: 'Oct 18, 2026',
    desc: 'Requesting a second monitor for my home office setup.',
  },
  {
    id: 'TKT-1015',
    title: 'Cannot Access Figma',
    status: 'Resolved',
    priority: 'Medium',
    date: 'Oct 10, 2026',
    desc: 'SSO login is failing with error 403 on Figma.',
  },
];

export function useSupportPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');

  const openCreateModal = () => {
    setEditingId(null);
    setTicketTitle('');
    setTicketDesc('');
    setIsModalOpen(true);
  };

  const openEditModal = (ticket: Ticket) => {
    setEditingId(ticket.id);
    setTicketTitle(ticket.title);
    setTicketDesc(ticket.desc);
    setIsModalOpen(true);
  };

  const handleSubmitTicket = () => {
    if (editingId) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, title: ticketTitle, desc: ticketDesc }
            : t
        )
      );
    } else {
      const newTicket: Ticket = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        title: ticketTitle,
        desc: ticketDesc,
        status: 'Open',
        priority: 'Medium',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      setTickets([newTicket, ...tickets]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    isAdmin,
    activeTab,
    setActiveTab,
    ticketTitle,
    setTicketTitle,
    ticketDesc,
    setTicketDesc,
    handleSubmitTicket,
    tickets,
    isModalOpen,
    setIsModalOpen,
    openCreateModal,
    openEditModal,
    handleDeleteTicket,
  };
}
