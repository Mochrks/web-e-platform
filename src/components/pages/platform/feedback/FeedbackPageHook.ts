import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_RECEIVED = [
  {
    id: 1,
    from: 'Alice Freeman',
    date: 'Oct 10, 2026',
    type: 'Kudos',
    message:
      'Thanks for stepping in to help with the Q3 deployment! Your expertise saved us a lot of time.',
  },
  {
    id: 2,
    from: 'Bob Smith',
    date: 'Sep 28, 2026',
    type: 'Review',
    message:
      'Great presentation on the new UI architecture. Very clear and actionable.',
  },
];

export const DUMMY_GIVEN = [
  {
    id: 3,
    to: 'Elena Rodriguez',
    date: 'Oct 15, 2026',
    type: 'Kudos',
    message:
      'Amazing work on the new dashboard design. It looks so much cleaner now!',
  },
];

export function useFeedbackPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState('received');
  const [givenFeedbacks, setGivenFeedbacks] = useState(DUMMY_GIVEN);
  const [receivedFeedbacks] = useState(DUMMY_RECEIVED);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetPerson, setTargetPerson] = useState('Elena Rodriguez');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('Kudos');

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSendFeedback = () => {
    if (editingId) {
      setGivenFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === editingId
            ? {
                ...fb,
                to: targetPerson,
                type: feedbackType,
                message: feedbackText,
              }
            : fb
        )
      );
    } else {
      const newFeedback = {
        id: Date.now(),
        to: targetPerson,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        type: feedbackType,
        message: feedbackText,
      };
      setGivenFeedbacks((prev) => [newFeedback, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingId(null);
    setFeedbackText('');
    setTargetPerson('Elena Rodriguez');
    setFeedbackType('Kudos');
  };

  const openEditModal = (fb: any) => {
    setEditingId(fb.id);
    setTargetPerson(fb.to);
    setFeedbackType(fb.type);
    setFeedbackText(fb.message);
    setIsAddModalOpen(true);
  };

  const handleDeleteFeedback = (id: number) => {
    setGivenFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
  };

  return {
    isAdmin,
    activeTab,
    setActiveTab,
    targetPerson,
    setTargetPerson,
    feedbackText,
    setFeedbackText,
    feedbackType,
    setFeedbackType,
    isAddModalOpen,
    setIsAddModalOpen,
    handleSendFeedback,
    openEditModal,
    handleDeleteFeedback,
    closeModal,
    receivedFeedbacks,
    givenFeedbacks,
  };
}
