"use client";
import React, { useState, useEffect } from 'react';
import { X, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { creategroup, getgroup, handleUpdateData } from '@/api/group'; // Assuming you have an editgroup api
import GroupTable from './GroupTable';

function Group({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  
  // Get the selected group data from Redux
  const updategroup = useSelector((state: any) => state?.group?.updategroup);

  // Sync form data when updategroup changes
  useEffect(() => {
    if (updategroup && updategroup.groupName) {
      setGroupName(updategroup.groupName);
    } else {
      setGroupName('');
    }
  }, [updategroup, isOpen]); // Also reset/sync when modal opens

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    if (updategroup?._id) {
      // Logic for Updating existing record
      dispatch(handleUpdateData({ id: updategroup._id, groupName }));
    } else {
      // Logic for Creating new record
      dispatch(creategroup({ groupName }));
    }
    await dispatch(getgroup({}));

    setGroupName('');
    // onClose(); // Uncomment if you want to close on success
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] w-full flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose} 
      />
      
      <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" /> 
            {updategroup?._id ? 'Update Group' : 'New Group'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              autoFocus
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setGroupName('');
                onClose();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              {updategroup?._id ? 'Update Record' : 'Save Group'}
            </button>
          </div>
        </form>

        <div className="border-t pt-4">
            <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Existing Groups</h4>
            <GroupTable />
        </div>
      </div>
    </div>
  );
}

export default Group;